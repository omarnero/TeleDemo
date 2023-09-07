import React from 'react'
import classes from "./Booking.module.css";
import { BackButtom } from 'components/BackButtom/BackButtom';
import ProfileCard from 'components/ProfileCard/ProfileCard';
import BookingCard from 'components/BookingCard/BookingCard';
const Booking = () => {
  return (
    <div className={classes.layout}>
        <div className='container'>
            <BackButtom />
            <div className="two mt-5">
                <ProfileCard />
                <BookingCard />
            </div>
         </div>
    </div>
  )
}

export default Booking;