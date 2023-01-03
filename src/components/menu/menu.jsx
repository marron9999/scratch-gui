import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './menu.css';

const MenuComponent = ({
    className = '',
    children,
    componentRef,
    place = 'right'
}) => (
    <ul
        className={classNames(
            styles.menu,
            className,
            {
                [styles.left]: place === 'left',
                [styles.right]: place === 'right'
            }
        )}
        ref={componentRef}
    >
        {children}
    </ul>
);

MenuComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    componentRef: PropTypes.func,
    place: PropTypes.oneOf(['left', 'right'])
};


const MenuItem = ({
    children,
    className,
//{{ #5
	appendName,
//}} #5
    onClick
}) => (
    <li
        className={classNames(
            styles.menuItem,
            styles.hoverable,
            className
//{{ #5
			,appendName
//}} #5
        )}
        onClick={onClick}
    >
        {children}
    </li>
);

MenuItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
//{{ #5
    appendName: PropTypes.string,
//}} #5    
    onClick: PropTypes.func
};


const addDividerClassToFirstChild = (child, id) => (
    child && React.cloneElement(child, {
        className: classNames(
            child.className,
            {[styles.menuSection]: id === 0}
        ),
        key: id
    })
);

const MenuSection = ({children}) => (
    <React.Fragment>{
        React.Children.map(children, addDividerClassToFirstChild)
    }</React.Fragment>
);

MenuSection.propTypes = {
    children: PropTypes.node
};

//{{ #5
const MenuStyle = ({value}) => (
	<style>{value}</style>
);
MenuStyle.propTypes = {
    value: PropTypes.string
};
const MenuDefine = ({name}) => (
	<div className={name}></div>
);
MenuDefine.propTypes = {
    name: PropTypes.string
};
//}} #5

export {
    MenuComponent as default,
    MenuItem,
    MenuSection
//{{ #5
    ,MenuStyle
    ,MenuDefine
//}} #5
};
