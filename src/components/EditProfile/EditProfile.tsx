import React, { useState } from 'react'
import classes from "./EditProfile.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import useForm from "hooks/useForm";
import { updateProfile } from 'api';
import { t } from "i18next";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { showApiErrorMessages } from 'utils';
import { useTranslation } from 'react-i18next';
const EditProfile = () => {
  const [t , i18next] =useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useForm({
		name: localStorage.getItem("name") ?? "",
		email: localStorage.getItem("email") ?? "",
		mobile: localStorage.getItem("phone") ?? "",
		country_code: "20",
	});
  const [loading, setLoading] = useState<boolean>(false);
const [mobile ,setMobile]=useState<any>(localStorage.getItem("phone"))
const editAddressData = async () => {
  setLoading(true);

  if (!!values) {
    await updateProfile({ ...values, mobile })
      .then(res => {
        setLoading(false);
        localStorage.setItem("name", values?.name);
        localStorage.setItem("email", values?.email);
        localStorage.setItem("phone", mobile);

        toast.success(t("successSending"));
        setValues({
          name: "",
          email: "",
          mobile: "",
          country_code: "20",
        });
      })
      .catch((err: any) => {
        // setLoading(false);
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
    toast.error(t("notValidData"));
    setLoading(false);
  }
};
  return (
    <div className={classes.editCard}>
        <h2 className={classes.title}>{t("editProfile")}</h2>
        <div className={classes.filed}>
            <label> {t("fullName")}</label>
            <input type='text' onChange={setValues}
									value={values.name}
									name="name"
									required/>
        </div>
        <div className={classes.filed}>
            <label>{t("EmailAddress")}</label>
            <input type='email' onChange={setValues} value={values.email} name='email'/>
        </div>
        <div className={classes.filed}>
            <label>{t("phoneNumber")}</label>
            <PhoneInput   className={classes.PhoneInput}
            value={mobile}
                onChange={setMobile}
                    defaultCountry="EG"
                    id="phoneNumber"/>
        </div>
        <button className={classes.Edit} onClick={editAddressData}>
           {t("edit")}
        </button>
         </div>
  )
}

export default EditProfile