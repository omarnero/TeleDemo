import React, { FC } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import FlightCard from "components/FlightCard/FlightCard";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import { useState } from 'react';

// Define a function component called Dropdown that renders a dropdown menu
function Dropdown() {
	const [isOpen, setIsOpen] = useState(false);
  
	const toggleDropdown = () => {
	  setIsOpen(!isOpen);
	};
  
	return (
	  <div className="w-[220px]">
		<button
		  id="dropdownDividerButton"
		  data-dropdown-toggle="dropdownDivider"
		  className="text-black w-full  content-end font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
		  style={{border:"1px solid black",borderRadius:"8px",alignItems:"center"}}
		  type="button"
		  onClick={toggleDropdown}
		>
		  story by 
		  <svg className="w-2.5 h-2.5 ml-2.5 ml-28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
		  </svg>
		</button>
		
		
  
		{isOpen && (
		  <div id="dropdownDivider" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700 dark:divide-gray-600">
			<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
			  <li>
				<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cheapest</a>
			  </li>
			  <li>
				<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Fastest</a>
			  </li>
			  <li>
				<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Departure (Earliest)</a>
			  </li>
			</ul>
			<div className="py-2">
			  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Departure (Latest)</a>
			</div>
		  </div>
		)}
	  </div>
	);
  }
// Define a props interface for the SectionGridFilterCard component
export interface SectionGridFilterCardProps {
  className?: string;
  city?: string;
  trips: any;
  isLoading: boolean;
  date?: any;
  travelFrom?: any;
  setPage?: any;
  cityFrom?: any;
  travelTo?: any;
  paginationStatus: boolean;
  filterStation:string;
  filterToStation:string;
  filterBus:string;
}

// Define a function component called SectionGridFilterCard that takes in the SectionGridFilterCardProps interface as props
const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  city,
  trips,
  isLoading,
  travelFrom,
  date,
  setPage,
  cityFrom,
  travelTo,
  paginationStatus,
  filterStation,
  filterToStation,
  filterBus
}) => {
  // Use the useTranslation hook to get the translation function
  const { t } = useTranslation();
  // If the city exists and is not "undefined", use it as the newCity value, otherwise use an empty string
  const newCity = city && city!== "undefined"? city : "";
  const tripsCount = trips.reduce((acc:any, trip:any) => {
  const stationsFromLength = trip.stations_from.length;
  const stationsToLength = trip.stations_to.length;
  return acc + stationsFromLength * stationsToLength;
}, 0);
   
  return (
    <div
      className={`nc-SectionGridFilterCard ${className} `}
      data-nc-id="SectionGridFilterCard"
    >
      {/* The heading */}
      {/* <Heading2
        heading={
          t("egypt") + " - " + (decodeURIComponent(newCity ?? "") ?? "" ?? "")
        }
        subHeading={<></>}
      /> */}
      {/* The tab filters */}
      {/* <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div> */}
      {/* The flight cards */}
      <div className="grid grid-cols-1 gap-6 rounded-3xl   lg:dark:bg-black/20">
        {/* The results count and "All tickets" label */}
        <div className="flex flex-row  w-full justify-between mt-6">
          <div className="flex flex-row">
            <div>{tripsCount} Results</div>
            <div className="w-[100px] ml-2 pl-2 text-[16px] h-[25px] " style={{borderLeft:"1px solid #1D4179", color:"#1D4179",}}>All tickets</div>
          </div>
          {/* The dropdown */}
          <div className="mr-4">
            {Dropdown()}
          </div>
        </div>
        {/* The flight cards themselves */}
        {trips?.length > 0 &&
          trips.map((item: any, index: number) => {
	
        return item?.cities_to.map((trip: any) => {

              if (trip?.id === +travelTo) {
                return (
                    <FlightCard
                      travelFrom={decodeURIComponent(cityFrom ?? "")}
                      travel={travelFrom}
                      key={index}
                      data={item}
                      cityTo={trip}
                      date={date}
                      filterStation={filterStation}
                      filterToStation={filterToStation}
                      filterBus={filterBus}
                    />
                );
              } else {
                return <></>;
              }
            });
          })}
        {/* The "Show More" button */}
        {paginationStatus && (
          <div className="mt-12 flex items-center justify-center">
            <ButtonPrimary onClick={setPage} loading={isLoading}>
              {t("showMore")}
            </ButtonPrimary>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;