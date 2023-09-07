import React , {useEffect, useState, useTransition} from 'react'
import classes from "./Booking.module.css";
import Logo from "../../images/WebusLogo.png";
import ProfileButtom from 'components/ProfileButtom/ProfileButtom';
import Profile from 'images/Profile';
import ShowIcon from 'images/logos/ShowIcon';
import CurrentCard from 'components/CurrentCard/CurrentCard';
import PrevCard from 'components/PrevCard/PrevCard';
import PendCard from 'components/PendCard/PendCard';
import { useQuery } from 'react-query';
import { toast } from "react-toastify";
import {
	getAddressList,
	listBus,
	listMaritime,
	listPrivates,
	searchTripsMaritime,
} from "api";
import { showApiErrorMessages } from 'utils';
import { useNavigate } from 'react-router-dom';
import EmptyState from 'components/EmptyState/EmptyState';
import { forEach } from 'lodash';
import { useTranslation } from 'react-i18next';
const compareDate = (mydate:any)=>{
	var q = new Date();
var m = q.getMonth()+1;
var d = q.getDay();
var y = q.getFullYear();

let date:string = `${y}-${m}-${d}`;

let yourDate:any = new Date();

date =yourDate.toISOString().split("T")[0];


if(date>mydate)
{
    return true;
}
else
{
	return false;
}
}
const BookingCard = () => {
  const navigate = useNavigate();
  const [privates, setPrivates] = useState<any>([]);
  const [addressList, setAddressList] = useState<any>([]);
  const [bus, setBus] = useState<any>([]);
  const [fbus , setFbus] = useState<any>([]);
  const [maritimes, setMritimes] = useState<any>([]);
  const [allTrips , setAllTrips] = useState<any>([]);
  const [nav , setNav]= useState<any>("All");
  const [t , i18n]=useTranslation();
  let newBus: any[] = [];

  const { data, isLoading } = useQuery(
		["getTripsMarinTime"],
		() => {
			return listPrivates();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setPrivates([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  const { data: addressListData } = useQuery(
		["addressListData"],
		() => {
			return getAddressList();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setAddressList([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  const { data: busListData } = useQuery(
		["busListData"],
		() => {
			return listBus();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setBus([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  const { data: maritimesListData } = useQuery(
		["maritimeListData"],
		() => {
			return listMaritime();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setMritimes([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
  useEffect(()=>{
    setAllTrips([ ...privates , ...addressList , ...bus, ...maritimes])
  } , [])
  if(isLoading){
    <p>Loading</p>
  }
  	// if(addressList.length > 0){
	// 	compareDate(addressList.date)
	// }
	if(nav === "cur"){
		
	for(let i=0 ; i< bus.length ; i++){
		if(compareDate(bus[i].date) === false && bus[i].payment_data.status !== "Pending"){
			newBus = [...newBus , bus[i] ];
		}
	}
	
				
			
return <div className={classes.bookingCard}>
        <h2 className={classes.title}>{t("myBooking")}</h2>
        <ul className={classes.bookingList}>
            <li className={nav==="All" ? classes.active :""} onClick={()=>setNav("All") }>{t("allBooking")}</li>
            <li className ={nav === "cur"? classes.active : "" } onClick={()=>setNav("cur")}>{t("currBooking")}</li>
            <li className={nav === "pend"? classes.active: ""} onClick={()=>{setNav("pend")}}>{t("pendBooking")}</li>
            <li className={nav === "prev" ? classes.active : ""} onClick={()=>{setNav("prev")}}>{t("prevBooking")}</li>
        </ul>
				
			{ newBus.length===0? <p> no Current </p> : newBus.map((bu:any)=> <CurrentCard key={bu} total={bu.total} seat={bu.tickets[0].seat_number} stationFrom={bu.station_from.name} stationTo={bu.station_to.name} timeFrom={bu.station_from.arrival_at} 
			timeTo={bu.station_to.arrival_at}/>)}
		</div>
	}
	if(nav === "pend" ){
		for(let i=0 ; i< bus.length ; i++){
			if(compareDate(bus[i].date) === false && bus[i].payment_data.status === "Pending"){
				newBus = [...newBus , bus[i] ];
			}
		}
		return    <div className={classes.bookingCard}>
        <h2 className={classes.title}>{t("myBooking")}</h2>
        <ul className={classes.bookingList}>
            <li className={nav==="All" ? classes.active :""} onClick={()=>setNav("All") }>{t("allBooking")}</li>
            <li className ={nav === "cur"? classes.active : "" } onClick={()=>setNav("cur")}>{t("currBooking")}</li>
            <li className={nav === "pend"? classes.active: ""} onClick={()=>{setNav("pend")}}>{t("pendBooking")}</li>
            <li className={nav === "prev" ? classes.active : ""} onClick={()=>{setNav("prev")}}>{t("prevBooking")}</li>
        </ul>
			{newBus.length ===0?<p>No Pennding</p> : newBus.map((bu:any)=> <PendCard id={bu.id} cancel={bu.can_be_cancel} key={bu} total={bu.total} seat={bu.tickets[0].seat_number} stationFrom={bu.station_from.name} stationTo={bu.station_to.name} timeFrom={bu.station_from.arrival_at} 
			timeTo={bu.station_to.arrival_at}/>)}
		</div>
	}
	if(nav === "prev" && !compareDate(addressList.data) ){
		return    <div className={classes.bookingCard}>
        <h2 className={classes.title}>{t("myBooking")}</h2>
        <ul className={classes.bookingList}>
            <li className={nav==="All" ? classes.active :""} onClick={()=>setNav("All") }>{t("allBooking")}</li>
            <li className ={nav === "cur"? classes.active : "" } onClick={()=>setNav("cur")}>{t("currBooking")}</li>
            <li className={nav === "pend"? classes.active: ""} onClick={()=>{setNav("pend")}}>{t("pendBooking")}</li>
            <li className={nav === "prev" ? classes.active : ""} onClick={()=>{setNav("prev")}}>{t("prevBooking")}</li>
        </ul>
			{bus.map((bu:any)=> <PrevCard key={bu} total={bu.total} seat={bu.tickets[0].seat_number} stationFrom={bu.station_from.name} stationTo={bu.station_to.name} timeFrom={bu.station_from.arrival_at} 
			timeTo={bu.station_to.arrival_at}/>)}
		</div>
	}
  return (
    <div className={classes.bookingCard}>
        <h2 className={classes.title}>{t("myBooking")}</h2>
        <ul className={classes.bookingList}>
            <li className={nav==="All" ? classes.active :""} onClick={()=>setNav("All") }>{t("allBooking")}</li>
            <li className ={nav === "cur"? classes.active : "" } onClick={()=>setNav("cur")}>{t("currBooking")}</li>
            <li className={nav === "pend"? classes.active: ""} onClick={()=>{setNav("pend")}}>{t("pendBooking")}</li>
            <li className={nav === "prev" ? classes.active : ""} onClick={()=>{setNav("prev")}}>{t("prevBooking")}</li>
        </ul>
	
        {
          nav==="All"?
          bus.map((bu:any)=> <CurrentCard key={bu} total={bu.total} seat={bu.tickets[0].seat_number} stationFrom={bu.station_from.name} stationTo={bu.station_to.name} timeFrom={bu.station_from.arrival_at}
              timeTo={bu.station_to.arrival_at}  /> )
          :""
        }
       
   
    </div>
  )
}

export default BookingCard;