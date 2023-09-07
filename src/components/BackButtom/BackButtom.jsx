import React from 'react'
import classes from "./BackButtom.module.css";
import BackIcon from 'containers/Profile/BackIcon';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export const BackButtom = () => {
  const [t , i18next]  = useTranslation();
  const navigate =useNavigate();
  return (
  
    <div className={classes.Back} onClick={()=> navigate(-1)}>
     { i18next.language === "en" && <BackIcon />}
    <span> {t("back")} </span>
  </div>
  )
}
