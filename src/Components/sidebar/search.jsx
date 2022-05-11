import React  from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { BsSearch } from "react-icons/bs";
function Search() {
    const {t}=useTranslation()
  return (
    <>
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1"><BsSearch/></InputGroup.Text>
    <FormControl
      placeholder={t("search")}
      aria-label="search"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
    </>
  )
}

export default Search