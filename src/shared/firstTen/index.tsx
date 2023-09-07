import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const FirstTenBus = ({ setSelected, seats }: any) => {
	const { t } = useTranslation();
	const [selectedList, setSelectedList] = useState<any>([]);

	const setContainer = (e: any) => {
		if (
			e.target.classList.contains("seat") &&
			!e.target.classList.contains("occupied")
		) {
			e.target.classList.toggle("selected");
			const seat: any = {};
			if (e.target?.id) {
				seat[`seat_${e.target?.id}`] = e.target?.id;
				if (selectedList[`seat_${e.target?.id}`] === undefined) {
					setSelectedList({ ...selectedList, ...seat });
					setSelected({ ...selectedList, ...seat });
				} else {
					const seats = selectedList;

					delete seats[`seat_${e.target?.id}`];
					setSelectedList({ ...seats });
					setSelected({ ...seats });
				}
			}
		}
	};

	const setSelectedSeats = () => {
		// const seats = document.querySelectorAll(".row .seat:not(.occupied)");
		const list = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
		];
		list.forEach(item => {
			const ele: any = document.getElementById(item);
			const filterSeats = seats.filter((seat: any) => seat?.id + "" === item);
			if (filterSeats?.length === 0) {
				ele.classList.add("occupied");
			} else {
				ele.classList.remove("occupied");
			}
		});
	};
	const setOccupiedSeats = () => {
		// const seats = document.querySelectorAll(".row .seat:not(.occupied)");
		const list = [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
		];
		list.forEach(item => {
			const ele: any = document.getElementById(item);
			ele.classList.add("occupied");
		});
	};
	useEffect(() => {
		if (seats?.length > 0) {
			setSelectedSeats();
		} else {
			setOccupiedSeats();
		}
	}, [JSON.stringify(seats)]);
	return (
		<div className="mt-4 " dir="ltr">
			<h3 className="w-full text-2xl font-semibold">{t("selectSeats")}</h3>
			<div className="mt-2 w-full">
				<div
					className={`my-5 inline-block w-full transform overflow-hidden rounded-2xl border border-black border-opacity-5 bg-white text-left align-middle text-neutral-900 transition-all dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:my-8`}
				>
					<div className="movie-container  px-1 sm:px-0">
						<ul className="showcase">
							<li>
								<div className="seat"></div>
								<small>{t("availableSeat")}</small>
							</li>
							<li>
								<div className="seat selected"></div>
								<small>{t("ownSelect")}</small>
							</li>
							<li>
								<div className="seat occupied"></div>
								<small>{t("notAvailable")}</small>
							</li>
						</ul>

						<div className="container" onClick={(e: any) => setContainer(e)}>
							<div className="row">
								<div className="seat" title={"1"} id={"1"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"2"} id={"2"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"3"} id={"3"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>

								<div className="seat" title={"4"} id={"4"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"5"} id={"5"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"6"} id={"6"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"7"} id={"7"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"8"} id={"8"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"9"} id={"9"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat" title={"10"} id={"10"}></div>
							</div>

							<div className="row">
								<div className="seat" title={"11"} id={"11"}></div>
								<div className="seat" title={"12"} id={"12"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="seat " title={"13"} id={"13"}></div>
								<div className="seat" title={"14"} id={"14"}></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
							</div>
							<div className="row">
								<div className="seat" title={"15"} id={"15"}></div>
								<div className="seat" title={"16"} id={"16"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>
								<div className="seat " title={"17"} id={"17"}></div>
								<div className="seat" title={"18"} id={"18"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"19"} id={"19"}></div>
								<div className="seat" title={"20"} id={"20"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>

								<div className="seat " title={"21"} id={"21"}></div>
								<div className="seat" title={"22"} id={"22"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"23"} id={"23"}></div>
								<div className="seat" title={"24"} id={"24"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>

								<div className="seat " title={"25"} id={"25"}></div>
								<div className="seat" title={"26"} id={"26"}></div>
							</div>
							<div className="row">
								<div className="seat" title={"27"} id={"27"}></div>
								<div className="seat" title={"28"} id={"28"}></div>

								<div className="seat opacity-0"></div>
								<div className="seat opacity-0"></div>

								<div className="seat " title={"29"} id={"29"}></div>
								<div className="seat" title={"30"} id={"30"}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
