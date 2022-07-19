import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button } from "react-bootstrap";
import "./answerForm.css";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import useRequest from "../../../../../customHooks/useRequest";
import { createSelectOptions, handleError } from "../../../../../validation/functions";
import useAxios from "../../../../../customHooks/useAxios";
import BackDrop from "../../../../../Components/backDrop/BackDrop";
import { questionReadQuestion, questionReadTitle } from "../../../../../services/questionService";
import { toast } from "react-toastify";
import AnswerModal from "./AnswerModal";
const AnswerForm = () => {
  const { t } = useTranslation();
  const [questionTitles, setQuestionTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(undefined)
  const [questions,setQuestions]=useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const request=useRequest()
  const [type, setType] = useState("")
  const [response, loading, fetchData, setResponse] = useAxios(); 
  const [loadingSelect,setLoadingSelect]=useState(false)
  const [validated, setValidated] = useState(false);


  useEffect(() => {
    setLoadingSelect(true)
    setType("READTITLES")
    fetchData({
        method: "POST",
        url: questionReadTitle,
        headers:request
    })
    return () => {
        setResponse(undefined)
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleResponse=(response,type)=>{
    switch (type) {
        case "READTITLES":
            setQuestionTitles(createSelectOptions(response.Title))
            setLoadingSelect(false)
            break;
        case "READQUESTIONS":
            setQuestions(response.Record)
            response.Record.length?setModalOpen(true): toast.info(t("Answer.NoQuestion"), {
              position: toast.POSITION.TOP_CENTER,
            });
            break;
        default:
            break;
    }
  }
  useEffect(() => {
    response&&handleResponse(response,type)
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])
  const onChageQuestionSelect = (value) => {
    setSelectedTitle(value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    setType("READQUESTIONS")
    fetchData({
        method: "POST",
        url: questionReadQuestion,
        headers:request,
        data:{
         
          Id:selectedTitle.value
        } 
    })

  };
  return (
    <div className="answerList">
        {loading&&
        <BackDrop open={true}/>    
    }
    {modalOpen &&(
      <AnswerModal open={modalOpen} onHide={()=>setModalOpen(false)} questions={questions}/>
    )}
      <Form
        className="answerListForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("routes.answerForm")}</b>
        <div className="answerList-select">
          <CustomReactMultiSelect
            options={questionTitles}
            value={selectedTitle}
            placeholder={t("answerPage.chooseQuestion")}
            isMulti={false}
            onchangeHandler={onChageQuestionSelect}
            isLoading={loadingSelect}
          />
        </div>
        <Button disabled={selectedTitle?false:true} type="submit">{t("answerForm.start")}</Button>
      </Form>
    </div>
  );
};

export default AnswerForm;
