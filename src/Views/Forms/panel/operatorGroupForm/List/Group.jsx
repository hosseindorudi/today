import './groupTable.css'
import React, { useContext, useEffect, useMemo, useState } from "react";
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from "axios";
import UpArrow from "./Arrows/upArrow/UpArrow";
import MainUpArrow from "./Arrows/MainUpArrow/MainUpArrow";
import DownArrow from "./Arrows/downArrow/DownArrow";
import TableButtons from "./TableButtons/TableButtons";
import TableModal from "./TableModal/TableModal";
import TableDeleteRow from "./TableDletRow/TableDeleteRow";
import { Breadcrumb } from 'react-bootstrap';
import * as fa from 'react-icons/fa';
import {groupRead} from '../../../../../services/groupService'
import useAxios from '../../../../../customHooks/useAxios';
import useRequest from '../../../../../customHooks/useRequest';
import { Backdrop } from '@mui/material';
import useOsInformation from '../../../../../customHooks/useOSInformation';
import useGeoLocation from '../../../../../customHooks/useGeoLocation';
import AppContext from '../../../../../contexts/AppContext';
const Group = () => {
    const [response, error, loading, fetchData] = useAxios();
    const { app } = useContext(AppContext);
    const { ip, os, browser } = useOsInformation();
    const accessToken=localStorage.getItem("token");
    const location = useGeoLocation();
    const request=useRequest()
    const [columnSideBar, setColumnSideBar] = useState(false);
    const [search, setSearch] = useState(false);
    const [seartBegin, setSearchBegin] = useState(null);
    const [seartEnd, setSearchEnd] = useState(null);
    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({})
    const [posts, setPosts] = useState([])
    const [tableDeleteModalOpen, setTableDeleteModalOpen] = useState(false);
    const [checkAllC, setCheckAllC] = useState(true);
    const [productsColumns, setproductsColumns] = useState([]);
    const [isSorted, setIsSorted] = useState('0');

    const getTable = () => {
        
        fetchData({
            method: "POST",
            url: groupRead,
            headers: {
              accept: "*/*",
            },
            data:request
          });
    }
    const handleError=(message)=>{
    
        // toast.error(message, {
        //   position: toast.POSITION.BOTTOM_CENTER,
        // });
      }

    useEffect(()=>{
        getTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
    if(response){
     console.log(response)
    }
    if(error){
    // handleError(error.response?.data?.title)
    }
  }, [response,error])
    useMemo(
        () =>{
        setproductsColumns(posts[0]
            ? Object.keys(posts[0])
                .map((key) => {
                return { Header: key, accessor: key, show : true };
                })
            : []);
        },
        [posts]
    );

    const CheckBoxChangeHandler = (columnIndex) => {
            let newArr = [...productsColumns];
            newArr[columnIndex+1]["show"] = !newArr[columnIndex+1]["show"];
            setproductsColumns(newArr)
    }
    const checkAllHandler = (e) => {
        if (e.target.id === "checkAll") {
            setCheckAllC(!checkAllC)
            let arr = [...productsColumns]
            arr.map((a) => a.show = true)
            setproductsColumns(arr)
        }else if (e.target.id === "unCheckAll") {
            setCheckAllC(!checkAllC)
            let arr = [...productsColumns]
            arr.map((a) => a.show = false)
            setproductsColumns(arr)
        }
    }

  return (
    <>
    {loading &&<Backdrop open={true}/>}
        {productsColumns.length>0 && 
            <>
                {tableModalOpen && <TableModal rowValus={rowValus} setRowValues= {setRowValues}  setTableModalOpen={setTableModalOpen}/>}
                {tableDeleteModalOpen && <TableDeleteRow rowValus={rowValus}   setTableDeleteModalOpen={setTableDeleteModalOpen}/>}
                <div className="reacttableParent">
                    <div className="reacttableParentRight"
                    style={{width: columnSideBar ? 'calc(100% - 250px)' : '100%'}}>
                    <div className="reacttableParentUp" style={{height: search ? 200 : 100}}>
                    <div className="reacttableParentPlusButton">
                        <button className="plusBUTTON"><i className="fa fa-plus"></i></button>
                    </div>
                    
                    <div className="reacttableParentMiddleMiddleSide">
                    <div className='bredCrumbTable'>
                        <div role="presentation"  style={{direction: "ltr"}}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">خانه</Breadcrumb.Item>
                                <Breadcrumb.Item active>فرم</Breadcrumb.Item>
                                <Breadcrumb.Item active>جدول</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                    </div>
                            <div className='searchField' style={{display: search ? 'flex' : "none"}}>
                                <div style={{direction: "ltr"}}>
                                    <LocalizationProvider dateAdapter={AdapterJalali}>
                                        <DatePicker
                                        mask="____/__/__"
                                        label="تاریخ شروع"
                                        value={seartBegin}
                                        onChange={(newValue) => {
                                                                setSearchBegin(newValue);
                                                                if(seartEnd !== null && newValue > seartEnd ) {
                                                                    alert("تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد");
                                                                    setSearchBegin(null);
                                                                }
                                                            }}
                                        renderInput={(params) => <TextField  {...params} inputProps={{
                                            ...params.inputProps,
                                            
                                        }}/>}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div style={{direction: "ltr"}}>
                                    <LocalizationProvider dateAdapter={AdapterJalali}>
                                        <DatePicker
                                        label="تاریخ پایان"
                                        mask="____/__/__"
                                        value={seartEnd}
                                        onChange={(newValue) => {setSearchEnd(newValue);
                                                                if(seartBegin === null ) {
                                                                    alert("ابتدا تاریخ شروع را مشخص کنید!!!");
                                                                    setSearchEnd(null);
                                                                    return ;
                                                                }
                                                                if(seartBegin !== null && seartBegin > newValue){
                                                                    alert("تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد");
                                                                    setSearchEnd(null);
                                                                }    
                                                            }}
                                        renderInput={(params) => <TextField {...params}   inputProps={{
                                            ...params.inputProps,
                                            
                                        }} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="reacttableParentMain" style={{height: search ? 'calc(100vh - 460px)' : 'calc(100vh - 360px)'}}>
                    <div className="reacttableParentMainRight">
                        <div className="reacttableParentMainRightUp">
                            <span className="reacttableParentMainRightUpInformation">اطلاعات</span>
                            <div className="reacttableParentMainRightUpInformationDiv">
                            </div>
                        </div>
                        <div className="reacttableParentMainRightDown">
                            <span className="reacttableParentMainRightDownToolBox">ابزار</span>
                            <div className="reacttableParentMainRightDownToolBoxDiv">
                            
                                
                                
                                <div 
                                    onClick={()=> {setSearch(prev => !prev)}}
                                    style={{color: (!search && seartBegin !== null && seartEnd !== null) ? "red" : 'lightgray'}}>
                                    <i className="fa fa-search searchDater"
                                        aria-hidden="true"></i></div>
                                <div className="reacttableParentMainRightDownToolBoxDivColumnBtn">
                                    <button className={columnSideBar ? "hold": "columnBtnTableToggle"} onClick={() => {setColumnSideBar(!columnSideBar)}}>دسته ها</button>
                                </div>
                                <button className="reactTableParentExportButton"><fa.FaFileExport/></button>
                                <button className="reactTableParentImportButton"><fa.FaFileImport/></button>
                                <button className="reactTableParentLogButton"><fa.FaMicroblog/></button>
                                <button className="reactTableParentAccessButton"><fa.FaUserLock/></button>
                                <button className="reactTableParentFavoritButton"><fa.FaRegStar/></button>
                                <button className="reactTableParentHelpButton"><fa.FaHireAHelper/></button>
                                

                                </div>
                                
                                
                                
                                
                        </div>
                    </div>
                    <div className="reacttableParentMainLeft">
                        <div className="reacttableParentMainLeftRight">
                            <div className="reacttableParentMiddleMiddleMid">      
                                <table  className="MainTableCss">
                                    <thead className="MainTableThead">
                                            <tr className="MainTableTr">
                                                <th className="MainTableTh">
                                                    {" "}
                                                </th>
                                                {productsColumns.filter((p,i) => p["Header"] !== "id").map((column, index)=>(  
                                                    <th className="MainTableTh" key={index} style={{display : !column["show"] ? "none" : null}}>
                                                        {column["Header"]}
                                                        <button className='sortingArrowsBTN'>{isSorted ==='0' ?  (<UpArrow/>) : isSorted === '1' ? (<MainUpArrow/> ) :  (<DownArrow/>)  }</button>
                                                    </th>
                                                ))}
                                            </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map((post, index) => (       
                                            <tr  key={index}>
                                                <td className="TableMainTd">
                                                    <TableButtons setTableDeleteModalOpen={setTableDeleteModalOpen} setRowValues={setRowValues}  rowValue={post} setTableModalOpen={setTableModalOpen} />
                                                </td>
                                                {Object.keys(post).filter((p,i) => p !== "id").map((key, index) => {
                                                    return <td key={key + index} className="TableMainTd" style={{display :!productsColumns[productsColumns.findIndex(p => p["accessor"] === key )].show ? "none" : null}}>
                                                        {post[key]}
                                                    
                                                    </td>
                                                })} 
                                            </tr>
                                        ))}
                                    </tbody>       
                                </table>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="reacttableParentDown">      
                            <div className="downPaginationMain">
                                <ul className="page">
                                    <li className="page__btn"><button className="material-icons downPaginationBTN">&laquo;</button></li>
                                    <li  className="page__numbers"> 1</li>
                                    <li className="page__numbers active">2</li>
                                    <li className="page__numbers">3</li>
                                    <li className="page__numbers">4</li>
                                    <li className="page__numbers">5</li>
                                    <li className="page__numbers">6</li>
                                    <li className="page__dots">...</li>
                                    <li className="page__numbers"> 10</li>
                                    <li className="page__btn"><button className="material-icons downPaginationBTN">&raquo;</button></li>
                                </ul> 
                            </div>
                            <div className="downpaginationButtins">
                                <input type="number" className="pageNumber" placeholder='شماره صفحه ' min={1} max={10}/>
                                <select className='paginationSelector'>
                                    {[25,50,100].map((v,i)=>(
                                        <option key={i} value={v}>{v}</option>   
                                    )
                                    )}
                                </select>
                                <button className="sendForm">ارسال</button>
                            </div>
                    </div>
                    </div>
                    <div className="reactTableParentMiddle1">
                            <div className='reactTableParentMiddle1BTN' onClick={()=> setColumnSideBar(!columnSideBar)}></div>
                    </div>
                    <div className="reacttableParentLeft" style={{width:columnSideBar? 250: 0}}>
                            <div className="mainUnderCloseBtn">
                                <div className='checkBoxTableParentForAll'>
                                    <div></div>
                                    <input type="radio" checked={checkAllC}
                                    id="checkAll" name="checkall" onChange={checkAllHandler}/> 
                                    <input type="radio" checked={!checkAllC}
                                    id="unCheckAll" name="checkall" onChange={checkAllHandler}/> 
                                    <div></div>  
                                </div>
                                {productsColumns.filter((p,i) => p["Header"] !== "id").map((column, index)=>(
                                    <>
                                        <div className='checkBoxTableParent' key={index}>
                                            <label htmlFor="todo" data-content="Get out of bed">{column["Header"]}</label>
                                            <input type="checkbox" id="todo" checked={column.show} name="todo" value="todo" onChange={() => CheckBoxChangeHandler(index)} />
                                        </div>
                                    </>             
                                ))}
                            </div>
                    </div>
                </div>
            </>
        }
    </>
  )

}

export default Group