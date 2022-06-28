import React, { useEffect, useState } from 'react'
import * as bs from "react-icons/bs";
import * as fa from "react-icons/fa";
import {Button, Form, Modal } from "react-bootstrap";
import useRequest from '../../../../../../customHooks/useRequest';
import useAxios from '../../../../../../customHooks/useAxios';
import BackDrop from '../../../../../../Components/backDrop/BackDrop';
import { useTranslation } from 'react-i18next';
import { QuestionTypeEnum } from '../../../../../../data/QuestionTypeEnum';
import { CustomReactMultiSelect } from '../../../../../../Components/Select/customReactSelect';
import { addQuestionCreate } from '../../../../../../services/createQuestion';
import { handleError } from '../../../../../../validation/functions';
const TableQuestionModal = (props) => {
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [response, loading, fetchData, setResponse] = useAxios();
    const request=useRequest();
    const [enumQuestion, setEnumQuestion] = useState([])
    const abortController = new AbortController();
    const colors = ['#470063', '#B30089', '#F62DAE', '#FD96A9', '#B846E6','#4560E6','#7784C4','#0BD9E4','#7E0BE3','#0BE34C','#A2E30B','#E3C60B','#E37B0B','#E3410B'];
    const {t} = useTranslation();
    const [questionSelect, setQuestionSelect] = useState("")
    const [color, setColor] = useState("#000000")



        useEffect(()=> {
        Object.keys(QuestionTypeEnum).map((key) => {

            return setEnumQuestion((prev) => [...prev, {value: QuestionTypeEnum[key], label: t(key), color: colors[Math.floor(Math.random() * colors.length)]}])
        })

        console.log(props.rowValus)


        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    useEffect(() => {
    
        if (response) {
          
          response.Result
            ? props.updated()
            : handleError(response.Message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response]);






    const handleSubmit =(e) => {

        e.preventDefault()
        
        fetchData({
            method: "POST",
            url: addQuestionCreate,
            headers: {
              accept: "*/*",
            },
            signal:abortController.signal,
            data: {
              
              Id:0,
              QuestionPage_Id: props.rowValus.Id,
              QuestionType_EId: Number(questionSelect),
              Title: title,
              Description: description,
              Color: color.slice(1),
              Request:request,
            },
          });
      
    }






  return (
    <>
    {loading && <BackDrop open={loading} />}

    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="tableModal">
          <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
                    <Form.Control type="text" placeholder={t("QuestionCreateTitle")} value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
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

                <Form.Group className="mb-3 questionColorPicker" controlId="exampleForm.ControlTextarea1">
                    
                    <input  value={color} onChange={(e) => setColor(e.target.value)} type="color" className='colorPickerInput' name="favcolor" />
                </Form.Group>
            
                
                <Button variant="primary" type="submit" className='questionFormSubmit mt-5'>
                    {t("operatorGroupFormSubmit")}
                </Button>
            </Form>
        </div>
      </Modal.Body>
    </Modal>

    </>
  )
}

export default TableQuestionModal