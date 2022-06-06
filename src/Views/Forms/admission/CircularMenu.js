import { useState } from 'react';
import CircularMenuIcon from './CircularMenuIcon';
import CircularMenuItem from './CircularMenuItem';
import CloseCircularMenu from './CloseCircularMenu';

function CircularMenu({ pages }) {
    // state variables

    const [isOpen, setIsOpen] = useState(true);

    // ------------------------------

    // handle set isOpen

    const handleSetIsOpen = () => {
      setIsOpen(prevBool => !prevBool);
    };

    // ------------------------------

    return (
        <div className="circular-menu">
        <div className="menu-button" onClick={handleSetIsOpen}>
          {isOpen ? <CloseCircularMenu/> : <CircularMenuIcon/>}
        </div>
        {
          pages.map(([page, color], index) => (
            <CircularMenuItem
                key={page}
                page={page}
                color={color}
                rotation={(360 / pages.length) * index}
                menuIsOpen={isOpen}
                transitionDelay={index * 75}
            />
          ))
        }
      </div>
    );
}

export default CircularMenu;