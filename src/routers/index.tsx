import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";

import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";

import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import ListingShipsPage from "containers/ListingShipsPage/ListingShipsPage";
import ListingBusPage from "containers/ListingBusPage/ListingBusPage";
import PageForgetPassword from "containers/PageForgetPassword/PageForgetPassword";
import OtpPage from "containers/OtpPage/OtpPage";
import Terms from "containers/BlogPage/Terms";
import Privacy from "containers/BlogPage/Privacy";
import Faqs from "containers/BlogPage/Faqs";
import MaritimeCheckout from "containers/MerintmeCheckout";
import CheckOutPrivatePage from "containers/CheckOutPage/CheckOutPrivate";
import Profile from "containers/Profile/Profile";
import Address from "containers/Address/Address";
import ChangePassord from "containers/ChangePassword/ChangePassord";
import Booking from "containers/Booking/Booking";
import AdressDetail from "containers/AdressDetail/AdressDetail";
import MaritimePay from "containers/MaritimePay/MaritimePay";

export const pages: any[] = [
	{ path: "/", exact: true, component: PageHome },
	{ path: "/#", exact: true, component: PageHome },
	{ path: "/profile",  component: Profile },
	
	{ path: "/address",  component: AdressDetail },
	{ path: "/addaddress",  component: Address },
	{ path: "/changepassword",  component: ChangePassord },
	{ path: "/booking",  component: Booking },
	
	//
	//
	// {
	//   path: "/listing-experiences",
	//   component: ListingExperiencesPage,
	// },
	// {
	//   path: "/listing-experiences-map",
	//   component: ListingExperiencesMapPage,
	// },
	// {
	//   path: "/listing-experiences-detail",
	//   component: ListingExperiencesDetailPage,
	// },
	//
	{ path: "/listing-car", component: ListingCarPage },
	{ path: "/listing-car-map", component: ListingCarMapPage },
	//
	// { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
	// { path: "/listing-real-estate", component: ListingRealEstatePage },
	//
	{ path: "/listing-flights", component: ListingFlightsPage },
	{ path: "/listing-ships", component: ListingShipsPage },
	{ path: "/listing-bus/", component: ListingBusPage },

	//
	{ path: "/checkout", component: CheckOutPage },
	// { path: "/pay-done", component: PayPage },
	//
	{ path: "/author", component: AuthorPage },
	{ path: "/account", component: AccountPage },
	{ path: "/account-password", component: AccountPass },
	{ path: "/account-savelists", component: AccountSavelists },
	{ path: "/account-billing", component: AccountBilling },

	//
	{ path: "/contact", component: PageContact },
	{ path: "/about", component: PageAbout },
	{ path: "/signup", component: PageSignUp },
	{ path: "/login", component: PageLogin },
	{ path: "/forgot-pass", component: PageForgetPassword },
	{ path: "/otp", component: OtpPage },
	{ path: "/terms", component: Terms },
	{ path: "/privacy", component: Privacy },
	{ path: "/faqs", component: Faqs },
	{ path: "/checkout-maritime", component: MaritimePay },
	{ path: "/checkout-private", component: CheckOutPrivatePage },
	//
];

const MyRoutes = () => {
	const WIN_WIDTH = useWindowSize().width || window.innerWidth;
	return (
		<BrowserRouter>
			<ScrollToTop />
			<SiteHeader />

			<Routes>
				{pages.map(({ component, path }) => {
					const Component = component;

					return <Route key={path} element={<Component />} path={path} />;
				})}
				<Route element={<Page404 />} />
			</Routes>

			{WIN_WIDTH < 768 && <FooterNav />}
			<Footer />
		</BrowserRouter>
	);
};

export default MyRoutes;
