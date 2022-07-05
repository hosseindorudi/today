import React, { useContext, useEffect } from 'react'
import './opratorDashboard.css'
import {useState} from 'react'
import Modal from './modal/Modal'
import useGeoLocation from "../../customHooks/useGeoLocation";
import { OsContext } from '../../contexts/OsInformationProvider'
import { toast } from 'react-toastify';
import { homeDashboard } from '../../services/dashboardServices';
import useAxios from '../../customHooks/useAxios';
import AppContext from '../../contexts/AppContext';
import BackDrop from '../../Components/backDrop/BackDrop';
import { useTranslation } from 'react-i18next';
import { TabContext } from '../../contexts/TabContextProvider';

import {Routes} from '../../Routes'
const OperatorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useGeoLocation();
  const {os,loaded} = useContext(OsContext)
  const abortController = new AbortController();
  const [response, loading, fetchData] = useAxios();
  const [dashboardInfoData, setDashboardInfoData] = useState({})
  const accessToken = localStorage.getItem("token");
  const [extraInfo, setExtraInfo] = useState([])
  const { app } = useContext(AppContext);
  const {t} = useTranslation();
  const tabContext = useContext(TabContext);
  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };



  const handleChangeFavoritPage = (type) => {

    Routes.map((route) => {
      return route.subNav ? (
        route.subNav.map((r) => {
         return  r.path === type && 
          tabContext.addRemoveTabs(
            {
              title: r.title,
              path: type,
              Component:r.Component,
              access:r.access,
            }
            , "add")
            
        })
      ) : route.path === type && 
      tabContext.addRemoveTabs(
        {
          title: route.title,
          path: type,
          Component:route.Component,
          access:route.access,
        }
        , "add") 
    })


      


  }

  



  useEffect(()=> {
    if(loaded) {
      fetchData({
        method: "POST",
        url: homeDashboard,
        headers: {
          accept: "*/*",
        },
        
       
        data: {
          Language: app.langCode,
          Os: os.os,
          Browser: os.browser,
          Ip: os.ip,
          Token: accessToken ? accessToken : "",
          Latitude: location.loaded ? location.coordinates.lat : 0,
          Longitude: location.loaded ? location.coordinates.lng : 0,

        },
        
        signal:abortController.signal,
        
       
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

  useEffect(()=> {
    setExtraInfo(dashboardInfoData.Favorite)
  }, [dashboardInfoData])
  

  useEffect(()=> {
    if (response){
    response.Result?setDashboardInfoData(response):handleError(response.Message)          
    }
},[response])


  return (

    <>
    {loading && <BackDrop open = {loading}/>}
    <div className="mainOperatorDash">
      <div className="firstOperatorColumn">
        <div className="operatorDashboardInformation">
          <div className="dashInformationDiv">
              <span>{os.ip}</span>
              <span>:IP</span>
          </div>

          <div className="dashInformationDiv">
          {/* {Platform.OSVersion} */}
              <span>{os.os}</span>
              <span>:OS</span>
          </div>

          <div className="dashInformationDiv">
              <span>{os.browser}</span>
              <span>:Browser</span>
          </div>

          <div className="dashInformationDiv">
              <span>{location.loaded?<>{`${location.coordinates.lat},${location.coordinates.lng}`}</> :"not supported"}</span>
              <span>:GeoLocation</span>
          </div>

          <div className="dashInformationDiv">
              <span>{dashboardInfoData.OperatorName}</span>
              <span>:Operator</span>
          </div>
        </div>
        <div className="operatorDashboardFavarot">
           {
            extraInfo && (extraInfo.map((dashboard, i) => (
              <>
                <div className="favarotContainer" key={i}>
              
                <div className="favarotClose"><button className="destroyFavarot"><i className="fa fa-times" aria-hidden="true"></i></button></div>
                <div className="favarotIcon" onClick={() => handleChangeFavoritPage(dashboard.Link)}><i  className={dashboard.Icon} aria-hidden="true"></i></div>
                <div className="TitleAndDestroy">
                  <span>{t(`${dashboard.Link}`)}</span>
                </div>
              </div>
              </>
            ))) 
          } 

       
          
          
          
        </div>
      </div>

      <div className="opratorDashNoteBefore">
          
          <div className="opratorDashNote">
            <div className="opratorDashNoteContainer">
              <div className="opratorDashNoteContainerInner">
                <div className="opratorDashNoteContainerInnerFront">

                  <h3 className="opratorDashNoteTitle">یادداشت 1</h3>
                  
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

                  <h3 className="opratorDashNoteTitle">یادداشت 1</h3>
                  
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

                  <h3 className="opratorDashNoteTitle">یادداشت 1</h3>
                  
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

                  <h3 className="opratorDashNoteTitle">یادداشت 1</h3>
                  
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

                  <h3 className="opratorDashNoteTitle">یادداشت 1</h3>
                  
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

                  <h3 className="opratorDashNoteTitle">یادداشت 1</h3>
                  
                </div>
                <div className="opratorDashNoteContainerInnerBack">
                  <button className='opratorDashNoteContainerInnerBackClose'><i className="fa fa-times" aria-hidden="true"></i></button>
                  <p className="opratorDashNoteDescription">تاخیر خود را در سیستم ثبت کنید</p>
                </div>
            </div>
          </div>
          </div>
          
          
          <button className='opratorDashNotePlusBTN' onClick={() => setIsOpen(true)}><i className="fa fa-plus" aria-hidden="true"></i></button>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}

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
    </>
  )
}

export default OperatorDashboard