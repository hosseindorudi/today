function CircularMenuItem({ 
    page, 
    color, 
    rotation, 
    menuIsOpen, 
    transitionDelay 
}) {
    return (
        <div
            className="menu-item"
            style={{
              backgroundColor: color,
              transform: `rotate(${rotation}deg) translate(${menuIsOpen ? 175 : 0}%)`,
              transitionDelay: `${menuIsOpen ? transitionDelay : 0}ms`
            }}
        >
            <span style={{
                transform: `rotate(${-rotation}deg)`
            }}>{page}</span>
        </div>
    );
}

export default CircularMenuItem;