import React from 'react';
// import { BrowserRouter as Router,NavLink} from 'react-router-dom';
import classes from './NavigationItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>

    <a 
            href={props.link} 
            className={props.active ? classes.active : null}>{props.children}</a>
       
       
    </li>
);

export default navigationItem;