import React, { useEffect, useRef, useState,useContext } from "react";
import { Button, Form } from "react-bootstrap";
import logo from "../../../../../assets/imgs/logo.png";
import Stopwatch from "../../../../../Components/stopWatch/stopWatch";
import { data, phone, qcExit } from "../../../../../data/dataQc";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import "./Qc.css";
import QcForm from "../qcEntryList/QcForm";
const Qc = (props) => {
  const [datastate, setData] = useState([]);
  const [qcState, setqcState] = useState();
  const [phonestate, setphonestate] = useState();
  const [loading, setloading] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [totalTimeSpent, settotalTimeSpent] = useState(0);
  const myRef = useRef();
  const tabContext = useContext(TabContext);
  const handleClickMenu = () => {
    
    tabContext.addRemoveTabs(
      {
        title: "routes.service.QcEntryForm",
        path: "/service.QcEntryForm",
        Component:Qc
      }
      , "remove");
    tabContext.addRemoveTabs(
      
      {
        title: "routes.service.QcEntry",
        path: "/service.QcEntry",
        Component:QcForm
      }
      
      , "add");
  };
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
    handleClickMenu();
  };
  return (
    <main>
      {loading ? (
        "loading..."
      ) : (
        <>
          <div className="first">
            <div className="formQc">
              <div className="QcText">{"?????? QC ??????????"}</div>
            </div>
            <div className="title">
              <div className="officeTitle">
                <span>???????? ???????????????? ???????????? ?????? ??????????</span>
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
                <span>?????????? ?????????? ????????????:</span>
                <span>{qcState.date}</span>
              </div>
              <div>
                {" "}
                <span>???????? ?????????? ????????????:</span> <span>{qcState.time}</span>
              </div>
              <div>
                {" "}
                <span>?????? ?? ?????? ???????????????? ???????? ????????????:</span>
                <span>{qcState.name}</span>{" "}
              </div>
              <div>
                {" "}
                <span>??????????:</span>
                <span>{qcState.province}</span>{" "}
              </div>
              <div>
                <span>??????????????:</span>
                <span>{qcState.city}</span>{" "}
              </div>
              <div>
                {" "}
                <span>{"?????????????? ??????????"} :</span>
                <span>{qcState.operator} :</span>{" "}
              </div>
              <div>
                {" "}
                <span> {"?????????????? Qc"}:</span>
                <span>{qcState.operatorQC}</span>{" "}
              </div>
            </div>
            <div className="left">
              <div>
                <span>?????? ??????????????:</span>
                <span>{phonestate.garanteeType}</span>
              </div>
              <div>
                <span>?????????? ????????????:</span>
                <span>{phonestate.serial}</span>
              </div>
              <div>
                <span>????????:</span>
                <span>{phonestate.brand}</span>
              </div>
              <div>
                <span>??????:</span>
                <span>{phonestate.type}</span>
              </div>
              <div>
                <span>??????:</span>
                <span>{phonestate.model}</span>
              </div>
              <div>
                <span>??????:</span>
                <span>{phonestate.color}</span>
              </div>
              <div>
                <span>??????:</span>
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
                    <th>??????????</th>
                    <th>???????? ???????? ??????</th>
                    <th>???????? ??????????????</th>
                    <th>?????????? ??????</th>
                    <th>??????????????</th>
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
                          disabled={d.result || !d.running ? true : false}
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
                        {("0" + Math.floor((totalTimeSpent / 1000) % 60)).slice(-2)}
                      </span>
                      {/* <span>{("0" + ((totalTimeSpent / 10) % 100)).slice(-2)}</span> */}
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
              ??????
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default Qc;
