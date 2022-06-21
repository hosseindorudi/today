import { useRef, useState, useContext, useEffect } from 'react'
import './admitionFinalForm.css'
import PatternLock from './patternLock/PatternLock'
import Multiselect from 'multiselect-react-dropdown';
import SignaturePad from './signaturePad/src';
import { toast } from 'react-toastify';
import BackDrop from '../../../../Components/backDrop/BackDrop';
import { enums } from '../../../../data/Enums';
import { TabContext } from '../../../../contexts/TabContextProvider';
import useAxios from '../../../../customHooks/useAxios';
import useRequest from '../../../../customHooks/useRequest';
import AppContext from '../../../../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { admitionCreate } from '../../../../services/admitionService'; 
import { admissionAccessoryReadTitle } from '../../../../services/admissionAccessory';
import { productGroupCreate } from '../../../../services/productGroup';
import Admission from './Admission';


const AmitionFinalForm = () => {
    const [type, setType] = useState("")
    const [textRecieved, setTextRecieved] = useState("")
    const [textDivVal, setTextDivVal] = useState(false)
    const [patternLock, setpatternLock] = useState(false);
    const [patternLockSize, setPatternLockSize] = useState("0");
    const [gmailVal, setGmailVal] = useState(false);
    const [agentDescVal, setAgentDescVal] = useState(false)
    const [patternArr, setPatternArr] = useState([])
    const [isHavPass, setIsHavPass] = useState(false)
    const [password, setPassword] = useState("")
    const [isHaveAccount, setishaveAccount] = useState(false)
    const [account, setAccount] = useState("")
    const [operatorDesc, setOperatorDesc] = useState("")
    const [customerSignature, setCustomerSignature] = useState("")
    const [operatorSignature, setOperatorSignature] = useState("")
    const [accessoryTitles, setAccessoriesTitles] = useState([])
    const [accessoryTitlesId, setAccessoriesTitlesId] = useState()
    const sigPad = useRef({});
    const sigPadCustomer = useRef({});
    const abortController = new AbortController();
    const [response, loading, fetchData, setResponse] = useAxios();
    const request = useRequest();
    const {t} = useTranslation();
    const tabContext = useContext(TabContext);
    
    const handleClickMenu = () => {
        tabContext.addRemoveTabs(
          {
            title: "routes.groupForm",
            path: "/operatorgroupcreate",
            Component:AmitionFinalForm,
            access: enums.AfterSales_New_Admission_Create_w,
          }
          , "remove");
        tabContext.addRemoveTabs(
          
          {
            title: "routes.admission",
            path: "/admission",
            Component: Admission,
            access: enums.AfterSales_New_Admission_Read_r,
          }
          
          , "add");
      };


      useEffect(()=> { 

        handleFunctions("Accessory")
      
        
          
        },[])
    
        const handleFunctions = (type) => {
            switch (type) {
                case "Accessory":
                    setType("Accessory")
                    fetchData({
                        method: "POST",
                        url: admissionAccessoryReadTitle,
                        headers: {
                          accept: "*/*",
                        },
                        data: request,
                        signal:abortController.signal,
                      })
                    break;
                
                default:
                    break;
            }
        }


      useEffect(()=> {
        if (response){
        response.Result?handleResponse(response,type):handleError(response.Message)          
        }
    },[response])

      const handleResponse=(response,type)=>{
        switch (type) {
          
          case "Accessory":
                console.log(response.Title)
                
    
                response.Title.map((m,i) => (
                    setAccessoriesTitles(prev => [...prev, {name:m.Value, id: m.Id}])
                ))
                response.Title.length&&setAccessoriesTitlesId(response.Title[0].Id)

                setResponse(undefined)
                
            break;
          case "SUBMIT" :
            handleSeccess(t("customer.created"));
            handleClickMenu();
          default:
            break;
        }
      }



   



    const handleError = (message) => {
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      };
  
      const handleSeccess=(message)=>{
    
        toast.success(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }




    const submitAdmitionForm = (e)=> {
        e.preventDefault()


        fetchData({
            method: "POST",
            url: admitionCreate,
            headers: {
              accept: "*/*",
            },
            data: {
              
              Id:0,
              Customer_Id: 10,
              ProductGroup_Id:2,
              Product_Id:2,
              Part_Id:2,
              ModelNumber:"09368659286",
              SerialNumber:"phone",
              IMEI1:"asdasd",
              IMEI2:"asdasdasd",
              CodeNumber : "asdasdasd",
              AdmissionNumber: "asdasdasd",
              IsHavePassword: true,
              Password: "asd",
              IsHaveAccount: account.length ? true : false,
              Account: account,
              Defect: "sdfasdasdasd",
              Customer_Description: textRecieved,
              Customer_Signature: String(sigPadCustomer.current.toDataURL()),
              Operator_Description: operatorDesc,
              Operator_Signature: String(sigPad.current.toDataURL()),
              SourceType: 1,
              Registrar: 1,
              DateSet: "2022-06-20T04:46:16.961Z",
              Customer_Title: "",
              ProductGroup_Title: "",
              Product_Title: "",
              Part_Title: "",
              Request: request,
    
            },
            signal:abortController.signal,
            
           
          })




    }


  return (
    <div className="mainAdmitionDiv">
        <div className="recievedmainDiv">
            <span className="recievedSpan">شماره قبض</span>
            <div className="recievedDiv">
                <span></span>
            <span>555555555555555</span>
                <button className='recievedNew'>جدید</button>
            </div>
        </div>
        <div className="admitionSecondDiv">

                <div className="customerList">
            <span className="customerSpan">مشتری</span>
            <div className="customerDiv">
                <div className='infoCustomerDiv'>
                    <div className="firstNameDiv">
                        <span className="firstNameSpanKey">نام:</span>
                        <span className="firstNameSpanValue">حسین</span>
                    </div>
                    <div className="firstNameDiv">
                        <span className="firstNameSpanKey">نام خانوادگی:</span>
                        <span className="firstNameSpanValue">درودی</span>
                    </div>
                    <div className="firstNameDiv">
                        <span className="firstNameSpanKey">کدملی:</span>
                        <span className="firstNameSpanValue">000000000</span>
                    </div>
                    <div className="firstNameDiv">
                        <span className="firstNameSpanKey">شماره تلفن:</span>
                        <span className="firstNameSpanValue">0210000000</span>
                    </div>
                    <div className="firstNameDiv">
                        <span className="firstNameSpanKey">شماره همراه:</span>
                        <span className="firstNameSpanValue">09120000000</span>
                    </div>
                    <div className="firstNameDiv">
                        <span className="firstNameSpanKey">آدرس:</span>
                        <span className="firstNameSpanValue">یوسف آباد ابن سینا شایان 23 پلاک 9 ساختمان سی تلکام</span>
                    </div>
                </div>
                <div className='buttonCustomerEditDiv'>
                    <button className="editCustomer">ویرایش</button>
                </div>
            </div>
            </div>
            <div className="groupList">
            <span className="groupSpan">گروه</span>
            <div className="groupDiv">
                <div className="grouptDivRight">
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">گروه محصول:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">محصول:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">بخش:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">مدل:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">سریال:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">کد:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">IMEI1:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                </div>
                <div className="grouptDivLeft">
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">IMEI2:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">حافظه:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">رنگ:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">شرکت وارد کننده:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">تاریخ خرید:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    <div className="grouptDivRightMainDiv">
                        <span className="groupDivSpanKey">تاریخ شروع گارانتی:</span>
                        <span className="groupDivSpanValue">09120000000</span>
                    </div>
                    
                </div>
            </div>
            </div>

            
        </div>

    <div className="admitionThirdDiv">

        <span className="admitionSpan">پذیرش</span>
            <div className="admitionItemsDiv">
                <div className="textFieldDescDiv">
                    <span className={textDivVal ? "failedDescSpan2" :'failedDescSpan'} >ایرادات</span>
                    <div className={textDivVal ? "DescDivFinal2" :'DescDivFinal'} >
                        <textarea name="" className='textFieldDesc' onFocus={(e) => setTextDivVal(true)} 
                            onBlur={(e) => setTextDivVal(false)}
                        cols="30" rows="10" value={textRecieved} onChange={(e) => setTextRecieved(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="acountPatternDiv">
                    <span className="acountpatternSpan">پترن (اختیاری)</span>
                    <div className="paternAcountDiv">
                        <div className="patternAcountButtons">
                        <button className="btnPattern" onClick={() => {setpatternLock(!patternLock); console.log(patternLock)}}>رسم الگو</button>
                            <div className="sectionDiv">
                            <select className='selectionLock' onChange={(e) => setPatternLockSize(e.target.value)} onClick={()=>setpatternLock(false)}>
                                <option value="0">3*3</option>
                                <option value="1">4*3</option>
                                <option value="2">4*4</option>
                                <option value="3">5*4</option>
                                <option value="4">5*5</option>
                            </select>
                            </div>
                        </div>
                        <div className='patternLock' style={{display: patternLock ? 'block' : 'none'}}><PatternLock  setPatternArr={setPatternArr}  size={patternLockSize} setpatternLock = {setpatternLock} /></div>
                    </div>
                </div>
                <div className="acountInformationDiv">
                    <span className="aountCustomerSpan">اطلاعات اکانت</span>
                    <div className="acountCustomerDiv">
                        <div  className={gmailVal ? "acountDmailDiv2" : "acountDmailDiv"}>
                            <span className={gmailVal ? "acountDivGmailSpan2" : "acountDivGmailSpan"}>ایمیل</span>
                            <input type="email" value={account} onFocus={(e) => setGmailVal(true)} onBlur={(e) => setGmailVal(false)} onChange={(e)=> setAccount(e.target.value)} className="acountInputSpan" />
                        </div>
                    </div>
                </div>
                <div className="deviceExtraDiv">
                    <span className="extraDeviceSpan">لوازم جانبی</span>
                    <div className="extraDeviceDiv" style={{direction:"ltr"}}>
                        <div className='multiSelectDiv'>
                            <Multiselect
                        
                            emptyRecordMsg="آیتمی برای نمایش وجود ندارد"
                            id='multiSelected'
                            options={accessoryTitles}

                            displayValue="name" // Property name to display in the dropdown options
                            placeholder="لوازم همراه"
                            hidePlaceholder ={true}
                            showArrow={false}
                            />
                        </div>
                        </div>
                </div>
                <div className="agentSignatur">
                    <span className="agentSigSpan">امضا</span>
                    <div className="signaturePadDiv">
                        <div className='sigMainDiv'>
                            <SignaturePad ref={sigPadCustomer} sigType={"customer"}  clearButton="true"  />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="admitionForthDiv">

            <span className="agentSpan">کارشناس</span>
                <div className="agentItemsDiv">
                    <div className="agentDescription">
                        <div className="agentescriptionDiv">
                            <span className={agentDescVal ? "agentDescriptionSpan2" : "agentDescriptionSpan"}>توضیحات</span>
                            <div className={agentDescVal ? "agentDescriptionInputDiv2" : "agentDescriptionInputDiv"}>
                                <textarea onChange={(e) => setOperatorDesc(e.target.value)} value={operatorDesc}  onFocus={(e) => setAgentDescVal(true)} onBlur={(e) => setAgentDescVal(false)} className='agenttextAreaDesc' cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="agentSigPadDiv">
                        <span className="agentSigSpan">امضا</span>
                        <div className="signaturePadDiv">
                            <div className='sigMainDiv'>
                                <SignaturePad ref={sigPad} sigType={"agent"}  clearButton="true"  />
                            </div>
                        </div>
                    </div>
                </div>

        </div>
        <div className="admitionButtonDiv">
        <button className="admitionFinalFormSubmit" onClick={(e) => submitAdmitionForm(e)}>ارسال</button>
        </div>
</div>
  )
}

export default AmitionFinalForm