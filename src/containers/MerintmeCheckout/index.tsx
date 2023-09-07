/* eslint-disable jsx-a11y/iframe-has-title */
import { Listbox, Dialog, Transition } from "@headlessui/react";
import {
	CheckIcon,
	ChevronUpDownIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import React, {
	FC,
	Fragment,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, createTrip, createTripMaritime, getSeats } from "api";
import { useQuery } from "react-query";
import { showApiErrorMessages } from "utils";
import { toast } from "react-toastify";
import PaymentDetailsModal from "shared/payment";
import { Bus } from "shared/bus";
import { ClassicBus } from "shared/classicBus";
import { ComfortBus } from "shared/ComfortBus";

export interface CheckOutPageProps {
	className?: string;
}

const MaritimeCheckout: FC<CheckOutPageProps> = ({ className = "" }) => {
	const { search } = useLocation();
	const [date, setDate] = useState<string>("");
	const [travelTo, setTravelTo] = useState<string>("");
	const [travelFrom, setTravelFrom] = useState<string>("");
	const [cityTo, setCityTo] = useState<string>("");
	const [cityFrom, setCityFrom] = useState<string>("");
	const { t } = useTranslation();
	const [seats, setSeats] = useState([]);
	const [id, setId] = useState("");
	const [price, setPrice] = useState<string | number>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<number | string>("");
	const [iframe, setIframe] = useState<null | string>(null);
	let [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState<string | null>("");
	const [selectedSeatsList, setSelectedSeatsList] = useState<any>({});
	const [adultSeats, setAdultSeats] = useState<any>(0);
	const [childSeats, setChildSeats] = useState<any>(0);
	const location = useLocation();
	const navigate = useNavigate();
	const [formVal, setFormVal] = useState([
		{
			middle_name: "",
			last_name: "",
			first_name: "",
			passport_number: "",
			nationality_id: 3,
			dob: "",
			passport_created_date: "",
		},
	]);
	const addRow = () => {
		setFormVal([
			...formVal,
			{
				middle_name: "",
				last_name: "",
				first_name: "",
				passport_number: "",
				nationality_id: 3,
				dob: "",
				passport_created_date: "",
			},
		]);
	};
	const onRemove = (i: number) => {
		const newForm = [...formVal];
		newForm.splice(i, 1);
		setFormVal(newForm);
	};
	const onHandle = (e: any, i: number) => {
		let newForm: any = [...formVal];
		newForm[i][e.target.name] = e.target.value;
		setFormVal(newForm);
	};
	useEffect(() => {
		if (!!search) {
			const data = search.slice(1).split("/");
			setDate(data?.[0]);
			setTravelFrom(data?.[2]);
			setTravelTo(data?.[3]);
			setId(data?.[1]);
			setCityFrom(data?.[5]);
			setCityTo(data?.[6]);
			sessionStorage.setItem(
				"path",
				location?.pathname +
					`?${data?.[0]}/${data?.[1]}/${data?.[2]}/${data?.[3]}/${data?.[4]}/${data?.[5]}/${data?.[6]}`,
			);
		}
	}, [search]);

	const formValidation = (formVal: any) => {
		const data = [...formVal];
		let valid = true;
		for (let index = 0; index < data.length; index++) {
			if (data[index].first_name == "") {
				valid = false;
			} else if (data[index].middle_name == "") {
				valid = false;
			} else if (data[index].last_name == "") {
				valid = false;
			} else if (data[index].nationality_id == "") {
				valid = false;
			} else if (data[index].dob == "") {
				valid = false;
			} else if (data[index].passport_number == "") {
				valid = false;
			}
		}
		setFormVal(data);
		return valid;
	};
	const createTicket = async () => {
		setLoading(true);

		if (formValidation(formVal)) {
			await createTripMaritime(
				{
					date,
					to_location_id: +travelTo,
					from_location_id: +travelFrom,
					passenger_details: formVal,
					adult_seats_numbers: +adultSeats,
					child_seats_numbers: +childSeats,
				},
				id,
			)
				.then(res => {
					if (res?.data?.data?.gateway_order_id) {
						setOrderId(res?.data?.data?.gateway_order_id);
						setPrice(res?.data?.data?.total);
						toast.success(res?.data?.message);
					}
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
					if (err.response.status === 401) {
						navigate("/login");
					}
				});
		} else {
			toast.error(t("addValidInformation"));
			setLoading(false);
		}
	};
	const createPayments = async () => {
		if (!!orderId) {
			await createPayment(orderId)
				.then(res => {
					if (res?.data?.data?.url) {
						setIframe(res?.data?.data?.url);
						setIsOpen(true);
					}
					setLoading(false);
				})
				.catch(err => {
					setLoading(false);
					if (Object.keys(err?.response?.data?.errors)?.length) {
						setLoading(false);
						showApiErrorMessages(err.response.data.errors);
					} else {
						setLoading(false);
						toast.error(err?.response?.data?.message);
					}
				});
		} else {
			toast.error(t("notFound"));
			setLoading(false);
		}
	};

	const renderMain = () => {
		return (
			<div className="flex w-full flex-col space-y-8 border-neutral-200 px-0 dark:border-neutral-700 sm:rounded-2xl sm:border sm:p-6 xl:p-8">
				
				<h2 className="text-[24px] font-semibold first-letter:uppercase ">
					{/* {t("confirmPayment")} */}
					passenger details
				</h2>
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<div>
						<h3 className="text-2xl font-semibold">{t("tripDate")}</h3>
						<NcModal
							renderTrigger={openModal => <></>}
							renderContent={() => <></>}
							modalTitle=""
						/>
					</div>
					{/* <div className="mt-6 flex flex-col divide-y divide-neutral-200 rounded border border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700 sm:flex-row sm:divide-x sm:divide-y-0">
						<ModalSelectDate
							defaultValue={date}
							onSelectDate={() => {}}
							renderChildren={({ openModal }) => (
								<button
									onClick={openModal}
									className="flex flex-1 justify-between space-x-5 p-5 text-left "
									type="button"
									disabled
								>
									<div className="flex flex-col">
										<span className="text-sm text-neutral-400">
											{t("tripDate")}
										</span>
										<span className="mt-1.5 text-lg font-semibold">{date}</span>
									</div>
									<PencilSquareIcon className="h-6 w-6 text-neutral-6000 dark:text-neutral-400" />
								</button>
							)}
						/>
					</div> */}
					<div className="mt-2 flex items-center justify-center">
						<div className="container mx-auto max-w-screen-lg">
							<div>
								<div className=" mb-6 py-8">
									<div className=" text-lg ">
										<div className="w-full">
											<div className="mb-4 grid grid-cols-1 gap-4 gap-y-2 md:grid-cols-5">
												<div className=" md:col-span-3">
													<label htmlFor="guests text-[#69696A] text-[16px]">{t("adultPassenger")} </label>
													<input
														type="number"
														name="guests"
														id="guests"
														className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
														defaultValue={adultSeats}
														onChange={e => setAdultSeats(e.target.value)}
														required
														min={0}
														placeholder={t("adultPassenger")!}
													/>
												</div>

												<div className="md:col-span-2 ">
													<label htmlFor="child text-[#69696A] text-[16px]">{t("childPassenger")}</label>
													<input
														type="number"
														name="child"
														id="child"
														className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
														defaultValue={childSeats}
														onChange={e => setChildSeats(e.target.value)}
														required
														min={0}
														placeholder={t("childPassenger")!}
													/>
												</div>
											</div>
											{formVal.map((item, index) => (
												<>
													<div className="mb-4 grid grid-cols-1 gap-4 gap-y-2 border-b border-gray-200 pb-5 md:grid-cols-5">
														<div className="md:col-span-12">
															<label htmlFor="first_name">
																{/* {t("firstName")}  */}
																Full name
															</label>
															<div className="mt-1  flex h-10 items-center rounded border border-gray-200">
																<input
																	name="first_name"
																	id="first_name"
																	placeholder={t("firstName")!}
																	className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
																	defaultValue={item.first_name || ""}
																	onChange={e => onHandle(e, index)}
																	required
																/>
															</div>
														</div>

														{/* <div className="md:col-span-1">
															<label htmlFor="middle_name">
																{t("middleName")}
															</label>
															<div className="mt-1 flex h-10 items-center rounded border border-gray-200">
																<input
																	name="middle_name"
																	id="middle_name"
																	placeholder={t("middleName")!}
																	className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
																	defaultValue={item.middle_name || ""}
																	onChange={e => onHandle(e, index)}
																	required
																/>
															</div>
														</div> */}

														{/* <div className="md:col-span-2">
															<label htmlFor="last_name">{t("lastName")}</label>
															<div className="mt-1 flex h-10 items-center rounded border border-gray-200">
																<input
																	name="last_name"
																	id="last_name"
																	placeholder={t("lastName")!}
																	className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
																	defaultValue={item.last_name || ""}
																	onChange={e => onHandle(e, index)}
																	required
																/>
															</div>
														</div> */}
														{/* <div className="md:col-span-3">
                            <label htmlFor="nationality_id">
                              {t("nationalId")}
                            </label>
                            <input
                              type="text"
                              name="nationality_id"
                              id="nationality_id"
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              placeholder={t("nationalId")!}
                              required
                              defaultValue={item.nationality_id || ""}
                              onChange={(e) => onHandle(e, index)}
                            />
                          </div> */}

														<div className="md:col-span-6">
															<label htmlFor="passport_number">
																{t("passportNumber")}
															</label>
															<input
																type="text"
																name="passport_number"
																id="passport_number"
																className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
																defaultValue={item.passport_number || ""}
																onChange={e => onHandle(e, index)}
																placeholder={t("passportNumber")!}
																required
															/>
														</div>

														<div className="md:col-span-5">
															<label htmlFor="passport_created_date">
																{t("createdat")}
															</label>
															<input
																type="date"
																name="passport_created_date"
																id="passport_created_date"
																className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
																defaultValue={item.passport_created_date || ""}
																onChange={e => onHandle(e, index)}
																required
																placeholder={t("createdat")!}
															/>
														</div>

														{/* <div className="md:col-span-2">
															<label htmlFor="dob"> {t("birthDate")}</label>
															<input
																type="date"
																name="dob"
																id="dob"
																className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
																defaultValue={item.dob || ""}
																onChange={e => onHandle(e, index)}
																placeholder={t("createdat")!}
																required
															/>
														</div> */}
													</div>
													{!!index && (
														<div
															onClick={() => onRemove(index)}
															className="col-span-5 mb-2  mt-1 flex w-full cursor-pointer justify-end font-semibold text-red-500"
														>
															{t("removeOne")}
														</div>
													)}
												</>
											))}
											<div
												onClick={addRow}
												className="col-span-5 mb-2 mt-1 w-full cursor-pointer font-semibold text-indigo-700"
											>
												{t("addOne")}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					{!!price && (
						<div className="my-3  w-full">
							<p className="text-lg text-green-500">
								{t("totalPrice", { total: price })}
							</p>
						</div>
					)}
					<div className="mt-6">
						<div className="pt-8">
							{!orderId && (
								<ButtonPrimary loading={loading} onClick={() => createTicket()}>
									{t("confirmTicket")}
								</ButtonPrimary>
							)}
							{!!orderId && (
								<ButtonPrimary
									loading={loading}
									onClick={() => createPayments()}
								>
									{t("confirmPay")}
								</ButtonPrimary>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};
	// if (!!iframe) return <></>;
	return (
		<div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
			<div className="flex w-full flex-col h-[15vh] bg-[#1d4179] ">
				{/* top nav */}
				<div className="w-[80vw] flex relative flex-row justify-between mx-auto  h-[50px] text-white ">
					
					<button className="flex justify-between items-center w-[3vw]">
						<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.75 16.1538L1.25 8.65381L8.75 1.15381" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						back</button>
					<button>Edit</button>
				</div>
				{/* center data */}
				<div className="flex flex-col items-center justify-center text-white">
					<span className="w-[20vh] absolute z-0 h-[20vh]   bg-[#1d4179] rotate-45 rounded"></span>
					<h3 className="z-10">
						{travelFrom} - {travelTo}
					</h3>
					<h3 className="z-10">
						{date} . Economy class
					</h3>
				</div>

			</div>
			<main className="container mt-[6vh] max-sm:mt-[9vh] flex flex-col-reverse  items-center">
				
				<div className="w-full   ">
					{renderMain()}
				</div>
			</main>
			<PaymentDetailsModal
				iframe={iframe}
				isOpenProp={isOpen}
				onCloseModal={() => setIsOpen(false)}
			/>
			{/* <SeatsDetailsModal
        isOpenProp={true}
        onCloseModal={() => setIsOpen(false)}
      /> */}
		</div>
	);
};

export default MaritimeCheckout;
