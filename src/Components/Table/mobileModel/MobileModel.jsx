import "./mobileModel.css"
import { useTranslation } from "react-i18next";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import {  TextField } from "@mui/material";
import { Form } from "react-bootstrap";

const MobileModel = ({setMobileModal,searchBegin,searchEnd,setSearchBegin,setSearchEnd,flt_Title,handleChangeTitle}) => {
    const {t}=useTranslation()

  return (
    <div className="mobileModelBg">
        <div className="mobileModelFilters">
            <div className="mobileModalFirst">
            <h1 className="mobileModalHeader">فیلتر</h1>
            <div
              style={{
                direction: "ltr",
                marginTop: 5,
                marginBottom:5
              }}
            >
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  mask="____/__/__"
                  label={t("search.startDate")}
                  value={searchBegin}
                  onChange={(newValue) => {
                    setSearchBegin(newValue);
                    if (searchEnd !== null && newValue > searchEnd) {
                      alert(t("search.error"));
                      setSearchBegin(null);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
           


            
           

            <div
              style={{
                direction: "ltr",
                marginTop: 5,
                marginBottom:5
              }}
            >
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  label={t("search.endDate")}
                  mask="____/__/__"
                  value={searchEnd}
                  onChange={(newValue) => {
                    setSearchEnd(newValue);
                    if (searchBegin === null) {
                      alert(t("search.errorChooseStart"));
                      setSearchEnd(null);
                    }
                    if (searchBegin !== null && searchBegin > newValue) {
                      alert(t("search.error"));
                      setSearchEnd(null);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            
            
            <Form.Group>
              <Form.Control
                className="searchTextChange"
                type="text"
                placeholder={t("search")}
                onChange={handleChangeTitle}
                value={flt_Title}
              />
            </Form.Group>
            </div>
        </div>
        <div className="mobileModelBVuttons">
            <button className="mobileButtonExit" onClick={()=> setMobileModal(false)}>بازگشت</button>
            <div className="mobileButtonSend"  onClick={()=> setMobileModal(false)}>تایید</div>
        </div>
    </div>
  )
}

export default MobileModel