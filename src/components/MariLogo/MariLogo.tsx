import React from 'react'
import classes from "./MariLogo.module.css";
import BackIcon from './BackIcon';
import CalnderIcon from './CalnderIcon';
const MariLogo = () => {
  return (
    <div className={`${classes.mariLogo} container` }>
        <div className={classes.actions}>
            <button className={classes.mariback}> <BackIcon /> <span>Back</span> </button>
            <button>Edit</button>
        </div>
        <div className={classes.mariHeader}>
            <h2>Nuweibaa - Aqaba</h2>
            <h3> <CalnderIcon /> Sat 25/5, Economy class</h3>
        </div>
    </div>
  )
}

export default MariLogo