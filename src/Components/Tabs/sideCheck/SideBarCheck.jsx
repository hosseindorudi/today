import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import FormTabsContext from "../../../contexts/FormTabsContex";
import { SideBarData } from "../../../data/SidebarData";
import "./sidebar.css";
function SideBar() {
  const { selectedForms, setSelectedForms } = useContext(FormTabsContext);

  const handleChange = (event) => {
   
    switch (event.target.checked) {
      case true:
        if(selectedForms.length===5){
          const updatedData = selectedForms.map((obj,index) => {
            if (index === 0) {
                return { ...obj,  name: event.target.name, key: event.target.value  };
            } else return obj;
        });
         return setSelectedForms(updatedData)
        }
        setSelectedForms(prev => [...prev, { name: event.target.name, key: event.target.value }])
        break;
      case false:
       let selected = selectedForms.filter((e) => e.key !== event.target.value);
        setSelectedForms(selected);
        break;
      default:
        break;
    }    
  };
  const isChecked=(key)=>{
    const found=selectedForms.find(e=>e.key===key)
    return found?true:false
  }
  return (
    <Form className="sideBarOptions" id='sideBarOptions'>
    <h5>فرم های مورد نظر را انتخاب کنید</h5>
     
        {SideBarData.map((data, index) => (
          <Form.Check
            onChange={handleChange}
            key={index}
            checked={isChecked(data.key)}
            type="checkbox"
            label={data.name}
            name={data.name}
            value={data.key}
          />
        ))}
    
    </Form>
  );
}

export default SideBar;
