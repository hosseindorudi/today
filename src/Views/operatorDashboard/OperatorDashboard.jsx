import React from 'react'
import './opratorDashboard.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Platform from 'react-platform-js'
import Modal from './modal/Modal'
const OperatorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [ip,setIP] = useState('');
    
  //creating function to load ip address from the API
  const getData = async()=>{
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(res.data.IPv4)
  }
  
  useEffect(()=>{
      //passing getData method to the lifecycle method
      getData()
  },[])



  return (
    <div className="mainOperatorDash">
      <div className="firstOperatorColumn">
        <div className="operatorDashboardInformation">
          <div className="dashInformationDiv">
              <span>{ip}</span>
              <span>:IP</span>
          </div>
          <hr />
          <div className="dashInformationDiv">
              <span>{Platform.OS} {Platform.OSVersion}</span>
              <span>:OS</span>
          </div>
          <hr />
          <div className="dashInformationDiv">
              <span>{Platform.Browser}</span>
              <span>:Browser</span>
          </div>
          <hr />
          <div className="dashInformationDiv">
              <span>حسین درودی</span>
              <span>:Operator</span>
          </div>
        </div>
        <div className="operatorDashboardFavarot">
          <div className="favarotContainer">
            
            <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
            <div className="favarotIcon"><i className="fa fa-users" aria-hidden="true"></i></div>
            <div className="TitleAndDestroy">
              <span>موضوع</span>
            </div>
          </div>
          <div className="favarotContainer">
            
            <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
            <div className="favarotIcon"><i className="fa fa-users" aria-hidden="true"></i></div>
            <div className="TitleAndDestroy">
              <span>موضوع</span>
            </div>
          </div>
          <div className="favarotContainer">
            
            <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
            <div className="favarotIcon"><i className="fa fa-users" aria-hidden="true"></i></div>
            <div className="TitleAndDestroy">
              <span>موضوع</span>
            </div>
          </div>
          <div className="favarotContainer">
            
            <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
            <div className="favarotIcon"><i className="fa fa-users" aria-hidden="true"></i></div>
            <div className="TitleAndDestroy">
              <span>موضوع</span>
            </div>
          </div>
          <div className="favarotContainer">
            
            <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
            <div className="favarotIcon"><i className="fa fa-users" aria-hidden="true"></i></div>
            <div className="TitleAndDestroy">
              <span>موضوع</span>
            </div>
          </div>
          <div className="favarotContainer">
            
            <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
            <div className="favarotIcon"><i className="fa fa-users" aria-hidden="true"></i></div>
            <div className="TitleAndDestroy">
              <span>موضوع</span>
            </div>
          </div>
        </div>
      </div>
      <div className="opratorDashActivity">
      <h3>لیست کارها</h3>
      <table className='opratorDashActivityTable'>
        <thead className='opratorDashActivityTableThead'>
          <tr>
            <th className='opratorDashActivityTableTheadTrTh'>#</th>
            <th className='opratorDashActivityTableTheadTrTh'>page</th>
            <th className='opratorDashActivityTableTheadTrTh'>Action</th>
            <th className='opratorDashActivityTableTheadTrTh'>Description</th>
            <th className='opratorDashActivityTableTheadTrTh'>Os</th>
            <th className='opratorDashActivityTableTheadTrTh'>Ip</th>
            <th className='opratorDashActivityTableTheadTrTh'>Browser</th>
            <th className='opratorDashActivityTableTheadTrTh'>DateTime</th>
          </tr>
        </thead>
        <tbody className='opratorDashActivityTableTbody'>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>asdasd</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
            <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
            <td className='opratorDashActivityTableTbodyTrTd'>1401/2/2</td>
          </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>asdasd</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
            <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
            <td className='opratorDashActivityTableTbodyTrTd'>1401/2/2</td>
          </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>asdasd</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
            <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
            <td className='opratorDashActivityTableTbodyTrTd'>1401/2/2</td>
          </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>asdasd</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
            <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
            <td className='opratorDashActivityTableTbodyTrTd'>1401/2/2</td>
          </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>asdasd</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
            <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
            <td className='opratorDashActivityTableTbodyTrTd'>1401/2/2</td>
          </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>asdasd</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
            <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
            <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
            <td className='opratorDashActivityTableTbodyTrTd'>1401/2/2</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="opratorDashNoteBefore">
          
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h1 className="opratorDashNoteTitle">یادداشت 1</h1>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h1 className="opratorDashNoteTitle">یادداشت 1</h1>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h1 className="opratorDashNoteTitle">یادداشت 1</h1>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h1 className="opratorDashNoteTitle">یادداشت 1</h1>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h1 className="opratorDashNoteTitle">یادداشت 1</h1>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h1 className="opratorDashNoteTitle">یادداشت 1</h1>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          
          
          <button className='opratorDashNotePlusBTN' onClick={() => setIsOpen(true)}><i class="fa fa-plus" aria-hidden="true"></i></button>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <div className="opratorDashAlert">
      <h3>لیست پیام ها</h3>
      <table className='opratorDashActivityTable'>
        <thead className='opratorDashActivityTableThead'>
          <tr>
            <th className='opratorDashActivityTableTheadTrTh'>#</th>
            <th className='opratorDashActivityTableTheadTrTh'>part</th>
            <th className='opratorDashActivityTableTheadTrTh'>Description</th>
            
          </tr>
        </thead>
        <tbody className='opratorDashActivityTableTbody'>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          <tr>
            <td className='opratorDashActivityTableTbodyTrTd'>1</td>
            <td className='opratorDashActivityTableTbodyTrTd'>5</td>
            <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="opratorDashListOfLogin">
      <h3>لیست ورود های مجاز</h3>
        <table className='opratorDashActivityTable'>
          <thead className='opratorDashActivityTableThead'>
            <tr>
              <th className='opratorDashActivityTableTheadTrTh'>#</th>
              <th className='opratorDashActivityTableTheadTrTh'>Ip</th>
              <th className='opratorDashActivityTableTheadTrTh'>Os</th>
              <th className='opratorDashActivityTableTheadTrTh'>Browser</th>
              <th className='opratorDashActivityTableTheadTrTh'>Date</th>
              <th className='opratorDashActivityTableTheadTrTh'>Description</th>
              
            </tr>
          </thead>
          <tbody className='opratorDashActivityTableTbody'>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className="opratorDashListOfFailed">
        <h3>لیست ورود های غیر مجاز</h3>
        <table className='opratorDashActivityTable'>
          <thead className='opratorDashActivityTableThead'>
            <tr>
              <th className='opratorDashActivityTableTheadTrTh'>#</th>
              <th className='opratorDashActivityTableTheadTrTh'>Ip</th>
              <th className='opratorDashActivityTableTheadTrTh'>Os</th>
              <th className='opratorDashActivityTableTheadTrTh'>Browser</th>
              <th className='opratorDashActivityTableTheadTrTh'>Date</th>
              <th className='opratorDashActivityTableTheadTrTh'>Description</th>
            </tr>
          </thead>
          <tbody className='opratorDashActivityTableTbody'>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
            <tr>
              <td className='opratorDashActivityTableTbodyTrTd'>1</td>
              <td className='opratorDashActivityTableTbodyTrTd'>46.209.24.138</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Windows</td>
              <td className='opratorDashActivityTableTbodyTrTd'>Chrome</td>
              <td className='opratorDashActivityTableTbodyTrTd'>1401/2/25</td>
              <td className='opratorDashActivityTableTbodyTrTd'>this is a description adjkl aldk bnakd bakdb ahkdb ajhdb jabd jahbd jabd ahbd ajldh bajdb ajd bjadb </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OperatorDashboard