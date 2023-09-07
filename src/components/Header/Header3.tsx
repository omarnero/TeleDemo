import React, { FC, useEffect, useRef, useState } from "react";
import Logo from "shared/Logo/Logo";
import useOutsideAlerter from "hooks/useOutsideAlerter";
import HeroSearchForm, {
	SearchTab,
} from "components/HeroSearchForm2/HeroSearchForm";
import { Link, useLocation } from "react-router-dom";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import MenuBar from "shared/MenuBar/MenuBar";
import { StaySearchFormFields } from "components/HeroSearchForm2/StaySearchForm";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";

interface Header3Props {
	className?: string;
}

let WIN_PREV_POSITION = window.pageYOffset;

const Header3: FC<Header3Props> = ({ className = "" }) => {
	const headerInnerRef = useRef<HTMLDivElement>(null);
	//
	const [showHeroSearch, setShowHeroSearch] =
		useState<StaySearchFormFields | null>();
	//
	const [currentTab, setCurrentTab] = useState<SearchTab>("Flights");

	//
	useOutsideAlerter(headerInnerRef, () => {
		setShowHeroSearch(null);
		setCurrentTab("Flights");
	});

	let location = useLocation();
	//

	useEffect(() => {
		setShowHeroSearch(null);
	}, [location]);

	// HIDDEN WHEN SCROLL EVENT
	useEffect(() => {
		window.addEventListener("scroll", handleEvent);
		return () => {
			window.removeEventListener("scroll", handleEvent);
		};
	}, []);

	const handleEvent = () => {
		window.requestAnimationFrame(handleHideSearchForm);
	};

	const handleHideSearchForm = () => {
		if (!document.querySelector("#nc-Header-3-anchor")) {
			return;
		}
		//
		let currentScrollPos = window.pageYOffset;
		if (
			WIN_PREV_POSITION - currentScrollPos > 100 ||
			WIN_PREV_POSITION - currentScrollPos < -100
		) {
			setShowHeroSearch(null);
		} else {
			return;
		}
		WIN_PREV_POSITION = currentScrollPos;
	};

	//
	const renderHeroSearch = () => {
		return (
			<div
				className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${
					showHeroSearch
						? "visible"
						: "pointer-events-none invisible -translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0"
				}`}
			>
				<div className={`mx-auto w-full max-w-4xl pb-6`}>
					<HeroSearchForm
						defaultFieldFocus={showHeroSearch || undefined}
						onTabChange={setCurrentTab}
						defaultTab={currentTab}
					/>
				</div>
			</div>
		);
	};

	const renderButtonOpenHeroSearch = () => {
		return (
			<div
				className={`relative flex w-full items-center justify-between rounded-full border border-neutral-200 shadow transition-all hover:shadow-md dark:border-neutral-6000 ${
					showHeroSearch
						? "pointer-events-none invisible -translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0"
						: "visible"
				}`}
			>
				<div className="flex items-center text-sm font-medium">
					<span
						onClick={() => setShowHeroSearch("location")}
						className="block cursor-pointer py-3 pl-5 pr-4"
					>
						Location
					</span>
					<span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
					<span
						onClick={() => setShowHeroSearch("dates")}
						className="block cursor-pointer px-4 py-3 "
					>
						Check In
					</span>
					<span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
					<span
						onClick={() => {
							setShowHeroSearch("guests");
						}}
						className="block cursor-pointer px-4 py-3 font-normal"
					>
						Add guests
					</span>
				</div>

				<div
					className="ml-auto flex-shrink-0 cursor-pointer pr-2"
					onClick={() => setShowHeroSearch("location")}
				>
					<span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-6000  text-white">
						<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
							></path>
						</svg>
					</span>
				</div>
			</div>
		);
	};

	return (
		<>
			<div
				className={`nc-Header nc-Header-3 fixed inset-0 top-0 z-40 bg-black/30 transition-opacity will-change-[opacity] dark:bg-black/50 ${
					showHeroSearch ? "visible" : "pointer-events-none invisible opacity-0"
				}`}
			></div>
			{showHeroSearch && <div id="nc-Header-3-anchor"></div>}
			<header ref={headerInnerRef} className={`sticky top-0 z-40 ${className}`}>
				<div
					className={`absolute inset-x-0 top-0 h-full bg-white transition-transform will-change-[transform,opacity] dark:bg-neutral-900
          ${showHeroSearch ? "duration-75" : ""} 
          ${
						showHeroSearch
							? currentTab === "Cars" || currentTab === "Flights"
								? "scale-y-[4.4]"
								: "scale-y-[3.4]"
							: ""
					}`}
				></div>
				<div className="relative flex h-[88px] px-4 lg:container">
					<div className="flex flex-1 items-center justify-between">
						{/* Logo (lg+) */}
						<div className="relative z-10 hidden flex-1 md:flex">
							<Logo />
						</div>

						<div className="mx-auto flex-[2] lg:flex-none">
							<div className="hidden lg:block">
								{renderButtonOpenHeroSearch()}
							</div>
							<div className="mx-auto w-full max-w-lg lg:hidden">
								<HeroSearchForm2MobileFactory />
							</div>
							{renderHeroSearch()}
						</div>

						{/* NAV */}
						<div className="relative z-10 hidden flex-1 items-center justify-end text-neutral-700 dark:text-neutral-100 md:flex">
							<div className="flex items-center space-x-1">
								<Link
									to="/add-listing-1"
									className="
                group hidden items-center
                rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-gray-700 text-opacity-90 hover:border-neutral-400 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:border-neutral-700 dark:text-neutral-300 xl:inline-flex"
								>
									List your property
								</Link>

								<div></div>
								<SwitchDarkMode />
								<div className="pr-1.5">
									<NotifyDropdown className="-ml-2 xl:-ml-1" />
								</div>
								<AvatarDropdown />
								<div className="hidden md:block">
									<MenuBar />
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header3;
