import { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import { FocusedInputShape } from "react-dates";
import { FC } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SingleDate from "components/HeroSearchForm/SingleDate";
import RentalCarDatesRangeInput from "components/HeroSearchForm/RentalCarDatesRangeInput";

export interface DateRage {
	startDate: moment.Moment | null;
	endDate: moment.Moment | null;
}

export interface TimeRage {
	startTime: string;
	endTime: string;
}

export interface FlightSearchFormProps {
	haveDefaultValue?: boolean;
}

const BusSearchForm: FC<FlightSearchFormProps> = ({ haveDefaultValue }) => {
	// DEFAULT DATA FOR ARCHIVE PAGE
	const defaultPickUpInputValue = "";
	const defaultDropOffInputValue = "";
	const { t, i18n } = useTranslation();

	const navigate = useNavigate();

	// USE STATE

	const [dateValue, setdateValue] = useState<moment.Moment | null>(null);
	const [dateFocused, setDateFocused] = useState<boolean>(false);

	const [pickUpInputValue, setPickUpInputValue] = useState("");
	const [dropOffInputValue, setDropOffInputValue] = useState("");
	const [fieldFocused, setFieldFocused] = useState<
		FocusedInputShape | "dropOffInput" | null
	>(null);
	const [travelFrom, setTravelFrom] = useState<any>("");
	const [travelTo, setTravelTo] = useState<any>("");
	const { search } = useLocation();
	const [dropOffLocationType, setDropOffLocationType] = useState<
		"roundTrip" | "oneWay" | ""
	>("roundTrip");
	const [guests, setGuests] = useState(1);
	const [date, setDate] = useState<string>("");
	const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
		startDate: null,
		endDate: null,
	});

	
	// USER EFFECT
	useEffect(() => {
		if (haveDefaultValue) {
			setdateValue(moment());
			setPickUpInputValue(defaultPickUpInputValue);
			setDropOffInputValue(defaultDropOffInputValue);
		}
	}, []);
	//

	useEffect(() => {
		if (!!search && !search?.includes("flights")) {
			const data = search.slice(1).split("/");
			setDate(data?.[0]);

			if (data?.[0] != "undefined") {
				setdateValue(moment(data?.[0] ?? ""));
			}
			if (data?.[3] != "undefined") {
				setTravelTo({
					id: data?.[1],
					name_en: decodeURIComponent(data?.[3]),
					name_ar: decodeURIComponent(data?.[3]),
				});

				setDropOffInputValue(decodeURIComponent(data?.[3]));
			}

			if (data?.[4] != "undefined") {
				setTravelFrom({
					id: data?.[2],
					name_en: decodeURIComponent(data?.[4]),
					name_ar: decodeURIComponent(data?.[4]),
				});
				setPickUpInputValue(decodeURIComponent(data?.[4]));
			}
		}
	}, [search]);

	const renderRadioBtn = () => {
		return (
			<div className=" [ nc-hero-field-padding ] flex flex-row  flex-wrap gap-3 py-5 ">
				<label
					onClick={e => setDropOffLocationType("oneWay")}
					className="flex cursor-pointer select-none items-center text-[#B9C4D5]"
				>
					<div className="relative">
						<input type="checkbox" className="sr-only" />
						<div className="box mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#1D4179]">
							<span
								className={`h-[10px] w-[10px] rounded-full
               ${
									dropOffLocationType === "oneWay"
										? "bg-[#1D4179] "
										: "bg-transparent"
								}
              `}
							>
								{" "}
							</span>
						</div>
					</div>
					{t("oneWay")}
				</label>
				<label
					htmlFor="checkboxLabelFour"
					className="flex cursor-pointer select-none items-center text-[#B9C4D5]"
					onClick={e => {
						setDropOffLocationType("roundTrip");
					}}
				>
					<div className="relative">
						<input type="checkbox" id="checkboxLabelFour" className="sr-only" />
						<div className="box mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#1D4179]">
							<span
								className={`h-[10px] w-[10px] rounded-full
               ${
									dropOffLocationType === "roundTrip"
										? "bg-[#1D4179] "
										: "bg-transparent"
								}
              `}
							>
								{" "}
							</span>
						</div>
					</div>
					{t("RoundTrip")}
				</label>
			</div>
		);
	};
	const renderForm = () => {
		return (
			<div
			className={`relative w-full  select-none	cursor-pointer  md:h-fit `}>
				<span className="flex sm:hidden">{renderRadioBtn()}</span>
				<form className="relative mt-2  w-full p-2 dark:bg-neutral-800 sm:mt-8  sm:bg-white sm:p-8 xl:rounded-xl   sm:flex-col-reverse  max-sm:flex-col-reverse  ">
					<div className="flex h-[56px]  lg:w-full md:w-full sm:w-full  max-sm:flex-col gap-1 md:flex-row sm:justify-around ">
						<div className="relative flex lg:flex-row w-[40vw] max-sm:flex-col gap-y-2   sm:gap-1  max-sm:w-full ">
							<LocationInput
								key={1}
								defaultValue={pickUpInputValue}
								onChange={e => {
								
									setPickUpInputValue(e);
								}}
								onInputDone={(value: any) => {
									setTravelFrom(value);
									setFieldFocused("dropOffInput");
									setPickUpInputValue(
										i18next.language === "en" ? value?.name_en : value?.name_ar,
									);
								}}
								placeHolder={t("pickingFrom")!}
								noPlaceHolder={true}
								desc={t("travelFrom")!}
								typeIcon="from"
								type={"Bus"}
							/>
							<div
								className="absolute  right-0 top-7 z-30 mx-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center  rounded-full border-[1px] border-[#E8ECF2] bg-[#FFFFFF]  sm:relative sm:top-0 sm:w-[60px] sm:rounded-[4px]
									sm:bg-transparent sm:p-0  sm:py-[25px]
									"
								onClick={() => {
							
									setTravelFrom(travelTo);
									setPickUpInputValue(dropOffInputValue);
									setDropOffInputValue(pickUpInputValue);
									setTravelTo(travelFrom);
								}}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M7.5 21L3 16.5M3 16.5L7.5 12M3 16.5H16.5M16.5 3L21 7.5M21 7.5L16.5 12M21 7.5H7.5"
										stroke="#B9C4D5"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<LocationInput
								key={2}
								noPlaceHolder={true}
								defaultValue={dropOffInputValue}
								onChange={e => {
									setDropOffInputValue(e);
								}}
								onInputDone={value => {
									setTravelTo(value);
									setFieldFocused("dropOffInput");
									setDropOffInputValue(
										i18next.language === "en" ? value?.name_en : value?.name_ar,
									);
								}}
								placeHolder={t("pickingTo")!}
								desc={t("travelTo")!}
								typeIcon="from"
								type={"Bus"}
							/>
						</div>
						{dropOffLocationType === "roundTrip" ? (
							<RentalCarDatesRangeInput
								type="bus"
								guests={guests}
								onChangeGuests={(value: any) => setGuests(value)}
								defaultDateValue={dateRangeValue}
								onChange={data => {
									setDateRangeValue(data.stateDate);
								}}
								defaultFocus={
									fieldFocused === "dropOffInput" ? null : fieldFocused
								}
								onFocusChange={(focus: any) => {
									setDateFocused(focus);
								}}
								className=" w-auto"
								buttonSubmitHref={() =>
									navigate(
										`/listing-bus?${dateValue?.format("YYYY-MM-DD")}/${
											travelTo?.id
										}/${travelFrom?.id}/${
											i18next.language === "en"
												? travelTo?.name_en
												: travelTo?.name_ar
										}/${
											i18next.language === "en"
												? travelFrom?.name_en
												: travelFrom?.name_ar
										}`,
									)
								}
							/>
						) : (
							<SingleDate
								type="bus"
								guests={guests}
								onChangeGuests={(value: any) => setGuests(value)}
								defaultValue={dateValue}
								onChange={date => setdateValue(date)}
								defaultFocus={dateFocused}
								onFocusChange={(focus: boolean) => {
									setDateFocused(focus);
								}}
								className="w-auto"
								buttonSubmitHref={() =>
									navigate(
										`/listing-bus?${dateValue?.format("YYYY-MM-DD")}/${
											travelTo?.id
										}/${travelFrom?.id}/${
											i18next.language === "en"
												? travelTo?.name_en
												: travelTo?.name_ar
										}/${
											i18next.language === "en"
												? travelFrom?.name_en
												: travelFrom?.name_ar
										}`,
									)
								}
							/>
						)}
					</div>
					<span className="hidden sm:flex">{renderRadioBtn()}</span>
				</form>
			</div>
		);
	};

	return renderForm();
};

export default BusSearchForm;
