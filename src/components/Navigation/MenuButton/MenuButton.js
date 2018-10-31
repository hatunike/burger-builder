import React from 'react';
import classes from './MenuButton.module.css';

const menuButton = (props) => (
    <div className={classes.MenuButton} onClick={props.menuToggled} className={classes.MenuButton}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
 
export default menuButton;