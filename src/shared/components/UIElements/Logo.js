import React from 'react'
import oglelogo from '../../images/logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={oglelogo} alt='Atheneum' />
    </div>
)

export default logo