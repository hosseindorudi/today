import React, { useState, useEffect } from "react";
import "./modal.css";
import { createNoteDashboard } from "../../../services/dashboardServices";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { handleError } from "../../../validation/functions";
import * as fa from "react-icons/fa";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import BackDrop from "../../../Components/backDrop/BackDrop";

const Modal = ({ setIsOpen, getDashboardData }) => {
  const [values, setValues] = useState({
    title: "",
    desc: "",
  });
  const [alarm, setAlarm] = useState(false);
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const { t } = useTranslation();

  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  useEffect(() => {
    if (response) {
        if(response.Result){
          handleResponse(response)
          setResponse(undefined);
          getDashboardData();
          setIsOpen(false);
        }else {
          handleError(response.Message);
        }

      
    }
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const onSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url: createNoteDashboard,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: 0,
        Title: values.title,
        Body: values.desc,
        IsAlarm: alarm,
      },
      signal: abortController.signal,
    });
    
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading && <BackDrop open={loading}/>}
      <div className="tableModalParentModal">
        <div className="tableModalContainerModal">
          <div className="tableModalHeaderModal">
            <h1 className="tableModalHeadingModal">یادداشت</h1>
          </div>
          <button className="closeBtnModal" onClick={() => setIsOpen(false)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <button className="bellBtnModal" onClick={() => setAlarm(!alarm)}>
            {!alarm ? <fa.FaRegBell /> : <fa.FaBell />}
          </button>
          <div className="tableModalContentModal">
            <form onSubmit={onSubmit} className="tableModalFormModal">
              <div className="tableModalFormDivModal">
                <input
                  type="text"
                  id="modalTitleModal"
                  placeholder="موضوع"
                  onChange={onChange}
                  name="title"
                />
                <textarea
                  type="text"
                  id="modalDescModal"
                  placeholder=" یادداشت"
                  onChange={onChange}
                  name="desc"
                />
              </div>
              <div className="submitBTNDivModal">
                <button className="tableModalSumitBtnModal">ارسال</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
