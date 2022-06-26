import { useTranslation } from 'react-i18next'
import useButtonAccess from '../../../customHooks/useButtonAccess';
import './mobileModalRitghtBar.css'
import ExportAllButton from '../ExportButton/ExportAllButton';
import * as fa from "react-icons/fa";
import ImportCSV from '../ImportCSVButton/ImportCSV';
const MobileModalRightBar = ({
    numberOfRecordsPerPage,
          currentPage,
          sort,
          flt_Title,

          exportLink,

          searchBegin,
          searchEnd,

          importSuccess,
          handleClickLog,
          handleClickAccessList,
          IsFavorite,
          handleClickFav,
          exportAccess,
          importAccess,
          sampleUrl,
          fileCheckURL,
          importURL,
          logAccess,
          accessListAccess,
          handleClickHelp,
          setMobileModalButtons
        
}) => {
    const [haveAccess] = useButtonAccess();
    const {t}=useTranslation()
  return (
    <div className="mobileRightBarMain">
        <div className="mobileRightBarInfo">
            <div className="reacttableParentMainRightUp1">
                <span className="reacttableParentMainRightUpInformation1">
                {t("table.information")}
                </span>
                <div className="reacttableParentMainRightUpInformationDiv1">
                        <div className="mobileRightBarSpanStyle">
                            <span className="mobileRightBarFirst">نام:</span>
                            <span className="mobileRightBarSecond">حسین</span>
                        </div>
                        <div className="mobileRightBarSpanStyle">
                            <span className="mobileRightBarFirst">نام خانوادگی:</span>
                            <span className="mobileRightBarSecond">درودی</span>
                        </div>
                        <div className="mobileRightBarSpanStyle">
                            <span className="mobileRightBarFirst">مرورگر:</span>
                            <span className="mobileRightBarSecond">Chrome</span>
                        </div>
                        <div className="mobileRightBarSpanStyle">
                            <span className="mobileRightBarFirst">آی پی:</span>
                            <span className="mobileRightBarSecond">000.000.000.00</span>
                        </div>
                        <div className="mobileRightBarSpanStyle">
                            <span className="mobileRightBarFirst">سیستم عامل:</span>
                            <span className="mobileRightBarSecond">Windows</span>
                        </div>

                   

                </div>
            </div>
        </div>
        <div className="mobileRightBarButtons">
        <div className="reacttableParentMainRightDown">
        <span className="reacttableParentMainRightDownToolBox">
          {t("table.tools")}
        </span>
        <div className="reacttableParentMainRightDownToolBoxDiv1">
                        
                        <div className="mobileRightBarFirst1">

                            {haveAccess(exportAccess) && (
                                <ExportAllButton
                                numberOfRecordsPerPage={numberOfRecordsPerPage}
                                currentPage={currentPage}
                                sort={sort}
                                flt_Title={flt_Title}
                                seartBegin={searchBegin}
                                seartEnd={searchEnd}
                                exportLink={exportLink}
                                />
                            )}
                            {haveAccess(importAccess) && (
                                <ImportCSV
                                importSuccess={importSuccess}
                                sampleUrl={sampleUrl}
                                fileCheckURL={fileCheckURL}
                                importURL={importURL}
                                />
                            )}

                            {haveAccess(logAccess) && (
                                <button
                                className="reactTableParentLogButton"
                                title="log"
                                onClick={handleClickLog}
                                >
                                <fa.FaHistory />
                                </button>
                            )}

                        </div>
                        <div className="mobileRightBarFirst2">

                            

                            {haveAccess(accessListAccess) && (
                                <button
                                className="reactTableParentAccessButton"
                                onClick={handleClickAccessList}
                                >
                                <fa.FaUserLock />
                                </button>
                            )}

                            <button
                                disabled={IsFavorite}
                                title="favorite"
                                className={`reactTableParentFavoritButton ${
                                IsFavorite ? "favactive" : ""
                                }`}
                                onClick={handleClickFav}
                            >
                                <fa.FaRegStar />
                            </button>
                            <button
                                className="reactTableParentHelpButton"
                                onClick={handleClickHelp}
                                title="help"
                            >
                                <fa.FaQuestionCircle />
                            </button>

                        </div>
                       
                    
                        
                        
                        
                        </div>
                    </div>
        </div>

        <div className="mobileRightBarButtom">
            <button className='mobileRightBarBTN' onClick={()=> setMobileModalButtons(false)}>بازگشت</button>
        </div>
    </div>
  )
}

export default MobileModalRightBar