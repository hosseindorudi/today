import './admitionFinalForm.css'

const AmitionFinalForm = () => {
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
                
            </div>
            </div>
            <div className="groupList">
            <span className="groupSpan">گروه</span>
            <div className="groupDiv"></div>
            </div>
        </div>
        <div className="admitionItems">
            <span className="admitionSpan">پذیرش</span>
            <div className="admitionItemsDiv"></div>
        </div>
        <div className="agentItems">
            <span className="agentSpan">کارشناس</span>
            <div className="agentItemsDiv"></div>
        </div>
        <button className="admitionFinalFormSubmit">ارسال</button>
    </div>
  )
}

export default AmitionFinalForm