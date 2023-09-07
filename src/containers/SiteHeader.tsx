import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header3 from "components/Header/Header3";
import Header from "components/Header/Header";

import { useLocation } from "react-router-dom";
import { PathName } from "routers/types";

export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

let OPTIONS = {
	root: null,
	rootMargin: "0px",
	threshold: 1.0,
};
let OBSERVER: IntersectionObserver | null = null;
const PAGES_HIDE_HEADER_BORDER: PathName[] = [
	"/home-3",
	"/listing-car-detail",
	"/listing-experiences-detail",
	"/listing-stay-detail",
];

const SiteHeader = () => {
	const anchorRef = React.useRef<HTMLDivElement>(null);

	const [headerSelected, setHeaderSelected] =
		React.useState<SiteHeaders>("Header 1");

	const [isTopOfPage, setIsTopOfPage] = React.useState(window.pageYOffset < 5);
	const location = useLocation();

	const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach(entry => {
			setIsTopOfPage(entry.isIntersecting);
		});
	};

	useEffect(() => {
		if (location.pathname === "/home-2") {
			setHeaderSelected("Header 2");
		}
		if (location.pathname === "/") {
			setHeaderSelected("Header 1");
		}

		// disconnect the observer
		if (!PAGES_HIDE_HEADER_BORDER.includes(location.pathname as PathName)) {
			OBSERVER && OBSERVER.disconnect();
			OBSERVER = null;
			return;
		}
		if (!OBSERVER) {
			OBSERVER = new IntersectionObserver(intersectionCallback, OPTIONS);
			anchorRef.current && OBSERVER.observe(anchorRef.current);
		}
	}, [location.pathname]);

	const renderHeader = () => {
		let headerClassName = "shadow-sm dark:border-b dark:border-neutral-700";
		if (PAGES_HIDE_HEADER_BORDER.includes(location.pathname as PathName)) {
			headerClassName = isTopOfPage
				? ""
				: "shadow-sm dark:border-b dark:border-neutral-700";
		}
		switch (headerSelected) {
			case "Header 1":
				return <Header className={headerClassName} navType="MainNav1" />;
			case "Header 2":
				return <Header className={headerClassName} navType="MainNav2" />;
			case "Header 3":
				return <Header3 className={headerClassName} />;

			default:
				return <Header3 className={headerClassName} />;
		}
	};

	return (
		<>
			<Helmet>
				<title>Telefreik For Booking Travels</title>
			</Helmet>

			{renderHeader()}
			<div ref={anchorRef} className="invisible absolute h-1"></div>
		</>
	);
};

export default SiteHeader;
