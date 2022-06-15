import { t } from "i18next"

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

export const downloadCSVCode=(data,title)=>{
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += data + "\r\n";
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${t(title)}.csv`);
    document.body.appendChild(link); 
    link.click();
}
