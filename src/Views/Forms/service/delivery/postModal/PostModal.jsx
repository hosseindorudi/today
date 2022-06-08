import './postModal.css'

const PostModal = ({rowValus,setpostmodalValue}) => {
  return (
    <div className="tableModalParebtPost" >
            <div className="tableModalContainerPost">
                <div className="tableModalHeaderPost">
                <h1 className="tableModalHeadingPost">مرسولات</h1>
                </div>
                <button className="closeBtnPost" onClick={()=>setpostmodalValue(false)}>
                <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                <div className="tableModalContentPost">
                
                <form  className='tableModalFormPost'>
                    <h1 className='H1Postmodal'>آیا از ارسال خود اطمینان دارید؟</h1>
                    <div className="submitBTNDivPost">
                    <input type="submit" value="ارسال" className='tablePostModalSumitBtnModalSubmit'/>
                    </div>
                </form>
                </div>
            </div>
        </div>
  )
}

export default PostModal