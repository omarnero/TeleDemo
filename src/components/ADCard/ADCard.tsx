import React ,  {useState} from 'react'
import classes from "./ADCard.module.css";
import { useQuery } from 'react-query';
import { getAddressList } from 'api';
import { showApiErrorMessages } from 'utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LocationView from 'components/LocationView/LocationView';
import { add } from 'lodash';
import { useTranslation } from 'react-i18next';
const ADCard = () => {
    const navigate = useNavigate();
    const [addressList , setAddressList] = useState<any> ([]);
   const [t , i18next] = useTranslation();

	const { data: addressListData } = useQuery(
		["addressListData"],
		() => {
		
			return getAddressList();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				if (response?.data?.data.length) {
					setAddressList([...response?.data?.data]);
				}
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
				if (errors.response.status === 401) {
					navigate("/login");
				}
			},
		},
	);
    if(addressList.length > 0){
        return (
            <div className={classes.addressCard}>
                <div className={classes.title}>
                    <h2>
                        {t("myAddress")}
                    </h2>
                   
                </div>
                {
                    addressList.map((item:any)=> <LocationView phone={item.phone} city={item.city.name} address={item.name}/>)
                
                }
                {/* {addressList.map((item:any)=>   <>
                <div className={classes.layout}>
                    <div className={classes.input}>
                        <label>Phone Number *</label>
                        <input placeholder={item.phone} readOnly={true}/>
                    </div>
                    <div className={classes.input}>
                        <label>city *</label>
                        <input placeholder={item.city.name} readOnly={true}/>
                    </div>
                </div>
                <div className={classes.layout}>
                    <div className={classes.input}>
                        <label>Street Name  *</label>
                        <input placeholder={item.name} readOnly={true}/>
                    </div>
                    <div className={classes.input}>
                        <label>Location *</label>
                        <input placeholder={item.name} readOnly={true}/>
        
                    </div>
                </div>
                <hr />
                </>) } */}
              
                <button className={classes.Edit} onClick={()=> navigate("/addaddress")}> {t("addAddress")}</button>
            </div>
          )
    }
    return <p> no Address </p>
}

export default ADCard