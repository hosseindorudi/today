import React from "react";
// import { useTranslation } from "react-i18next";

const TableFilter = ({filteres}) => {
//   const { t } = useTranslation();

  const checkFilter = () => {
   return filteres.forEach((filter,index)=>{
        switch (filter.type) {
            case "string":
                
                return "text"
        
            default:
                return
        }
    })

  };
  return <>{checkFilter()}</>;
};

export default TableFilter;
