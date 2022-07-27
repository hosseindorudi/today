import React  from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";
function Search(props) {
 
  return (
    <>
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1"><BsSearch/></InputGroup.Text>
    <FormControl
      style={{backgroundColor:"white", color:"black"}}
      aria-label="search"
      aria-describedby="basic-addon1"
     
      onChange={props.handleChange}
    />
  </InputGroup>
    </>
  )
}

export default Search