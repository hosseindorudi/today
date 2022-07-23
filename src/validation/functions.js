import axios from "axios";
import { t } from "i18next";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { languages } from "../assets/languages/languages";
import MapShowLocation from "../Components/map/MapShowLocation";
import { enums } from "../data/Enums";
import { osIcons } from "../data/osIcons";

export const convertUTC = (utc) => {
  const lang = localStorage.getItem("i18nextLng");
  var local = new Date(utc);
  switch (lang) {
    case "fa":
      return new Intl.DateTimeFormat("fa-IR").format(local);
    default:
      return new Intl.DateTimeFormat("en-US").format(local);
  }
};

export const setDatePickerDate = (dater) => {
  let finalDate =
    dater.getFullYear() +
    "-" +
    ("0" + (dater.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dater.getDate()).slice(-2);

  return finalDate.toString();
};

export const downloadCSVCode = (data, title) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += data + "\r\n";
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${t(title)}.csv`);
  document.body.appendChild(link);
  link.click();
};

export const defintionInputs = (values, typeTitle, errorMSG) => {
  const inputes = [
    {
      id: 1,
      name: "title",
      type: "text",
      label: typeTitle ? typeTitle : t("title"),
      placeholder: typeTitle ? typeTitle : t("title"),
      errorMessage: errorMSG ? errorMSG : t("title.errorMessage"),
      pattern: "^[\u0600-\u06FF,A-Za-z0-9,+, ]{2,255}",
      required: true,
      value: values.title,
    },
    {
      id: 2,
      name: "periority",
      type: "number",
      label: t("periodity"),
      placeholder: t("periodity"),
      errorMessage: t("periodity.errorMessage"),
      required: true,
      value: values.periority,
      min: 1,
      max: 1000,
    },
    {
      id: 3,
      name: "color",
      label: t("color"),
      type: "color",
      errorMessage: t("color.errorMessage"),
      required: true,
      value: values.color,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      label: t("description"),
      placeholder: t("description"),
      errorMessage: t("description.errorMessage"),
      pattern: "^[\u0600-\u06FF,A-Za-z0-9 ]{0,3999}",
      required: false,
      value: values.desc,
      as: "textarea",
      rows: "3",
    },
  ];
  return inputes;
};

export const createSelectOptions = (titles) => {
  const options = titles.map((m, i) => ({
    value: m.Id,
    label: m.Value,
    color: m.Color ? `#${m.Color}` : "#0000FF",
  }));
  return options;
};

export const createSelectRepairedOptions = (titles) => {
  const options = [
    {
      value: 0,
      label: "گروه اصلی",
      color: "#234567",
    },
  ];

  for (let i = 0; i < titles.length; i++) {
    options.push({
      value: titles[i].Id,
      label: titles[i].Value,
      color: titles[i].Color ? `#${titles[i].Color}` : "#0000FF",
    });
  }

  return options;
};
export const findOsIcon = (value) => {
  const splited = value.split(" ");
  const os = splited[0];
  return osIcons[os];
};
export const checkTableValues = (type, value, post, exportAccess) => {
  switch (type) {
    case "DateSet":
      return convertUTC(value);
    case "IsActive":
    case "Activated":
    case "IsPerishable":
    case "MainPart":
    case "IsReference":
      return <Form.Check type="switch" disabled checked={value} />;
    case "Gender":
    case "Real_Gender":
      return value ? t("male") : t("female");
    case "IsReal":
      return value ? t("real") : t("legal");
    case "IsOfficially":
      return value ? t("IsOfficially") : t("IsNotOfficially");
    case "LimitFrom":
    case "LimitTo":
      return post.IsLimited ? convertUTC(value) : "-";
    case "Real_DateOfIssuanceIdCard":
    case "Real_DateOfBirth":
    case "Legal_RegistrationDate":
    case "Legal_ExpirationDate":
      return value ? convertUTC(value) : "-";
    case "Color":
      return <Form.Control type="color" value={`#${value}`} disabled />;
    case "OS":
      return findOsIcon(value);
    case "IP":
      return <MapShowLocation isIP={true} value={value} />;
    case "Description":
      if (
        (value.length > 0) &
        (exportAccess === enums.Operator_Event_Export_r)
      ) {
        return <p>{t("logview")}</p>;
      } else {
        return value;
      }
    case "Language_EId":
      return languages.find((l) => l.no === value).name;
    case "MySession":
      return value ? t("Yes") : t("No");
    default:
      return value;
  }
};
export const checkTableTH = (type, access) => {
  switch (type) {
    case "Title":
      switch (access) {
        case enums.Definition_Device_Export_r:
          return t("device");

        default:
          return t(type);
      }
    default:
      return t(type);
  }
};
export const handleError = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const dateOfLogTable = (date) => {
  let a = date.split("T");
  a[0] = convertUTC(a[0]);
  return a.join("\n");
};

export const checkQuestionEId = (EID, value) => {
  switch (EID) {
    case 7:
      return convertUTC(value);

    default:
      return value;
  }
};
export const getGeoFromIp = async (ip) => {
  var config = {
    method: "get",
    url: `http://ip-api.com/json/${ip}`,
    headers: {},
  };

  const result = await axios
    .request(config)
    .then(function (response) {
      const latLng = [response.data.lon, response.data.lat];
      return latLng;
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
};
