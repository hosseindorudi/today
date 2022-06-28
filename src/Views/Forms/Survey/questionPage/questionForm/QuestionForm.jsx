import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './questionForm.css'
import { QuestionTypeEnum } from '../../../../../data/QuestionTypeEnum' 
import { useEffect, useState, useContext } from 'react'
import { CustomReactMultiSelect } from '../../../../../Components/Select/customReactSelect'
import { enums } from '../../../../../data/Enums'
import { TabContext } from '../../../../../contexts/TabContextProvider'
import QuestionList from '../questionList/QuestionList'
import { questionCreate } from '../../../../../services/questionService'
import { toast } from "react-toastify";
import useAxios from '../../../../../customHooks/useAxios'
import useRequest from '../../../../../customHooks/useRequest'
import BackDrop from '../../../../../Components/backDrop/BackDrop'
import { questionnaireTypeReadTitle } from '../../../../../services/questionnaireType'
import { createSelectOptions } from '../../../../../validation/functions'
import axios from "axios";

const QuestionForm = () => {
    const {t} = useTranslation()
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [enumQuestion, setEnumQuestion] = useState([])
    const [questionSelect, setQuestionSelect] = useState("")
    const colors = ['#470063', '#B30089', '#F62DAE', '#FD96A9', 
    '#B846E6',
    '#4560E6',
    '#7784C4',
    '#0BD9E4',
    '#7E0BE3',
    '#0BE34C',
    '#A2E30B',
    '#E3C60B',
    '#E37B0B',
    '#E3410B',
    ];
    const abortController = new AbortController();

    

    const tabContext = useContext(TabContext);
    const [response, loading, fetchData, setResponse] = useAxios();
    const request=useRequest();
    const handleClickMenu = () => {
        tabContext.addRemoveTabs(
        {
            title: "routes.questionForm",
            path: "/Survey/QuestionPage/Create/",
            Component: QuestionForm,
            access: enums.Survey_QuestionPage_Create_w,
        },
        "remove"
        );
        tabContext.addRemoveTabs(
        {
            title: "routes.questionList",
            path: "/Survey/QuestionPage/Read/",
            Component: QuestionList,
            access: enums.Survey_QuestionPage_Read_r,
        },

        "add"
        );
    };

    const createParams = (service) => {
      const params = {
        method: "POST",
        url: service,
        headers: {
          accept: "*/*",
        },
        data: request,
      };
      return params;
    };

    const getDatas = () => {
      const questionReadTitle = axios.request(
        createParams(questionnaireTypeReadTitle)
      );
      axios
      .all([
        questionReadTitle,
      ])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setEnumQuestion(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);}

        )
      ).catch((error) => {
        handleError(error.message);
      });

    }

    useEffect(() => {
      let loaded = false;
      if (!loaded) {
        getDatas();
      }
      return () => {
        loaded = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleError=(message)=>{
  
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        
      }
      const handleSeccess=(message)=>{
        
        toast.success(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }

      useEffect(() => {
        if(response){
          response.Result?handleSeccess(response.message):handleError(response.message)
          response.Result && handleClickMenu() ;
        }
        setResponse(undefined)
           // eslint-disable-next-line react-hooks/exhaustive-deps 
      }, [response])

    // useEffect(()=> {
    //     // Object.keys(QuestionTypeEnum).map((key) => {

    //     //     return setEnumQuestion((prev) => [...prev, {value: QuestionTypeEnum[key], label: t(key), color: colors[Math.floor(Math.random() * colors.length)]}])
    //     // })


    //     // eslint-disable-next-line react-hooks/exhaustive-deps 
    // }, [])

    const handleSubmit =(e) => {

        e.preventDefault()
        
        fetchData({
            method: "POST",
            url: questionCreate,
            headers: {
              accept: "*/*",
            },
            signal:abortController.signal,
            data: {
              
              Id:0,
              QuestionnaireType_Id: Number(questionSelect),
              Title: title,
              Description: description,
              Request:request,
            },
          });
      
    }


  return (

    <>
    {loading && <BackDrop open={loading} />}
    
    <div className="questionFormMain">
        <h1 className="questionFormHeader">{t("routes.question")}</h1>
        <div className="questionCreateForm">
            <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
                    <Form.Control type="text" placeholder={t("questionTitlePlace")} value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                    <Form.Text className="text-muted">
                    {t("questionTitleDesc")}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                    <Form.Control required as="textarea" rows={5} value={description} onChange={(e)=> setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("questionType")}</Form.Label>
                      
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={enumQuestion}
                      value={questionSelect}
                      onchangeHandler={(e) => setQuestionSelect(e.value)}
                      placeholder={t("questionType")}
                    />

                  
                   
                </Form.Group>
            
                
                <Button variant="primary" type="submit" className='questionFormSubmit mt-5'>
                    {t("operatorGroupFormSubmit")}
                </Button>
            </Form>
        </div>
    </div>

    </>
  )
}

export default QuestionForm