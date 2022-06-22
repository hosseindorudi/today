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

export const defintionInputs=(values)=>{
  const inputes=  [
        {
          id: 1,
          name: "title",
          type: "text",
          label: t("title"),
          placeholder: t("title"),
          errorMessage: t("title.errorMessage"),
          pattern: "^[\u0600-\u06FF,A-Za-z0-9 ]{2,100}",
          required: true,
          value: values.title,
        },
        {
          id: 2,
          name: "color",
          label: t("color"),
          type: "color",
          errorMessage: t("color.errorMessage"),
          required: true,
          value:values.color
        },
        {
          id: 3,
          name: "periority",
          type: "number",
          label: t("periodity"),
          placeholder: t("periodity"),
          errorMessage: t("periodity.errorMessage"),
          required: true,
          value: values.periority,
        },
        {
          id: 4,
          name: "desc",
          type: "text",
          label: t("description"),
          placeholder: t("description"),
          errorMessage: t("description.errorMessage"),
          pattern: "^[\u0600-\u06FF,A-Za-z0-9 ]{2,800}",
          required: true,
          value: values.desc,
        },
      ];
      return inputes
}