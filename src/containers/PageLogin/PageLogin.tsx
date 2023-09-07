import React, { FC, useCallback, useContext, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import useInput from "hooks/useInput";
import { Value } from "sass";
import { useAddLogin } from "hooks/DataSend/useLogin";
import { AppContext } from "components/context/AppContext";
import OtpInput from "react-otp-input";
import classes from "./PageLogin.module.css";
import {
	LoginSocialGoogle,
	LoginSocialFacebook,
	IResolveParams,
} from "reactjs-social-login";
export interface PageLoginProps {
	className?: string;
}
const REDIRECT_URI = "https://www.telefreik.com/login";

const loginSocials = [
	{
		name: "continueWithFacebook",
		href: "#",
		icon: facebookSvg,
	},
	{
		name: "continueWithGoogle",
		href: "#",
		icon: googleSvg,
	},
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
	const { t , i18n } = useTranslation();
	const [provider, setProvider] = useState("");
	const [profile, setProfile] = useState<any>();
	const [phone ,setPhone ] = useState<any>();
	const [password , setPassword] = useState<any>();

	const { mutate } = useAddLogin();
		const navigate = useNavigate();
	const { token } = useContext(AppContext);
	const formSubmitHandler = (event: any) => {
		event.preventDefault();
		
		const officialPhone = phone?.substring(1);

		const data = new FormData();
		data.append("mobile", officialPhone);
		data.append("phonecode", "20");
		data.append("password", password);

		mutate(data);
		localStorage.setItem("phone", `${phone}`);
	};
	const onLoginStart = useCallback(() => {
		alert("login start");
	}, []);
	const onLogoutSuccess = useCallback(() => {
		setProfile(null);
		setProvider("");
		alert("logout success");
	}, []);
	// return (
	// 	<div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
	// 		<Helmet>
	// 			<title>Login || Telefreik For Booking</title>
	// 		</Helmet>
	// 		<div className="container mb-24 lg:mb-32">
	// 			<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
	// 				{t("login")}
	// 			</h2>
	// 			<div className="mx-auto max-w-md space-y-6">
	// 				<div className="grid gap-3">
	// 					{/* <LoginSocialFacebook
    //           appId={process.env.REACT_APP_FB_APP_ID || ""}
    //           fieldsProfile={
    //             "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
    //           }
    //           onLoginStart={onLoginStart}
    //           onLogoutSuccess={onLogoutSuccess}
    //           redirect_uri={REDIRECT_URI}
    //           onResolve={({ provider, data }: IResolveParams) => {
    //             setProvider(provider);
    //             setProfile(data);
    //           }}
    //           onReject={(err) => {
    //             console.log(err);
    //           }}
    //         >
    //           <a className="nc-will-change-transform  cursor-pointer flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]">
    //             <img
    //               className="flex-shrink-0"
    //               src={facebookSvg}
    //               alt={"facebook"}
    //             />
    //             <h3 className="flex-grow text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 sm:text-sm">
    //               {t("continueWithFacebook")}
    //             </h3>
    //           </a>
    //         </LoginSocialFacebook> */}

	// 					{/* <LoginSocialGoogle
    //           client_id={process.env.REACT_APP_GG_APP_ID || ""}
    //           onLoginStart={onLoginStart}
    //           redirect_uri={REDIRECT_URI}
    //           scope="openid profile email"
    //           discoveryDocs="claims_supported"
    //           access_type="offline"
    //           onResolve={({ provider, data }: IResolveParams) => {
    //             setProvider(provider);
    //             setProfile(data);
    //           }}
    //           onReject={(err) => {
    //             console.log(err);
    //           }}
    //         >
    //           <a className="nc-will-change-transform  cursor-pointer  flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]">
    //             <img className="flex-shrink-0" src={googleSvg} alt={"google"} />
    //             <h3 className="flex-grow text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 sm:text-sm">
    //               {t("continueWithGoogle")}
    //             </h3>
    //           </a>
    //         </LoginSocialGoogle> */}
	// 				</div>
	// 				{/* FORM */}
	// 				<form
	// 					className="grid grid-cols-1 gap-6"
	// 					action="#"
	// 					method="post"
	// 					onSubmit={formSubmitHandler}
	// 				>
	// 					<label className="block">
	// 						<span className="text-neutral-800 dark:text-neutral-200">
	// 							{t("phoneNumber")}
	// 						</span>
	// 						<Input
	// 							type="text"
	// 							placeholder="0105478...."
	// 							className="mt-1"
	// 							value={phone}
	// 							onChange={phoneChange}
	// 							onBlur={phoneBlur}
	// 							autoFocus
	// 						/>
	// 						{phoneHasError && (
	// 							<p className="mt-1 text-red-900">
	// 								{t("Enter a valid phone number")}
	// 							</p>
	// 						)}
	// 					</label>
	// 					<label className="block">
	// 						<span className="text-neutral-800 dark:text-neutral-200">
	// 							{t("password")}
	// 						</span>
	// 						<OtpInput
	// 							value={password}
	// 							inputStyle={{
	// 								height: "3.5rem",
	// 								width: "3.5rem",
	// 								border: "1px solid rgb(67,56,202)",
	// 								borderRadius: 4,
	// 								color: "text-neutral-800 dark:text-neutral-200",
	// 								fontWight: "bolder",
	// 								fontSize: "1.5rem",
	// 								marginTop: "0.5rem",
	// 							}}
	// 							hasErrored={password?.length <= 6}
	// 							onChange={(e: any) => {
	// 								const event: any = {
	// 									target: {
	// 										value: e,
	// 									},
	// 								};
	// 								passwordChange(event);
	// 							}}
	// 							placeholder="------"
	// 							isInputNum={true}
	// 							numInputs={6}
	// 							separator={<div style={{ marginInline: "0.5rem" }} />}
	// 							containerStyle={{ direction: "ltr" }}
	// 						/>
	// 						{passwordHasError && (
	// 							<p className="mt-1 text-red-900">{t("inValidPassword")}</p>
	// 						)}
	// 					</label>
	// 					<label className="block">
	// 						<Link to="/forgot-pass">
	// 							<span className="text-neutral-800 dark:text-neutral-200">
	// 								{t("forgotPassword")}{" "}
	// 							</span>
	// 						</Link>
	// 					</label>
	// 					<ButtonPrimary type="submit">{t("continue")}</ButtonPrimary>
	// 				</form>
	// 				{/* ==== */}
	// 				{/* OR */}
	// 				<div className="relative text-center">
	// 					<span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
	// 						{t("or")}
	// 					</span>
	// 					<div className="absolute left-0 top-1/2 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
	// 				</div>

	// 				{!token && (
	// 					<span className="block text-center text-neutral-700 dark:text-neutral-300 ">
	// 						{t("newUser")} {` `}(
	// 						<Link to="/signup">
	// 							<span className="text-primary-6000">
	// 								{t("createAnAccount")}
	// 							</span>
	// 						</Link>
	// 						)
	// 					</span>
	// 				)}
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return (
		<div className={classes.Form}>
			<form className={classes.FormCard}>
			<div className={classes.actions}>
				<button  className={classes.active} onClick={()=> navigate("/login")}>{t("signIn")}</button>
				<button onClick={()=> navigate("/signup")}>{t("signUp")}</button>
				</div>
				<div className={classes.element}>
				<label htmlFor="phone"> {t("phoneNumber")}</label>
				<input id="phone" value={phone} onChange={(e:any)=>setPhone(e.target.value) }/>
			</div>
			<div className={classes.element} >
	 						<span className="text-neutral-800 dark:text-neutral-200">
 							{t("password")}
	 						</span>
	 						<OtpInput
							value={password}
								inputStyle={classes.otp}
							
	 							hasErrored={password?.length <= 6}
								onChange={(e: any) => setPassword(e)}
								isInputSecure={true}
								isInputNum={true}
								numInputs={6}
								
	 							separator={<div style={{ marginInline: "0.5rem" }} />}
	 							containerStyle={ i18n.language ==="en" ? { direction: "ltr" } : {direction: "rtl"}}
	 						/>
						</div>	
						<button className={`${classes.confirm} my-3` } onClick={formSubmitHandler}> {t("signIn")}</button>
						<span className="text-[#1D4179] mb-4 text-base cursor-pointer" onClick={()=> navigate("/forgot-pass")}>{t("forgotPassword")}</span>
			</form>
		</div>
	
	);
};

export default PageLogin;
