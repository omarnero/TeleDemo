import React from 'react'
import classes from "./Address.module.css";
import { BackButtom } from 'components/BackButtom/BackButtom';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import AddressCard from 'components/AddressCard/AddressCard';
const Address = () => {
  return (
    <div className={classes.layout}>
            <div className="container">
                <BackButtom />
                <div className={`${classes.two} mt-5`}>
                    <ProfileCard />
                    <AddressCard />
                </div>
            </div>
    </div>
  )
}

export default Address