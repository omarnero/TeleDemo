import React , {FC} from 'react'
import LocationIcon from './LocationIcon'
import classes from "./LocationView.module.css";
import address from 'shared/address';
interface LocationViewProps {
    phone:string;
    city:string;
    address:string
}
const LocationView:FC<LocationViewProps> = ({
    address, 
    city,
    phone
}) => {
  return (
    <>
    <div className={classes.locationView}>
        <LocationIcon /> 
        <p>{address}</p>
    </div>
    <div className={classes.locationView}>
        <LocationIcon /> 
        <p>{city}</p>
    </div>
    <div className={classes.locationView}>
        <LocationIcon /> 
        <p>{phone}</p>
    </div>

    <hr />
    </>
  )
}

export default LocationView