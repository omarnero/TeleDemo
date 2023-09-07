import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import shipCircle from "../../images/Group 36.png";
import gesraraby from "../../images/gesraraby.png";
const MarinTimeCard: FC<any> = ({
	className = "",
	data,
	travelFrom,
	cityTo,
	travel,
	date,
	city,
}) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	
	return (
		<div
			className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 lg:h-[200px] lg:w-[100%] 
     transition-shadow hover:shadow-lg dark:border-neutral-800  sm:px-6 sm:py-4 ${className}`}
			data-nc-id="FlightCard"
			onClick={() => {
				navigate(
					`/checkout-maritime/?${date}/${data?.id}/${travel}/${cityTo}/`,
				);
			}}
		>
			<div
				className={` relative sm:pr-0  ${className} `}
				data-nc-id="FlightCard"
			>
				<div className="flex  flex-col mb-[16px] space-y-6 sm:flex-row sm:items-center sm:space-y-0 lg:h-[80px] restyle-container">
					{/* LOGO IMG */}
					<div className="w-24 flex-shrink-0 lg:w-32  max-[900px]:hidden">
						<img src={shipCircle} className="w-[118]" alt="" />
					</div>

					{/* FOR MOBILE RESPONSIVE */}
					{/* <div className="block space-y-1 lg:hidden">
						<div className="flex font-semibold">
							<div>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{!!travelFrom && travelFrom}
								</span>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{!!data && date}
								</span>
							</div>
							<span className="flex w-12  justify-center  rtl:rotate-180">
								<i className=" las la-long-arrow-alt-right text-2xl"></i>
							</span>
							<div>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{city}
								</span>
								<span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
									{city}
								</span>
							</div>
						</div>
					</div> */}

					{/* TIME - NAME */}

					{/* TIMME */}
					<div className=" flex flex-row  mr-[16px] ml-[60px]   max-[900px]:m-[1px] ">
						<div className="text-lg font-medium flex flex-col mr-[16px]  text-[#69696A] text-[12px]">
							<span className="text-[#1E1E1E] text-[18px] font-[500] ">
							{!!travelFrom && travelFrom} 
							</span>
							<span className="text-[15px] font-[400]">
							{!!date && date} 
							</span>
						</div>
						<div className="text-lg font-medium flex flex-col mr-[16px] max-[900px]:m-[1px] max-[900px]:mt-[10px] max-[900px]:w-[100px]">
							
							<span>
							<svg width="80" height="24" viewBox="0 0 133 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_928_13513)">
								<path d="M74.0674 14.5226C73.55 14.5226 73.3167 14.4064 73.0212 14.2593C72.8992 14.1985 72.7714 14.135 72.6237 14.0783L74.2069 9.91326C74.3301 9.58908 74.3097 9.22639 74.1508 8.91814C73.9919 8.60989 73.7083 8.38283 73.3728 8.29517L72.2826 8.01033V4.74073C72.2826 4.05454 71.7244 3.49629 71.0382 3.49629H68.8866V2.28648C68.8866 1.32336 68.103 0.539795 67.1399 0.539795H65.9324C64.9693 0.539795 64.1857 1.32336 64.1857 2.28648V3.49626H62.0341C61.3479 3.49626 60.7897 4.05451 60.7897 4.7407V8.01033L59.6995 8.29517C59.364 8.38283 59.0804 8.60989 58.9215 8.91814C58.7626 9.22639 58.7421 9.58908 58.8654 9.91326L60.4486 14.0784C60.301 14.135 60.1731 14.1986 60.0512 14.2593C59.7557 14.4064 59.5223 14.5227 59.0049 14.5227C58.746 14.5227 58.5361 14.7325 58.5361 14.9914C58.5361 15.2503 58.746 15.4602 59.0049 15.4602C59.7428 15.4602 60.1286 15.268 60.4691 15.0985C60.7646 14.9514 60.998 14.8352 61.5154 14.8352C62.0328 14.8352 62.2662 14.9514 62.5618 15.0985C62.9022 15.268 63.2881 15.4602 64.0259 15.4602C64.7638 15.4602 65.1496 15.268 65.4901 15.0985C65.7856 14.9514 66.019 14.8352 66.5364 14.8352C67.0537 14.8352 67.2871 14.9514 67.5826 15.0985C67.923 15.268 68.3089 15.4602 69.0467 15.4602C69.7845 15.4602 70.1704 15.268 70.5108 15.0985C70.8063 14.9514 71.0397 14.8352 71.5571 14.8352C72.0744 14.8352 72.3078 14.9514 72.6033 15.0985C72.9437 15.268 73.3296 15.4602 74.0674 15.4602C74.3263 15.4602 74.5362 15.2503 74.5362 14.9914C74.5362 14.7325 74.3263 14.5226 74.0674 14.5226ZM65.1232 2.28648C65.1232 1.84029 65.4862 1.47729 65.9324 1.47729H67.1399C67.5861 1.47729 67.9491 1.84029 67.9491 2.28648V3.49626H65.1232V2.28648ZM61.7272 4.74073C61.7272 4.57148 61.8649 4.43379 62.0341 4.43379H71.0381C71.2074 4.43379 71.3451 4.57148 71.3451 4.74073V7.76539L66.6546 6.53983C66.5769 6.51954 66.4953 6.51954 66.4176 6.53983L61.7271 7.76539L61.7272 4.74073ZM70.0929 14.2593C69.7974 14.4064 69.564 14.5226 69.0467 14.5226C68.5294 14.5226 68.296 14.4064 68.0005 14.2593C67.66 14.0898 67.2742 13.8976 66.5364 13.8976C65.7985 13.8976 65.4127 14.0898 65.0722 14.2593C64.7767 14.4064 64.5433 14.5226 64.0259 14.5226C63.5086 14.5226 63.2751 14.4064 62.9796 14.2593C62.6392 14.0898 62.2533 13.8976 61.5154 13.8976C61.4702 13.8976 61.4264 13.8984 61.3837 13.8998L59.7417 9.58014C59.7023 9.47648 59.733 9.39005 59.7548 9.34773C59.7766 9.30542 59.8292 9.23026 59.9365 9.20223L66.5361 7.47783L73.1358 9.20226C73.2431 9.23026 73.2957 9.30542 73.3175 9.34773C73.3393 9.39005 73.37 9.47648 73.3306 9.58017L71.6886 13.8998C71.646 13.8984 71.6022 13.8977 71.557 13.8977C70.8192 13.8976 70.4334 14.0898 70.0929 14.2593Z" fill="#B9C4D5"/>
								<path d="M70.8702 9.87672L66.6551 8.77534C66.5774 8.75506 66.4957 8.75506 66.4181 8.77534L62.2029 9.87672C61.9524 9.94215 61.8024 10.1983 61.8679 10.4487C61.9333 10.6992 62.1894 10.8492 62.4399 10.7838L66.5366 9.71337L70.6332 10.7838C70.6729 10.7942 70.7128 10.7991 70.752 10.7991C70.9601 10.7991 71.1502 10.6595 71.2052 10.4487C71.2707 10.1983 71.1207 9.94215 70.8702 9.87672Z" fill="#B9C4D5"/>
								</g>
								<path d="M0.536133 18.762L9.44377 21.1126C14.6063 22.475 20.0817 22.0011 24.9334 19.772V19.772C30.2108 17.3473 36.2095 17.0063 41.7278 18.8172L47.984 20.8704C52.5543 22.3702 57.5403 21.9242 61.7718 19.637V19.637C66.0619 17.3181 71.1246 16.8931 75.7412 18.4643L82.394 20.7284C87.1074 22.3325 92.2475 22.138 96.8262 20.1823L99.6444 18.9785C104.008 17.1146 109.011 17.5242 113.014 20.0734V20.0734C116.888 22.5408 121.708 23.0083 125.984 21.3314L132.536 18.762" stroke="#DDE2EB"/>
								<defs>
								<clipPath id="clip0_928_13513">
								<rect width="16" height="16" fill="white" transform="translate(58.5361)"/>
								</clipPath>
								</defs>
							</svg>

							</span>
							<span>
							<svg width="80" height="6" viewBox="0 0 133 6" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.536133 1.76201L9.44377 4.11265C14.6063 5.47498 20.0817 5.00108 24.9334 2.772V2.772C30.2108 0.347305 36.2095 0.00627303 41.7278 1.81722L47.984 3.87038C52.5543 5.37024 57.5403 4.92421 61.7718 2.63697V2.63697C66.0619 0.318088 71.1246 -0.106919 75.7412 1.46426L82.394 3.7284C87.1074 5.33254 92.2475 5.13804 96.8262 3.1823L99.6444 1.97854C104.008 0.114555 109.011 0.524228 113.014 3.07335V3.07335C116.888 5.54079 121.708 6.00829 125.984 4.33137L132.536 1.76201" stroke="#B9C4D5"/>
							</svg>
							</span>
							<span className="m-auto">Direct</span>
							<span className="m-auto text-[#69696A] text-[12px]">5h 2min</span>
						</div>
						<div className="text-lg font-medium flex flex-col ml-2 mt-4 text-[#69696A] text-[12px] max-[900px]:m-[1px]">
							<span className="text-[#1E1E1E] text-[18px] font-[500] ">
							{!!city && city} 
							</span>
							<span className="text-[15px] font-[400]">
							{!!date && date} 
							</span>
						</div>
					</div>

					{/* PRICE */}
					<div className="flex flex-1 flex-col items-start gap-4  whitespace-nowrap md:flex-row md:justify-end ">
						<div>
							<div></div>
							{/* <span className="text-slate-400-6000 text-xl font-semibold">
								{t("takeOffTime", { time: `${data?.time}` })}{" "}
							</span> */}
						</div>
						<div>
							{/* <span className="text-xl font-semibold text-secondary-6000">
								{t("tripCost", { price: data?.adult_price })}
							</span> */}
							<img src={gesraraby} className="w-[87px] max-[900px]:mt-[-10px]" alt="" />
						</div>
					</div>
				</div>
				{/* bottom container for navy card search */}
				<div className="lg:h-[60px] flex flex-row justify-between pt-4 " style={{borderTop:"1px solid #B9C4D5"}}>
					<div className="flex max-[900px]:flex-col-reverse min-[900px]:justify-between min-[900px]:w-[82%] max-[1024]:w-[82%] min-[1280px]:w-[89%]  ">
						<div className="w-[110px] bg-[#E8ECF2] max-[900px]:bg-[#658FA9]  h-[40px] flex justify-center align-middle" style={{borderRadius:"10px"}}>
							<div className=" my-auto text-[#1E1E1E] max-[900px]:text-white">
								<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
								<g clip-path="url(#clip0_928_13530)">
									<path d="M16.0312 14.5226C15.5139 14.5226 15.2805 14.4064 14.985 14.2593C14.8631 14.1985 14.7352 14.135 14.5875 14.0783L16.1708 9.91326C16.294 9.58908 16.2736 9.22639 16.1147 8.91814C15.9558 8.60989 15.6722 8.38283 15.3367 8.29517L14.2465 8.01033V4.74073C14.2465 4.05454 13.6882 3.49629 13.002 3.49629H10.8504V2.28648C10.8504 1.32336 10.0669 0.539795 9.10375 0.539795H7.89628C6.93316 0.539795 6.14959 1.32336 6.14959 2.28648V3.49626H3.998C3.31181 3.49626 2.75356 4.05451 2.75356 4.7407V8.01033L1.66338 8.29517C1.32784 8.38283 1.04425 8.60989 0.885375 8.91814C0.7265 9.22639 0.706 9.58908 0.82925 9.91326L2.4125 14.0784C2.26488 14.135 2.137 14.1986 2.01509 14.2593C1.71956 14.4064 1.48616 14.5227 0.96875 14.5227C0.709875 14.5227 0.5 14.7325 0.5 14.9914C0.5 15.2503 0.709875 15.4602 0.96875 15.4602C1.70662 15.4602 2.0925 15.268 2.43294 15.0985C2.72847 14.9514 2.96187 14.8352 3.47928 14.8352C3.99669 14.8352 4.23009 14.9514 4.52563 15.0985C4.86606 15.268 5.25194 15.4602 5.98981 15.4602C6.72766 15.4602 7.1135 15.268 7.45397 15.0985C7.74947 14.9514 7.98287 14.8352 8.50022 14.8352C9.01756 14.8352 9.25094 14.9514 9.54644 15.0985C9.88688 15.268 10.2727 15.4602 11.0106 15.4602C11.7484 15.4602 12.1342 15.268 12.4747 15.0985C12.7702 14.9514 13.0036 14.8352 13.5209 14.8352C14.0383 14.8352 14.2717 14.9514 14.5672 15.0985C14.9076 15.268 15.2934 15.4602 16.0313 15.4602C16.2902 15.4602 16.5 15.2503 16.5 14.9914C16.5 14.7325 16.2901 14.5226 16.0312 14.5226ZM7.08709 2.28648C7.08709 1.84029 7.45009 1.47729 7.89628 1.47729H9.10375C9.54994 1.47729 9.91294 1.84029 9.91294 2.28648V3.49626H7.08709V2.28648ZM3.69103 4.74073C3.69103 4.57148 3.82872 4.43379 3.99797 4.43379H13.002C13.1712 4.43379 13.3089 4.57148 13.3089 4.74073V7.76539L8.61847 6.53983C8.54078 6.51954 8.45916 6.51954 8.38147 6.53983L3.691 7.76539L3.69103 4.74073ZM12.0568 14.2593C11.7613 14.4064 11.5279 14.5226 11.0106 14.5226C10.4932 14.5226 10.2598 14.4064 9.96434 14.2593C9.62391 14.0898 9.23806 13.8976 8.50022 13.8976C7.76237 13.8976 7.37653 14.0898 7.03606 14.2593C6.74056 14.4064 6.50716 14.5226 5.98981 14.5226C5.47244 14.5226 5.239 14.4064 4.9435 14.2593C4.60306 14.0898 4.21719 13.8976 3.47931 13.8976C3.43409 13.8976 3.39022 13.8984 3.34756 13.8998L1.70553 9.58014C1.66612 9.47648 1.69684 9.39005 1.71866 9.34773C1.74047 9.30542 1.79306 9.23026 1.90034 9.20223L8.5 7.47783L15.0997 9.20226C15.2069 9.23026 15.2595 9.30542 15.2813 9.34773C15.3032 9.39005 15.3339 9.47648 15.2945 9.58017L13.6525 13.8998C13.6099 13.8984 13.5661 13.8977 13.5209 13.8977C12.7831 13.8976 12.3972 14.0898 12.0568 14.2593Z" fill="#1E1E1E" className="max-[900px]:fill-white"/>
									<path d="M12.8341 9.87672L8.61893 8.77534C8.54124 8.75506 8.45962 8.75506 8.38193 8.77534L4.16677 9.87672C3.91631 9.94215 3.76631 10.1983 3.83174 10.4487C3.89718 10.6992 4.15331 10.8492 4.40377 10.7838L8.50043 9.71337L12.5971 10.7838C12.6368 10.7942 12.6767 10.7991 12.7159 10.7991C12.924 10.7991 13.1141 10.6595 13.1691 10.4487C13.2346 10.1983 13.0846 9.94215 12.8341 9.87672Z" fill="black" className="max-[900px]:fill-white"/>
								</g>
								<defs>
									<clipPath id="clip0_928_13530">
									<rect width="16" height="16" fill="white" transform="translate(0.5)"/>
									</clipPath>
								</defs>
								</svg>
							</div>
							<div className="flex justify-center my-auto text-[#1E1E1E] max-[900px]:text-white">
								Ferry
							</div>
						</div>
						<div className="flex flex-col ">
								<h2 className="text-[18px] text-[600]">{t("tripCost", { price: data?.adult_price })}</h2>
								<h2 className="text-[12px] text-[400]">Price per person</h2>
						</div>
					</div>
					<div className="flex flex-row  " >
						{/* <div className="flex flex-col ">
							{/* <h2 className="text-[18px] text-[600]">{t("tripCost", { price: data?.adult_price })}</h2>
							<h2 className="text-[12px] text-[400]">Price per person</h2> 
						</div> */}
						<div className="flex align-middle justify-center flex-wrap" style={{alignContent:"end"}}><button className=" w-[110px] h-[54px]   bg-[#1D4179]  text-white text-[20px] text-[600] max-[1024px]:bg-black " 
						style={{borderRadius:"9px"}}
						onClick={() => {
							navigate(
								`/checkout-maritime/?${date}/${data?.id}/${travel}/${cityTo}/`,
							);
						}}
						>select</button></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MarinTimeCard;
