import React, { FC } from "react";
import imagePng from "images/hero-right-3.png";
import HeroRealEstateSearchForm from "components/HeroSearchForm/HeroRealEstateSearchForm";

export interface SectionHero2ArchivePageProps {
	className?: string;
	children?: React.ReactNode;
}

const SectionHero2ArchivePage: FC<SectionHero2ArchivePageProps> = ({
	className = "",
	children,
}) => {
	return (
		<div
			className={`nc-SectionHero2ArchivePage relative ${className}`}
			data-nc-id="SectionHero2ArchivePage"
		>
			<div className="absolute inset-y-0 right-0 w-5/6 flex-grow xl:w-3/4">
				<img
					className="absolute inset-0 h-full w-full object-cover"
					src={imagePng}
					alt="hero"
				/>
			</div>
			<div className="relative py-14 ">
				<div className="relative inline-flex">
					<div className="absolute inset-y-0 right-10 w-screen bg-primary-500 md:right-32"></div>
					<div className="relative inline-flex max-w-3xl flex-shrink-0 flex-col items-start space-y-8 py-16 text-white sm:space-y-10 sm:py-20">
						<h2 className="text-4xl font-medium leading-[110%] md:text-5xl xl:text-7xl">
							Tokyo, Jappan
						</h2>
						<div className="flex items-center text-base md:text-lg ">
							<i className="las la-map-marked text-2xl"></i>
							<span className="ml-2.5">Jappan </span>
							<span className="mx-5"></span>
							<i className="las la-home text-2xl"></i>
							<span className="ml-2.5">112 properties</span>
						</div>
					</div>
				</div>
				<div className="mt-10 hidden w-full lg:block">
					<HeroRealEstateSearchForm />
				</div>
			</div>
		</div>
	);
};

export default SectionHero2ArchivePage;
