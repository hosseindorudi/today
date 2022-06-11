export const convertUTC=(utc)=>{
    const lang=localStorage.getItem("i18nextLng")
     var local=new Date(utc)
     switch (lang) {
         case "fa":
             return new Intl.DateTimeFormat('fa-IR').format(local)
         default:
             return new Intl.DateTimeFormat('en-US').format(local)
     }
}

export const  setDatePickerDate = (dater) => {
    let finalDate =dater.getFullYear() + "-" + ("0" + (dater.getMonth() + 1)).slice(-2) + "-" + ("0" + dater.getDate()).slice(-2) ;
    
    return finalDate.toString();

}