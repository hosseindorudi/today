import React, { useCallback, useEffect, useState } from 'react'
import * as fa from "react-icons/fa";
import {Button, Form, Modal, ListGroup  } from "react-bootstrap";
import useRequest from '../../../../../../customHooks/useRequest';
import useAxios from '../../../../../../customHooks/useAxios';
import BackDrop from '../../../../../../Components/backDrop/BackDrop';
import { useTranslation } from 'react-i18next';
import { QuestionTypeEnum } from '../../../../../../data/QuestionTypeEnum';
import { CustomReactMultiSelect } from '../../../../../../Components/Select/customReactSelect';
import { createQuestion, readQuestion,deleteQuestion } from '../../../../../../services/questionService';
import { handleError } from '../../../../../../validation/functions';
import axios from 'axios'
import Swal from "sweetalert2";
import './tableQuestionModal.css'
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
    const [questions, setQuestions] = useState([])
    const [requestType, setRequestType] = useState("");





        useEffect(()=> {
        Object.keys(QuestionTypeEnum).map((key) => {

            return setEnumQuestion((prev) => [...prev, {value: QuestionTypeEnum[key], label: t(key), color: colors[Math.floor(Math.random() * colors.length)]}])
        })



        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const getDatas=()=>{
      const questionTitles = axios.request(
        createParams(readQuestion)
      );
      axios
      .all([
        questionTitles,
      ])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setQuestions(allData[0].data.Record)
            : handleError(allData[0].data.Message);
            })
      )
      .catch((error) => {
        handleError(error.message);
      });
    }
    useEffect(() => {
        getDatas();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleResponse = useCallback(
      (response, type) => {
        switch (type) {
          case "DELETE":
            handleDeleted();
            break;

          default:
            break;
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );




    const deleteRecord = (id) => {
      setRequestType("DELETE");
      fetchData({
        method: "POST",
        url: deleteQuestion,
        headers: {
          accept: "*/*",
        },
        data: {
          Id: id,
          Request: request,
          
        },
        signal: abortController.signal,
      });
    };


    const handleClickEdit = (id) => {
      setRequestType("GETONERECORD");
      fetchData({
        method: "POST",
        url: props.getOneRecord,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: id,
        },
        signal: abortController.signal,
      });
    };

    const handleDeleted = () => {
      Swal.fire(
        t("sweetAlert.deleted"),
        t("sweetAlert.recordDeleted"),
        "success"
      );
      
      getDatas();
    };


    const deleteCalled = (id) => {
      Swal.fire({
        title: t("table.deleteTitle"),
        text: t("table.noReturn"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("sweetAlert.yes"),
        cancelButtonText: t("sweetAlert.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          deleteRecord(id);
        }
      });
    };






    const createParams = (service) => {
      const params = {
        method: "POST",
        url: service,
        headers: {
          accept: "*/*",
        },
        data: {
          Request:request,
          Id:props.rowValus.Id
        }

      };
      return params;
    };
  
    

    




    useEffect(() => {
    
        if (response) {
          
          response.Result
            ? handleResponse(response, requestType)
            : handleError(response.Message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response]);






    const handleSubmit =(e) => {

        e.preventDefault()
        
        fetchData({
            method: "POST",
            url: createQuestion,
            headers: {
              accept: "*/*",
            },
            signal:abortController.signal,
            data: {
              
              Id:0,
              QuestionPage_Id: props.rowValus.Id,
              QuestionType_EId: questionSelect?.value,
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
      backdrop="static"
      keyboard={false}
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
                      onchangeHandler={(e) => setQuestionSelect(e)}
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
      <Modal.Footer className='questionModalFooter'>
            {console.log(questions)}
            <ListGroup as="ol" numbered className='questionListGroup'>
            {questions.map((question) => (
                
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{
                    border:`1px solid #${question.Color}`,
                    borderRadius:4
                  }}
                >
                  <div className="ms-2 questionMain">
                    <div className="fw-bold questionTitle">{question.Title}</div>
                    {question.Description}
                  </div>
                  <div className="ms-2 questionButtons">
                    
  
                      <div className="questionEditDiv" ><fa.FaRegEdit/></div>
                        <div className="questionDeleteDiv" onClick={() => deleteCalled(question.Id)}><fa.FaTrash/></div>
                        
                        <div className="questionDownDiv"><fa.FaLongArrowAltDown/></div>
                        
                        <div className="questionUpDiv"><fa.FaLongArrowAltUp/></div>
  
                      
                    </div>
                  
                </ListGroup.Item>
                
            

            ))}
            </ListGroup>
            
          </Modal.Footer>
    </Modal>

    </>
  )
}

export default TableQuestionModal