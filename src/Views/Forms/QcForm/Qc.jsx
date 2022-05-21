import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import logo from "../../../assets/imgs/logo.png";
import Stopwatch from "../../../Components/stopWatch/stopWatch";
import { data, phone, qcExit } from "../../../data/dataQc";
import "./Qc.css";
const Qc = (props) => {
  const form=props.formType
  const [datastate, setData] = useState([]);
  const [qcState, setqcState] = useState();
  const [phonestate, setphonestate] = useState();
  const [loading, setloading] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [totalTimeSpent, settotalTimeSpent] = useState(0);
  const myRef = useRef();

  const setLastValue = (arr) => {
    setBtnDisabled(false);
    const result = Object.values(arr).reduce((r, { time }) => r + time, 0);
    settotalTimeSpent(result)
  };
  const handleChange = (index, name, value) => {
    let newArr = [...datastate];
    newArr[index][name] = value;
    if (name === "result") {
      newArr[index].running = false;
      newArr[index].time = myRef.current.getMyState();
      index === datastate.length - 1
        ? setLastValue(newArr)
        : (newArr[index + 1].running = true);
    }
    setData(newArr);
  };
  useEffect(() => {
    setData(data);
    setqcState(qcExit);
    setphonestate(phone);
    setloading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = () => {
    console.log(datastate);
  };
  return (
    <main>
      {loading ? (
        "loading..."
      ) : (
        <>
          <div className="first">
            <div className="formQc">
              <div className="QcText">{form==="Exit"?"فرم QC خروجی" :"فرم QC ورودی"}</div>
            </div>
            <div className="title">
              <div className="officeTitle">
                <span>شرکت پیشتازان فناوری سیب طلایی</span>
                <br />
                <b>CTELECOM</b>
              </div>
            </div>
            <div className="logo">
              <div className="logoDiv">
                <img src={logo} alt="logo" />
              </div>
            </div>
          </div>
          <hr />
          <div className="second">
            <div className="right">
              <div>
                <span>تاریخ پذیرش دستگاه:</span>
                <span>{qcState.date}</span>
              </div>
              <div>
                {" "}
                <span>ساعت پذیرش دستگاه:</span> <span>{qcState.time}</span>
              </div>
              <div>
                {" "}
                <span>نام و نام خانوادگی مالک دستگاه:</span>
                <span>{qcState.name}</span>{" "}
              </div>
              <div>
                {" "}
                <span>استان:</span>
                <span>{qcState.province}</span>{" "}
              </div>
              <div>
                <span>شهرستان:</span>
                <span>{qcState.city}</span>{" "}
              </div>
              <div>
                {" "}
                <span>{form==="Exit"?"تکنسین" :"اپراتور پذیرش"} :</span>
                <span>{form==="Exit"?qcState.tech:qcState.operator}</span>{" "}
              </div>
              <div>
                {" "}
                <span> {form==="Exit"?"اپراتور" :"اپراتور Qc"}:</span>
                <span>{qcState.operatorQC}</span>{" "}
              </div>
            </div>
            <div className="left">
              <div>
                <span>نوع گارانتی:</span>
                <span>{phonestate.garanteeType}</span>
              </div>
              <div>
                <span>سریال دستگاه:</span>
                <span>{phonestate.serial}</span>
              </div>
              <div>
                <span>مارک:</span>
                <span>{phonestate.brand}</span>
              </div>
              <div>
                <span>نوع:</span>
                <span>{phonestate.type}</span>
              </div>
              <div>
                <span>مدل:</span>
                <span>{phonestate.model}</span>
              </div>
              <div>
                <span>رنگ:</span>
                <span>{phonestate.color}</span>
              </div>
              <div>
                <span>گیگ:</span>
                <span>{phonestate.storage}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="third">
            <div className="innerTableDiv">
              <table className="tableQC">
                <tbody>
                  <tr>
                    <th>شماره</th>
                    <th>زمان سپری شده</th>
                    <th>شروع فعالیعت</th>
                    <th>نتیجه کار</th>
                    <th>توضیحات</th>
                  </tr>
                  {datastate.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Stopwatch running={d.running} ref={myRef} />
                      </td>
                      <td>{d.activityDesciption}</td>
                      <td>
                        {" "}
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          checked={d.result}
                          name="result"
                          disabled={d.result || !d.running ? true : false}
                          onChange={(e) =>
                            handleChange(i, e.target.name, e.target.checked)
                          }
                          //label="Check this switch"
                        />
                      </td>
                      <td>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          size={"sm"}
                          value={d.describe}
                          name="describe"
                          onChange={(e) =>
                            handleChange(i, e.target.name, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={"2"}>
                      <span>
                        {("0" + Math.floor((totalTimeSpent / 60000) % 60)).slice(-2)}:
                      </span>
                      <span>
                        {("0" + Math.floor((totalTimeSpent / 1000) % 60)).slice(-2)}:
                      </span>
                      <span>{("0" + ((totalTimeSpent / 10) % 100)).slice(-2)}</span>
                    </td>
                    <td colSpan={"3"}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="btnContainerQc">
            <Button
              variant="outline-success"
              size={"lg"}
              disabled={btnDisabled}
              onClick={() => handleSubmit()}
            >
              ثبت
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default Qc;
