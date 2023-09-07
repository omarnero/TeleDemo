import React, { FC, useContext, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useTranslation } from "react-i18next";
import useInput from "hooks/useInput";
import { useAddOtb } from "hooks/DataSend/useOtb";
import { AppContext } from "components/context/AppContext";
import OtpInput from "react-otp-input";
import classes from "./OtpPage.module.css";
import OtpIcon from "./OtpIcon";
export interface OtpPageProps {
	className?: string;
}

const OtpPage: FC<OtpPageProps> = ({ className = "" }) => {
	const { name, phone } = useContext(AppContext);
	const [otp, setOtp] = useState<string>("");
	const { mutate } = useAddOtb();
	const { t } = useTranslation();

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (!otp) {
			return;
		}
		const data = new FormData();
		const mobile = localStorage.getItem("phone");
		const officialPhone = mobile?.substring(1);

		data.append("mobile", officialPhone ?? "");
		data.append("phonecode", "20");
		data.append("code", otp);
		mutate(data);
	};
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
	// 				<form className="grid grid-cols-1 gap-6" onSubmit={submitHandler}>
	// 					<label className="block">
	// 						<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
	// 							{t("otp")}
	// 						</span>
	// 					</label>
	// 					<div className="flex w-full  justify-center">
	// 						<OtpInput
	// 							value={otp}
	// 							inputStyle={{
	// 								height: "3.5rem",
	// 								width: "3.5rem",
	// 								border: "1px solid rgb(67,56,202)",
	// 								borderRadius: 4,
	// 								color: "text-neutral-800 dark:text-neutral-200",
	// 								fontWight: "bolder",
	// 								fontSize: "1.5rem",
	// 							}}
	// 							hasErrored={otp?.length <= 4}
	// 							onChange={(e: any) => setOtp(e)}
	// 							placeholder="----"
	// 							isInputNum={true}
	// 							isInputSecure={true}
	// 							numInputs={4}
	// 							separator={<div style={{ marginInline: "0.5rem" }} />}
	// 							shouldAutoFocus={true}
	// 							containerStyle={{ direction: "ltr" }}
	// 						/>
	// 					</div>

	// 					<ButtonPrimary type="submit">{t("login")}</ButtonPrimary>
	// 				</form>
	// 				{/* ==== */}
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	return (
		<div className={classes.Form}>
			<form className={classes.FormCard}>

			<OtpIcon />
			<h2 className={classes.OtpHeading}>{t("otp")}</h2>
			<h3 className={classes.OtpDesc}>{t("OTPMessage")}</h3>
			<OtpInput
								value={otp}
							inputStyle={{
	 								height: "3.5rem",
	 								width: "3.5rem",
	 								border: "1px solid rgb(67,56,202)",
									borderRadius: 4,
									color: "text-neutral-800 dark:text-neutral-200",
									fontWight: "bolder",
								fontSize: "1.5rem",
	 							}}
								hasErrored={otp?.length <= 4}
								onChange={(e: any) => setOtp(e)}
								placeholder="----"
								isInputNum={true}
								isInputSecure={true}
	 							numInputs={4}
								separator={<div style={{ marginInline: "0.5rem" }} />}
								shouldAutoFocus={true}
								containerStyle={{ direction: "ltr" }}
	 						/>
							<button className={classes.OtpBtn} onClick={submitHandler}>{t("Verify")}</button>
							<p className={classes.OtpCode} >{t("received code")} </p>
							<span className={classes.OtbLink}>{t("Resend")}</span>
			</form>
		</div>
	)
};

export default OtpPage;
