import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation, useRoutes } from "react-router-dom";
import { searchTrip } from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import homeBg2 from "images/homeBg3.png";
import { forEach, set } from "lodash";
import SeatCard from "components/SeatCard/SeatCard";
import OpratorCard from "components/OpratorCard/OpratorCard";
import DepartureCard from "components/departureCard/DepartureCard";
import PriceCard from "components/PriceCard/PriceCard";
import BusTimeCard from "components/BusTimeCard/BusTimeCard";
// import TripAnalyzer from "./TripAnalys";

export interface ListingFlightsPageProps {
	className?: string;
}

const ListingBusPage: FC<ListingFlightsPageProps> = ({ className = "" }) => {
	const { t } = useTranslation();
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");

	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");
	const [trips, setTrips] = useState<any>([]);
	const [stationFrom , setStationFrom] = useState<any>([]);
	const [stationTo , setStationTo]= useState<any>([]);
	const [city, setCity] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [cityFrom, setCityFrom] = useState<any>("");
	const [paginationStatus, setPaginationStatus] = useState<boolean>(true);
	const [filterStation , setFilterStation] = useState<string>("");
	const [filterToStation , setFilerToStation] = useState<string>("");
	const [filterBus , setFilterBus] = useState<string>("");
	// after filtration
	const [FinalTrips , SetFinalTrips] = useState<any>([]);
	useEffect(() => {
		if (!!search) {
			const data = search.slice(1).split("/");
			setDate(data?.[0]);
			setTravelTo(data?.[1]);
			setTravelFrom(data?.[2]);
			setCity(data?.[3]);
			setCityFrom(data?.[4]);
			setTrips([]);
			setPage(1);
		}
	}, [search]);
	const [loading, setLoading] = useState<boolean>(false);

	const getTripsBus = async () => {
		setLoading(true);

		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {
			await searchTrip({ date, city_to: travelTo, city_from: travelFrom }, page)
				.then((res: any) => {
					if (res?.data?.data.length) {
						setTrips((prev: any) => [...prev, ...res?.data?.data]);
						SetFinalTrips((prev: any) => [...prev, ...res?.data?.data]);
			
					} else if (page > 1) {
						setPaginationStatus(false);
					}
					setLoading(false);
				})
				.catch((errors: any) => {
					setLoading(false);
					if (Object.keys(errors.response.data.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(errors.response.data.errors);
					} else {
						setLoading(false);
						toast.error(errors.response.data.message);
					}
				});
		}
	};
	type Trip = {
		arrival_at: string;
		name: string;
		// other properties...
	  };
	  
	  type TimeWithStation = {
		time: string;
		station: string;
	  };
	  
	  const list_times_with_count_trips_for_each = (trips: Trip[]): TimeWithStation[] => {
		const list_times: TimeWithStation[] = [];
		trips.forEach((trip) => {
		  if (!list_times.some((time) => time.time === trip.arrival_at)) {
			list_times.push({ time: trip.arrival_at, station: trip.name });
		  }
		});
		return list_times;
	  };
	useEffect(() => {

		if (
			travelTo !== undefined &&
			travelTo !== "undefined" &&
			travelFrom !== "undefined" &&
			travelFrom !== undefined &&
			!!travelFrom &&
			!!travelTo
		) {
			getTripsBus();
			
		}
	}, [travelTo, travelFrom, page, date]);

	let stationFromval:any = [] ;
	
	useEffect(()=>{
		if(trips.length > 0){
			for(let i=0; i<trips.length ; i++){
					stationFromval = [ ...stationFromval, ...trips[i].stations_from.map((item:any)=> item.name )] 
			}
				let duplactiom =  new Set<string>(stationFromval);
			stationFromval =Array.from(duplactiom);
			setStationFrom(stationFromval);
		}
	} , [trips])
	let stationToVal:any = [];
	useEffect(()=>{
		if(FinalTrips.length > 0){
			for(let i=0; i<FinalTrips.length ; i++){
					stationToVal = [ ...stationToVal, ...FinalTrips[i].stations_to.map((item:any)=> item.name )] 
			}
				let duplactiom =  new Set<string>(stationToVal);
			stationToVal =Array.from(duplactiom);
			setStationTo(stationToVal);
		}
	} , [FinalTrips])
	
	const stationHandler = (station:any)=>{
		setFilterStation(station);
	}
	const stationToHandler = (station:any) =>{
		setFilerToStation(station);
	}
	const BusHandler = (busName: any) =>{
			setFilterBus(busName);
	}
	let stationF:any = [];
	function setPlace (place:string){
		if(trips.length > 0){
			for(let i=0 ; i<trips.length ; i++){
				for(let j=0 ; j<trips[i].stations_from.length ; j++ ){

					if(trips[i].stations_from[j].name === place){
				
					stationF.push(trips[i]);
				}}
			}
	}
}
useEffect(()=>{
	setPlace(filterStation);
	SetFinalTrips(stationF);
	
	} , [filterStation])
	
	let finalPrices = [];
	let FPrice = [];
		finalPrices = FinalTrips.map((trip:any)=>trip.pricing);
			for(let i=0 ; i<finalPrices.length ; i++){
				for(let j=0 ; j<finalPrices[i].length ; j++){
			FPrice.push(finalPrices[i][j].final_price);
				}
			}
	
	return (
		<div
			className={`nc-ListingFlightsPage bg-[#dde2eb] relative overflow-hidden ${className}`}
			data-nc-id="ListingFlightsPage"
		>
			{/* bus back ground for search page  */}
			<div className="m-0 p-0  w-[100vw] h-[65vh] block" style={{
				// backgroundImage: `url(${homeBg2})`,
				objectFit:"contain",
			}}> <img src = {homeBg2} className="object-cover w-[100%]  m-0 p-0  h-[65vh] "></img>
			</div>

			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>
			<BgGlassmorphism />

			<div className="container flex flex-col items-center   relative">
				{/* SECTION HERO */}
				
				<SectionHeroArchivePage
					currentPage="Bus"
					currentTab="Bus"
					isLoading={loading}
					city={city}
					trips={trips}
					listingType={
						<div className="flex items-center">
							<BriefcaseIcon className="h-5 w-5" />

							<span className=" ">
								{trips.length} {t("Bus")}
							</span>
						</div>
					}
					className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
				/>
				
			<div className="w-[84vw]  h-[60px] mt-[-5.8rem]  flex flex-row border-1 justify-evenly  align-middle  triangle-container mb-4 " >
				 <div className="w-[30%] h-[100%] m-0 relative flex flex-row  ">
				 	<div className="absolute left-0 h-[100%] triangle align-middle text-center flex place-content-between bg-[#DDE2EB] "
				 >
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_860_1925)">
								<path d="M4.04873 2.86182C3.0795 2.86182 2.29102 3.6503 2.29102 4.61954C2.29102 5.58877 3.0795 6.37725 4.04873 6.37725C5.01797 6.37725 5.80645 5.58877 5.80645 4.61954C5.80645 3.65035 5.01797 2.86182 4.04873 2.86182ZM4.04873 4.97114C3.85486 4.97114 3.69717 4.81346 3.69717 4.61958C3.69717 4.42571 3.85486 4.26802 4.04873 4.26802C4.24261 4.26802 4.4003 4.42571 4.4003 4.61958C4.40025 4.81346 4.24261 4.97114 4.04873 4.97114Z" fill="#1D4179"/>
								<path d="M19.9062 14.403C18.9369 14.403 18.1484 15.1914 18.1484 16.1607C18.1484 17.1299 18.9369 17.9184 19.9062 17.9184C20.8754 17.9184 21.6639 17.1299 21.6639 16.1607C21.6639 15.1915 20.8754 14.403 19.9062 14.403ZM19.9062 16.5123C19.7123 16.5123 19.5546 16.3546 19.5546 16.1607C19.5546 15.9668 19.7123 15.8092 19.9062 15.8092C20.1 15.8092 20.2577 15.9668 20.2577 16.1607C20.2577 16.3546 20.1 16.5123 19.9062 16.5123Z" fill="#1D4179"/>
								<path d="M22.8135 13.2977C21.2349 11.7191 18.6664 11.7191 17.0878 13.2977C15.7793 14.606 15.5241 16.6317 16.467 18.2238L18.7171 22.023H5.08711C3.88387 22.023 2.90494 21.0441 2.90494 19.8409C2.90494 18.6376 3.88383 17.6587 5.08711 17.6587H11.6894C13.668 17.6587 15.2778 16.0489 15.2778 14.0703C15.2778 12.0916 13.668 10.4819 11.6894 10.4819H5.2829L7.53295 6.68266C8.47584 5.0906 8.22056 3.0649 6.91223 1.75657C6.14751 0.991897 5.1308 0.570679 4.04934 0.570679C2.96789 0.570679 1.95112 0.991851 1.1864 1.75657C-0.121971 3.06494 -0.377205 5.09069 0.565686 6.68271L3.64861 11.8881H11.6894C12.8926 11.8881 13.8716 12.867 13.8716 14.0703C13.8716 15.2735 12.8927 16.2525 11.6894 16.2525H5.08711C3.10851 16.2525 1.49873 17.8623 1.49873 19.8409C1.49873 21.8195 3.10847 23.4292 5.08711 23.4292H20.3515L23.4344 18.2238C24.3772 16.6317 24.1219 14.606 22.8135 13.2977ZM1.77562 5.96618C1.16025 4.92705 1.32679 3.6049 2.18081 2.75098C2.67994 2.2518 3.3435 1.97698 4.0493 1.97698C4.75509 1.97698 5.41875 2.25185 5.91787 2.75098C6.7718 3.6049 6.93839 4.92705 6.32306 5.96618L4.04934 9.80529L1.77562 5.96618ZM22.2244 17.5072L19.9507 21.3463L17.6769 17.5072C17.0616 16.4681 17.2281 15.1459 18.0821 14.292C18.5973 13.7768 19.274 13.5193 19.9507 13.5193C20.6274 13.5193 21.3041 13.7769 21.8192 14.292C22.6732 15.1459 22.8398 16.4681 22.2244 17.5072Z" fill="#1D4179"/>
								</g>
								<defs>
								<clipPath id="clip0_860_1925">
								<rect width="24" height="24" fill="white"/>
								</clipPath>
								</defs>
						</svg>

						<h4 className="ml-1 " style={{color:"#1D4179"}}>Outbound trip</h4>
					</div>
				 	{/* <svg width="448" height="60" viewBox="0 0 448 60" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.0001 60L375.982 60L411.547 45L447.113 30L375.982 0L357.506 0L16.0001 0C7.16354 0 9.15527e-05 7.16344 9.15527e-05 16V30V44C9.15527e-05 52.8366 7.16351 60 16.0001 60Z" fill="#DDE2EB"/>
					</svg> */}
						
				 </div>
				 <div className="w-[40%]  h-[100%] m-0  relative  flex justify-center flex-row align-middle " >
				 	<div className="h-[100%] triangle2 flex	 place-content-between">
						<h4 className="" style={{fontWeight:"500",fontSize:"20px",color:"#1D4179"}}>Round trip</h4>
					</div>
				 	{/* <svg width="542" height="62" viewBox="0 0 542 62" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.81958 61H456.524L539.85 31L456.524 1H1.29034L72.8472 31L0.81958 61Z" stroke="#DDE2EB"/>
					</svg> */}
				 </div>
				 <div className="w-[30%] bg-white h-[100%] m-0 relative flex flex-row align-middle">
				 <div className="absolute 	 triangle3 h-[100%] align-middle  text-center flex place-content-between">
						<h4 className="ml-3" style={{color:"#1D4179"}}>Summary</h4>
					</div>
					{/* <svg width="379" height="62" viewBox="0 0 379 62" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M362.461 61L1.09375 61L81.9252 31L1.09375 1L20.9552 1L362.461 1C371.298 1 378.461 8.16344 378.461 17V31V45C378.461 53.8366 371.298 61 362.461 61Z" stroke="#DDE2EB"/>
					</svg> */}

				 </div>
			</div> 
				
				{loading && page === 1 && (
					<div className="my-4 flex  w-full justify-center">
						<svg
							className="-ml-1 mr-3 h-20 w-20 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="3"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				)}

				{/* SECTION */}
				<div className="flex flex-row   w-[85vw] justify-between">
					<div className="lg:w-[30%] md:w-0 ">
						Filter
							<BusTimeCard height={true}/>
							<PriceCard height={true}/>
							<SeatCard height={true} />
							<OpratorCard  onBus={BusHandler}/>
							<DepartureCard title="Departure station"  travelTo={cityFrom} stationFrom={stationFrom} onStation={stationHandler} />
							<DepartureCard title="Arrival station" travelTo={city} stationFrom={stationTo} onStation={stationToHandler} />
							
					</div>
					<div className="lg:w-[70%] md:w-full ">{trips.length > 0 && (
					<SectionGridFilterCard
						trips={FinalTrips}
						city={city}
						isLoading={loading}
						className="pb-24 lg:pb-28"
						date={date}
						filterStation= {filterStation}
						filterToStation= {filterToStation}
						travelFrom={travelFrom}
						filterBus={filterBus}
						travelTo={travelTo}
						cityFrom={cityFrom}
						setPage={() => setPage(page + 1)}
						paginationStatus={paginationStatus}
					/>
				)}</div>
				</div>
				

				{/* SECTION */}
			</div>
		</div>
	);
};

export default ListingBusPage;
