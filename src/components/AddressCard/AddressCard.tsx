import React , {FC, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import classes from "./AddressCard.module.css";
import ProfileButtom from 'components/ProfileButtom/ProfileButtom';
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import HomeIcon from './HomeIcon';
import Autocomplete from "react-google-autocomplete";
import i18next from "i18next";
import { useQuery } from 'react-query';
import { addAddress, getAddressList, getCitiesPrivate } from 'api';
import { showApiErrorMessages } from 'utils';
import { toast } from 'react-toastify';
import Select from 'shared/Select/Select';
import { useTranslation } from 'react-i18next';
const AddressCard:FC<any> = props => {
    const [loading, setLoading] = useState<boolean>(false);
	const [location, setLocation] = useState({
		lat: 30.033333,
		lng: 31.233334,
	});
	const [name, setName] = useState<string>("");
	const [phonenumber, setPhonenumber] = useState<string>("");
	const [addressName, setAddressName] = useState<string>("");
	const [cities, setCities] = useState<any>([]);
	const [addressList , setAddressList] = useState<any> ([]);
	const [cityName, setCityName] = useState("");
	const navigate = useNavigate();
	
	const [t, i18next]  = useTranslation();
	const mapStyles = {
		height: "50%",
		width: "90%",
		marginTop: 10,
	};  
  

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

    const { data } = useQuery(
		["getCities"],
		() => {
			return getCitiesPrivate();
		},
		{
			keepPreviousData: true,
			onSuccess: response => {
				setCities(response?.data?.data);
			},
			onError: (errors: any) => {
				if (Object.keys(errors.response.data.errors)?.length) {
					showApiErrorMessages(errors.response.data.errors);
				} else {
					toast.error(errors.response.data.message);
				}
			},
		},
	);
    const addAdressHandler = async () => {
       
		const body = {
			name: addressName,
			phone: phonenumber,
			city_id: cityName,
			map_location: {
				...location,
				address_name: addressName,
			},
		};
		if (!!body) {
			await addAddress(body)
				.then(res => {
					setLoading(false);
					toast.success("add address done");
					navigate(-1); 
					
				})
				.catch((err: any) => {
					setLoading(false);
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
			toast.error("notValidData");
			setLoading(false);
		}
    }
  return (
    <div className={classes.addressCard}>
        <div className={classes.title}>
            <h2>
				{t("myAddress")}
            </h2>
            
        </div>  
            <div className={classes.layout}>
                <div className={classes.input}>
                    <label>{t("phoneNumber")}</label>
                    <input placeholder="010215....." value={phonenumber} onChange={(e:any)=>setPhonenumber(e.target.value) }/>
                </div>
                <div className={classes.input}>
                    <label>{t("cityName")}</label>
        
                    <select
												
												defaultValue={cityName}
												onChange={e => setCityName(e.target.value)}
											>
												
												{cities?.length > 0 &&
													cities.map((item: any) => {
														return (
															<option key={item?.id} value={item?.id}>
																{i18next.language === "en"
																	? item?.name_en
																	: item?.name_ar}
															</option>
														);
													})}
											</select>
                </div>
            </div>
            <div className={classes.layout}>
                <div className={classes.input}>
                    <label>{t("name")}</label>
                    <input placeholder={i18next.language ==="en" ? "Street Name": ""} defaultValue={addressName} onChange={(e:any) => setAddressName(e.target.value)}/>
                </div>
                <div className={classes.input}>
                    <label>{t("locationSearch")}</label>
                 
                    <Autocomplete
											
												apiKey={process.env.REACT_APP_MAP_KEY!}
												onPlaceSelected={(place: any) => {
                                                    setLocation({
                                                        lat: place.geometry.location.lat(),
														lng: place.geometry.location.lng(),
													});
												}}
												language={i18next.language}
												options={{
                                                    types: ["(regions)"],
													componentRestrictions: { country: "eg" },
												}}
                                                />
                                              
                </div>
            </div>
            <div className="">
										{/* @ts-ignore */}
										<Map
											google={props.google}
											onClick={(mapProps, map, clickEvent) => {
												setLocation({
													lat: clickEvent.latLng.lat(),
													lng: clickEvent.latLng.lng(),
												});
											}}
											zoom={16}
											style={mapStyles}
											initialCenter={location}
											center={location}
										>
											{/* @ts-ignore */}
											<Marker position={location} />
                        <button  className={classes.Edit} onClick={addAdressHandler}>{t("addAddress")}</button>
										</Map>
									</div>
    </div>
  )
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_MAP_KEY!,
})(AddressCard);