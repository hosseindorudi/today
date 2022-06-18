import { useState } from 'react'
import './admitionFinalForm.css'
import PatternLock from './patternLock/PatternLock'
import Multiselect from 'multiselect-react-dropdown';
import SignaturePad from './signaturePad/src';
const AmitionFinalForm = () => {
    const [textRecieved, setTextRecieved] = useState("")
    const [textDivVal, setTextDivVal] = useState(false)
    const [patternLock, setpatternLock] = useState(false);
    const [patternLockSize, setPatternLockSize] = useState("0");
    const [gmailVal, setGmailVal] = useState(false);
    const [agentDescVal, setAgentDescVal] = useState(false)


  return (
    <div className="mainDiv">
        <div className="recievedNumber">
            <span className="recievedSpan">شماره قبض</span>
            <div className="recievedDiv">
                <span></span>
            <span>555555555555555</span>
                <button className='recievedNew'>جدید</button>
            </div>
        </div>
        <div className="groupAndCustomer">
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
        <div className="admitionItems">
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
                        <div className='patternLock' style={{display: patternLock ? 'block' : 'none'}}><PatternLock   size={patternLockSize} setpatternLock = {setpatternLock} /></div>
                    </div>
                </div>
                <div className="acountInformationDiv">
                    <span className="aountCustomerSpan">اطلاعات اکانت</span>
                    <div className="acountCustomerDiv">
                        <div  className={gmailVal ? "acountDmailDiv2" : "acountDmailDiv"}>
                            <span className={gmailVal ? "acountDivGmailSpan2" : "acountDivGmailSpan"}>ایمیل</span>
                            <input type="email" onFocus={(e) => setGmailVal(true)} onBlur={(e) => setGmailVal(false)} className="acountInputSpan" />
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
                            options={[
                                {name: 'نصب نرم افزار', id: 1},
                                {name: 'بکاپ گیری', id: 2},
                                {name: 'گلس', id: 3},
                                {name: 'برنامه جانبی', id: 4},
                                {name: 'ساخت اکانت', id: 5},
                            ]}

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
                            <SignaturePad sigType={"customer"}  clearButton="true"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="agentItems" >
            <span className="agentSpan">کارشناس</span>
            <div className="agentItemsDiv">
                <div className="agentDescription">
                    <div className="agentescriptionDiv">
                        <span className={agentDescVal ? "agentDescriptionSpan2" : "agentDescriptionSpan"}>توضیحات</span>
                        <div className={agentDescVal ? "agentDescriptionInputDiv2" : "agentDescriptionInputDiv"}>
                            <textarea  onFocus={(e) => setAgentDescVal(true)} onBlur={(e) => setAgentDescVal(false)} className='agenttextAreaDesc' cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
                <div className="agentSigPadDiv">
                    <span className="agentSigSpan">امضا</span>
                    <div className="signaturePadDiv">
                        <div className='sigMainDiv'>
                            <SignaturePad sigType={"agent"}  clearButton="true"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='ButtonDiv'>
            <button className="admitionFinalFormSubmit">ارسال</button>
        </div>
    </div>
  )
}

export default AmitionFinalForm