import { Button, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './questionForm.css'
import { QuestionTypeEnum } from '../../../../../data/QuestionTypeEnum' 
import { useState } from 'react'
const QuestionForm = () => {
    const {t} = useTranslation()
    const [title,setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("#000000")
    const [qType, setQType] = useState()

    const handleSubmit =(e) => {
        e.preventDefault()
    }


  return (
    <div className="questionFormMain">
        <h1 className="questionFormHeader">پرسشنامه</h1>
        <div className="questionCreateForm">
            <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
                    <Form.Control type="text" placeholder={t("questionTitlePlace")} value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    {t("questionTitleDesc")}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                    <Form.Control as="textarea" rows={5} value={description} onChange={(e)=> setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("questionType")}</Form.Label>
                    <Form.Select onChange={(e)=> setQType(e.target.value)}>
                        {
                        Object.keys(QuestionTypeEnum).map((key, index) => {
                            return(
                                <option value={QuestionTypeEnum[key]} key={index}>{t(key)}</option>
                            )
                        })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 questionColorPicker" controlId="exampleForm.ControlTextarea1">
                    
                    <input value={color} onChange={(e) => setColor(e.target.value)} type="color" className='colorPickerInput' name="favcolor" />
                </Form.Group>
                
                <Button variant="primary" type="submit" className='questionFormSubmit mt-5'>
                    {t("operatorGroupFormSubmit")}
                </Button>
            </Form>
        </div>
    </div>
  )
}

export default QuestionForm