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