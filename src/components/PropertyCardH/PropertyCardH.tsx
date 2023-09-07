import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import { StayDataType } from "data/types";

export interface PropertyCardHProps {
	className?: string;
	data?: StayDataType;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const PropertyCardH: FC<PropertyCardHProps> = ({
	className = "",
	data = DEMO_DATA,
}) => {
	const {
		galleryImgs,
		title,
		href,
		like,
		saleOff,
		isAds,
		price,
		reviewStart,
		reviewCount,
		id,
	} = data;

	const renderSliderGallery = () => {
		return (
			<div className="w-full flex-shrink-0 p-3 sm:w-64 ">
				<GallerySlider
					ratioClass="aspect-w-1 aspect-h-1"
					galleryImgs={galleryImgs}
					className="h-full w-full overflow-hidden rounded-2xl will-change-transform"
					uniqueID={`PropertyCardH_${id}`}
					href={href}
				/>

				{saleOff && (
					<SaleOffBadge className="absolute left-5 top-5 !bg-orange-500" />
				)}
			</div>
		);
	};

	const renderTienIch = () => {
		return (
			<div className="inline-grid grid-cols-3 gap-2">
				<div className="flex items-center space-x-2">
					<span className="hidden sm:inline-block">
						<i className="las la-bed text-lg"></i>
					</span>
					<span className="text-xs text-neutral-500 dark:text-neutral-400">
						6 beds
					</span>
				</div>

				{/* ---- */}
				<div className="flex items-center space-x-2">
					<span className="hidden sm:inline-block">
						<i className="las la-bath text-lg"></i>
					</span>
					<span className="text-xs text-neutral-500 dark:text-neutral-400">
						3 baths
					</span>
				</div>

				{/* ---- */}
				<div className="flex items-center space-x-2">
					<span className="hidden sm:inline-block">
						<i className="las la-expand-arrows-alt text-lg"></i>
					</span>
					<span className="text-xs text-neutral-500 dark:text-neutral-400">
						1200 Sq. Fit
					</span>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className="flex flex-grow flex-col items-start p-3 sm:pr-6">
				<div className="w-full space-y-4">
					<div className="inline-flex space-x-3">
						<Badge
							name={
								<div className="flex items-center">
									<i className="las la-share-alt text-sm"></i>
									<span className="ml-1">4 Network</span>
								</div>
							}
						/>
						<Badge
							name={
								<div className="flex items-center">
									<i className="las la-user-friends text-sm"></i>
									<span className="ml-1">Family</span>
								</div>
							}
							color="yellow"
						/>
					</div>
					<div className="flex items-center space-x-2">
						{isAds && <Badge name="ADS" color="green" />}
						<h2 className="text-lg font-medium capitalize">
							<span className="line-clamp-2">{title}</span>
						</h2>
					</div>
					{renderTienIch()}
					<div className="w-14 border-b border-neutral-100 dark:border-neutral-800 "></div>
					<div className="flex w-full items-end justify-between">
						<StartRating reviewCount={reviewCount} point={reviewStart} />
						<span className="flex items-center justify-center rounded border border-secondary-500 px-3 py-2 text-base font-medium leading-none text-secondary-500">
							{`${price},000`}
						</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`nc-PropertyCardH group relative overflow-hidden rounded-3xl border border-neutral-100 bg-white transition-shadow hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
			data-nc-id="PropertyCardH"
		>
			<Link to={href} className="absolute inset-0"></Link>
			<div className="flex h-full w-full flex-col sm:flex-row sm:items-center">
				{renderSliderGallery()}
				{renderContent()}
			</div>
			<BtnLikeIcon
				colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
				isLiked={like}
				className="absolute right-5 top-5 sm:right-3 sm:top-3 "
			/>
		</div>
	);
};

export default PropertyCardH;
