
import CircularMenuItem from './CircularMenuItem';
import './circularMenu.css'
import logo from '../../assets/imgs/logo22.png'
function CircularMenu({ pages }) {
  
    

    return (
    
        <div className="circular-menu">
          <div className="menu-button" >
            <img src={logo} width='100%'/>
        </div>
        {
          pages.map((item, index) => (
            <CircularMenuItem
                key={index}
                item={item}
                rotation={(360 / pages.length) * index}
                menuIsOpen={true}
                transitionDelay={index * 75}
            />
          ))
        }
      </div>
     
    );
}

export default CircularMenu;