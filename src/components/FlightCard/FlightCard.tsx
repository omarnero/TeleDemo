import React, { FC, } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import bus from "images/bluebus.jpeg";
import tv from "images/outline.png";
import conditioning from "images/air-conditioner 1.png";
import we_bus_logo from "images/Rectangle 124.png";
import blue_bus_logo from "images/image 4.png";
import miniBus from "images/bus1.png";

export interface FlightCardProps {
	className?: string;
	data: any;
	travelFrom?: string | null;
	cityTo?: any;
	date?: any;
	travel?: any;
	filterStation: string;
	filterBus:string
	filterToStation:string;
}

const FlightCard: FC<FlightCardProps> = ({
	className = "",
	data,
	travelFrom,
	cityTo,
	travel,
	date,
	filterStation,
	filterToStation,
	filterBus
}) => {
	
	// const [isOpen, setIsOpen] = useState(false);
	// const { t } = useTranslation();
	const navigate = useNavigate();
	// const renderDetailTop = (
	// 	tripDetails?: any,
	// 	price?: number | string,
	// 	stationFrom?: any,
	// ) => {
	// 	if (tripDetails?.city_id === cityTo?.id) {
	// 		return (
	// 			<div
	// 				className="mb-5 cursor-pointer px-1 py-1 hover:shadow-lg"
	// 				onClick={() => {
	// 					navigate(
	// 						`/checkout/?${date}/${stationFrom?.id}/${tripDetails?.id}/${data?.id}/${price}/${travel}/${cityTo?.id}/${data?.gateway_id}/${data?.bus?.category}`,
	// 					);
	// 				}}
	// 			>
	// 				<div className="flex flex-col md:flex-row ">
	// 					<div className="w-24 flex-shrink-0 md:w-20 md:pt-7 lg:w-24">
	// 						{/* <img
    //           src={"https://www.gstatic.com/flights/airline_logos/x/KE.png"}
    //           className="w-10"
    //           alt=""
    //         /> */}
	// 					</div>
	// 					<div className="my-5 flex w-1/2 md:my-0">
	// 						<div className="flex flex-shrink-0 flex-col items-center py-2">
	// 							<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
	// 							<span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
	// 							<span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
	// 						</div>
	// 						<div className="ml-4 space-y-10 text-sm">
	// 							<div className="flex flex-col space-y-1">
	// 								<span className=" text-neutral-500 dark:text-neutral-400">
	// 									{/* Monday, August 12 · 10:00 */}
	// 								</span>
	// 								<span className=" font-semibold">{stationFrom?.name}</span>
	// 							</div>
	// 							<div className="flex flex-col space-y-1">
	// 								<span className=" text-neutral-500 dark:text-neutral-400">
	// 									{/* Monday, August 16 · 10:00 */}
	// 								</span>
	// 								<span className=" font-semibold">{tripDetails?.name}</span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
	// 					<ul className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400 md:space-y-2">
	// 						<li>
	// 							{t("takeOffTime", { time: `${stationFrom?.arrival_at}` })}{" "}
	// 						</li>
	// 						<li>
	// 							{t("arrivalTime", { time: `${tripDetails?.arrival_at}` })}{" "}
	// 						</li>

	// 						<li>{t("tripCost", { price: price })}</li>
	// 						<li>
	// 							{!!data?.bus ? (
	// 								<>
	// 									{data?.bus.type?.charAt(0).toUpperCase() +
	// 										data?.bus.type?.slice(1)}{" "}
	// 									· {data?.gateway_id} · {data?.bus?.code}
	// 								</>
	// 							) : (
	// 								<>{data?.gateway_id}</>
	// 							)}
	// 						</li>
	// 					</ul>
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// 	return <></>;
	// };
	
	// console.log(data,9595959595)
	function getDuration(startTime: string, endTime: string): string {
		const start = new Date(`1970-01-01T${startTime}Z`);
		const end = new Date(`1970-01-01T${endTime}Z`);
		const duration = end.getTime() - start.getTime();
	  
		const hours = Math.floor(duration / (1000 * 60 * 60));
		const minutes = Math.floor((duration / (1000 * 60)) % 60);
	  
		return `${hours}h ${minutes}m`;
	  }
	  interface City {
		id: number;
		name: string;
	  }
	  function cityName(cities: City[], id: number): string | undefined {
		const city = cities.find((city) => city.id === id);
		return city? city.name : undefined;
	  }

	
	  let newTravelDate: {  travel_from: string, travel_to: string, gateway_id: string, arrival_at: string,trip_url: string,travel_at:string,city_from_name : any,city_from:string,city_to:string,city_to_name:any, duration:any,prices_start_with:string,available_seats:string }[] = [];
	
	  data.stations_from.flatMap((itemFrom:any) =>
		  data.stations_to.map((itemTo:any) =>{
			  newTravelDate.push(
				  {travel_from: itemFrom.name,
					  trip_url:`/checkout/?${data.date}/${itemFrom.id}/${itemTo.id}/${data.id}/${data.price_start_with}/${itemFrom.id}/${itemTo.id}/${data.company}/${data.bus.category}`,
						  // trip_url: `/checkout/?${date}/${stationFrom?.id}/${tripDetails?.id}/${data?.id}/${price}/${travel}/${cityTo?.id}/${data?.gateway_id}/${data?.bus?.category}`,
					  travel_at:itemFrom.arrival_at,
					  city_from_name:cityName(data.cities_from,itemFrom.city_id) ,
					  city_from:itemFrom.city_id,
					  city_to:itemTo.city_id,
					  city_to_name:cityName(data.cities_to,itemTo.city_id),
					  travel_to: itemTo.name,arrival_at:itemTo.arrival_at,
					  gateway_id:data.gateway_id,
					  duration : getDuration(itemFrom.arrival_at,itemTo.arrival_at )  ,
					  prices_start_with:data.prices_start_with.original_price, //their is more than tis opj like offer and after offer price
					  available_seats:data.available_seats}
			  )
		  } ))

	let travelData: { travel_from: string, travel_to: string,gateway_id:string,arrival_at:string , prices_start_with:any , prices_From_Station_To: any }[] = data.stations_from.flatMap((itemFrom:any) =>
		data.stations_to.map((itemTo:any) => (
				
			{ travel_from: itemFrom.name,
			trip_url:`/checkout/?${data.date}/${itemFrom.id}/${itemTo.id}/${data.id}/${data.price_start_with}/${itemFrom.id}/${itemTo.id}/${data.company}/${data.bus.category}`,
				// trip_url: `/checkout/?${date}/${stationFrom?.id}/${tripDetails?.id}/${data?.id}/${price}/${travel}/${cityTo?.id}/${data?.gateway_id}/${data?.bus?.category}`,
			travel_at:itemFrom.arrival_at,
			city_from_name:cityName(data.cities_from,itemFrom.city_id) ,
			city_from:itemFrom.city_id,
			city_to:itemTo.city_id,
			city_to_name:cityName(data.cities_to,itemTo.city_id),
			travel_to: itemTo.name,arrival_at:itemTo.arrival_at,
			gateway_id:data.gateway_id,
			duration : getDuration(itemFrom.arrival_at,itemTo.arrival_at )  ,
			prices_start_with:data.prices_start_with.original_price, //their is more than tis opj like offer and after offer price
			prices_From_Station_To: data.prices_start_with.original_price, //their is more than tis opj like offer and after offer price
			available_seats:data.available_seats  }))
	  );
	
			
	if(filterStation.length !== 0){

		travelData = travelData.filter((data)=> data.travel_from === filterStation);
	}
	if(filterToStation.length !==0){
		travelData = travelData.filter((data)=>data.travel_to === filterToStation )
	}
	if(filterBus.length !==0){
		travelData = travelData.filter((data)=> data.gateway_id === filterBus)
	}
		let pricess = [];
		

			pricess = newTravelDate.map((trip)=> trip.prices_start_with)
	

	  const busCardContainer = (data:any) => {
	
		return data?.map((item:any) => (
		  <div key={item.id} className="flex flex-col bg-white m-0 w-[98%] h-[80%] 
			lg:h-100
			md:h-100
			sm:h-[100%]
			max-sm:h-[100%]
		  " style={{ borderRadius:"16px",padding:"0px 16px 16px",
		//   boxShadow:"0 4px 4px 0 rgba(0, 0, 0, 0.25)"
		  }}>
			<div className="W-100 h-[70px] pt-4 flex flex-row justify-between  " style={{borderBottom: "1px solid var(--boareder, #E8ECF2)",alignItems: "center"}}>
				<div>
					<div className="w-24 flex-shrink-0 lg:w-36">
					{!item?.gateway_id.includes("WEBUS") && (
							<img src={blue_bus_logo} className="w-24 flex-shrink-0 lg:w-[70px] h-[70px]" alt="" />
						)}
					{item?.gateway_id.includes("WEBUS") && (
							<img src={we_bus_logo} className=" " alt="" />
						)}
					</div>
				</div>
			<div>
				<div>
					<div className="w-fit flex-shrink-0 lg:w-fit flex flex-row ml-0 justify-between">
						<div className="mr-2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 6V12H16.5M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="#69696A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							</div>
						<div>{item.duration}</div>
					</div>
				</div>
			</div>
			</div>
				{/* seconed container for body  it is from 2 containers*/}
				
				
				<div className="w-100 flex flex-row justify-between h-[148px] align-middle p-[16px] 
				lg:flex-row lg:h-[148px]
				md:flex-row md:h-[148px]
				sm:flex-col sm:h-[200px]
				max-sm:flex-col max-sm:h-[270px]
				" style={{borderBottom:"1px solid #E8ECF2"}}>
					{/* first contain left */}
					<div className="flex  flex-row space-y-6 sm:flex-row sm:items-center sm:space-y-0" >
						<div className="flex flex-col justify-center ">
						<svg width="6" height="116" viewBox="0 0 6 116" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3 0.333272C1.52724 0.333272 0.333333 1.52718 0.333333 2.99994C0.333333 4.4727 1.52724 5.66661 3 5.66661C4.47276 5.66661 5.66667 4.4727 5.66667 2.99994C5.66667 1.52718 4.47276 0.333272 3 0.333272ZM3 110.333C1.52724 110.333 0.333329 111.527 0.333328 113C0.333328 114.473 1.52724 115.667 3 115.667C4.47275 115.667 5.66666 114.473 5.66666 113C5.66666 111.527 4.47275 110.333 3 110.333ZM2.5 2.99994L2.5 113L3.5 113L3.5 2.99994L2.5 2.99994Z" fill="#69696A"/>
						</svg>

						</div>
						
						<div className="ml-[17.2px]  w-[428px] my-[16px]">
							<div className="mb-[15px]">
								<h4 className=" text-[16px] font-[600]  mb-[8px]" style={{color:"#1E1E1E",lineHeight:"150.7%"}}>{item.city_from_name} ({item.travel_from})</h4>
								<h4 className=" text-[16px] font-[400]" style={{color:"#69696A",lineHeight:"100.7%"}}>{item.travel_at}</h4>
							</div>
							<div>
								<h4 className=" text-[16px] font-[600] mb-[8px]" style={{color:"#1E1E1E",lineHeight:"150.7%"}}>{item.city_to_name}  ({item.travel_to})</h4>
								<h4 className=" text-[16px] font-[400]" style={{color:"#69696A",lineHeight:"100.7%"}}>{item.arrival_at}</h4>
							</div>
						</div>
							
					</div>
					{/* seconde contain left */}

					<div className="flex  flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0">
							{/* LOGO IMG */}
							
							<div className="w-24 flex-shrink-0 lg:w-36">
								
								{item?.gateway_id.includes("WEBUS") && (
									<img src={miniBus} className="w-28" alt="" />
								)}
								{!item?.gateway_id.includes("WEBUS") && (
									<img src={bus} className="w-24 mt-2" alt="" />
								)}
							</div>
					</div>
				</div>
				{/* third container */}
			<div className="w-100 m-[16px] h-[54px] flex flex-row justify-between
			lg:flex-row lg:h-[54px]
			md:flex-row md:h-[54px]
			sm:flex-col sm:h-[100px]
			max-sm:flex-col max-sm:h-[120px] 
			">
				<div className="">
				{!item?.gateway_id.includes("WEBUS") && (
									<div className="flex flex-row 
									
									
									">
									<img src={tv} className="mr-1 w-[40px] h-[40px]" alt="" />
									<img src={conditioning} className=" w-[40px] h-[40px]" alt="" />
									<div className="h-[40px] w-[120px] align-middle justify-center p-[8px] ml-4 bg-[#E8ECF2] text-[16px] text-[#69696A]"  style={{borderRadius:"24px",textAlign:"center"}}>Deluxe Plus </div>
									<div className="h-[40px] w-[120px] align-middle justify-center p-[8px]   text-[16px] text-[#69696A]"  style={{borderRadius:"24px",textAlign:"center"}}>{item.available_seats} seats free </div>
									</div>
								)}
				{item?.gateway_id.includes("WEBUS") && (
									<div className="flex flex-row
									sm:justify-between
									max-sm:justify-between
									">
										{/* <img src={tv} className="" alt="" /> */}
									<img  src={conditioning} className=" w-[40px] h-[40px]" alt="" />
									<div className="h-[40px] w-[120px] align-middle justify-center p-[8px] ml-4 bg-[#E8ECF2] text-[16px] text-[#69696A]
									sm:text-[12px]
									max-sm:text-[12px]
									"  style={{borderRadius:"24px",textAlign:"center"}}>Deluxe Plus </div>
									<div className="h-[40px] w-[120px] align-middle justify-center p-[8px]  text-[16px] text-[#69696A]
									sm:text-[12px]
									max-sm:text-[12px]
									"  style={{borderRadius:"24px",textAlign:"center"}}>{item.available_seats} seats free </div>
									</div>
								)}

				</div>
				<div className="flex flex-row justify-between">
					
					<div className="flex flex-col justify-between">
						<h4 className="text-[20px] font-[700] text-[#1E1E1E]">LE{item.prices_start_with}</h4>
						<h4 className="text-[12px]">price per person</h4>
					</div>
					<div className="h-full justify-center align-middle "><button className="bg-[#1D4179] text-white h-full w-[110px] text-[20px] ml-[16px]" style={{borderRadius:"9px"}}
					onClick={() => {
						navigate(item.trip_url);
					}}
					>select</button></div>
				</div>
			</div>
			</div>
		));
	  };
	 
	return (
		<>
		
			{busCardContainer(travelData)}
			
		</>
	);
};

export default FlightCard;
