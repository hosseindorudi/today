import React from 'react'
import { useTranslation } from 'react-i18next'
import './sidebar.css'
function Sidebar() {
    const {t}=useTranslation()
  return (
    <div
    className="sidebar"
  >
      {t("language")}

    {/* <div className="sidebar-wrapper" ref="sidebarWrapper">
      <ul className="nav">
      
         {this.context.state.isMobile?null:
        <Navbar.Form className='searchSidebarForm'>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <i className="fa fa-search" />
              </InputGroup.Addon>
             
                <FormControl className='searchSidebar' type="text" value={this.state.searchValue} onChange={this.handleSearch} placeholder={this.props.t("search")} />
               

            </InputGroup>
          </FormGroup>
        </Navbar.Form>}
        {this.state.foundMenus.length > 0 ?
          <ul className="listSearchMenues">
            {this.state.foundMenus.map((prop, key) => (
              <li key={key} >
                

                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                onClick={()=>this.handleClickNavLinkSearch() }
                >
                  <span className="sidebar-normal" style={{ direction: this.props.lang === "Fa" ? 'rtl' : 'ltr', "font-size": "smaller" }} >{prop.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          : ''}
        
        {this.checkCondition()===true
        &&(
        !this.state.foundMenus.length? this.createLinks(routes, lang):''
        )
        }
      </ul>

    </div> */}
  </div>
  )
}

export default Sidebar