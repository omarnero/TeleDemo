import React, { useState } from 'react'
import classes from "./PasswordCard.module.css";
import OtpInput from "react-otp-input";
import ProfileButtom from 'components/ProfileButtom/ProfileButtom';
import { useChangePass } from 'hooks/DataSend/useChangePass';
import { useTranslation } from 'react-i18next';
const PasswordCard = () => {
	const [curr , setCurr] = useState<any>("");
	const [password ,setPassword]=useState<any>("");
	const [resetPassword , setResetPassword] = useState<any>("");
	const {mutate}=useChangePass()
	const [t , i18n] =useTranslation();
	const phone = localStorage.getItem("phone");
	const changeHandler = ()=>{
		const data = new FormData();
		data.append("phonecode", "20");
		data.append("code", "4391");
			data.append("mobile" , "1060415852");
			data.append("password" , password);
			data.append("password_confirmation" , resetPassword);



		mutate(data)
	}
  return (
    <div className={classes.passwordCard}>
      <h2>{t("changePassword")}</h2>
        <div className={classes.passInput}>
          <label>{t("currentPassword")}</label>
          <OtpInput
							value={curr}
							
								inputStyle={classes.otp}
	 					
								onChange={(e: any) => setCurr(e)}
	 							
								isInputNum={true}
								numInputs={6}
	 							separator={<div style={{ marginInline: "0.5rem" }} />}
	 							containerStyle={ i18n.language ==="en" ? { direction: "ltr" } : {direction: "rtl"}}
	 						/>
        </div>
        <div className={classes.passInput}>
          <label>{t("newPassword")}</label>
          <OtpInput
								value={password}
								inputStyle={
									classes.otp
	 							}
	 							hasErrored={password?.length <= 6}
								onChange={(e: any) => setPassword(e)}
								 
								isInputNum={true}
								isInputSecure={false}
								numInputs={6}
	 							separator={<div style={{ marginInline: "0.5rem" }} />}
								 shouldAutoFocus={true}
	 							containerStyle={ i18n.language ==="en" ? { direction: "ltr" } : {direction: "rtl"}}
	 						/>
        </div>
        <div className={classes.passInput}>
          <label>{t("confirmPassword")}</label>
          <OtpInput
								value={resetPassword}
								inputStyle={classes.otp}
								 hasErrored={password?.length <= 6}
								onChange={(e: any) => {
	 								setResetPassword(e)}}
	 							
								isInputNum={true}
								numInputs={6}
	 							separator={<div style={{ marginInline: "0.5rem" }} />}
	 							containerStyle={ i18n.language ==="en" ? { direction: "ltr" } : {direction: "rtl"}}
	 						/>
        </div>
              <ProfileButtom title={t("done")} mt={false}  onClick={changeHandler}/>
    </div>
  )
}

export default PasswordCard;