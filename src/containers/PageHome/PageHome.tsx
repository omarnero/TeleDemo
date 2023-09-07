import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React from "react";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionDowloadApp from "./SectionDowloadApp";
import { useTranslation } from "react-i18next";
import SectionSteps from "containers/PageHome/SectionSteps";
import SectionFeatures from "containers/PageHome/SectionFeatures";
import ScrollableList from "components/SectionSliderNewCategories/section_slider";
import swvel from "images/image 4.png";
import paymob from "images/image 2.png";
import webus from "images/image 6 (1).png";
import skyscanner from "images/image 3.png";
import elgesrElAraby from "images/image 5.png";
import ontimebus from "images/image 8.png";
function PageHome() {
	const { t } = useTranslation();
	return (
		<div className="relative overflow-hidden  bg-[#E8ECF2]">
			{/* GLASSMOPHIN */}
			<BgGlassmorphism />

			<div className="relative mb-24 lg:mb-28 ">
				{/* SECTION HERO */}
				<SectionHero className="pt-10 lg:pt-16 lg:pb-2" />

				<div className="bg-[#1D4179] 
				lg:mt-[100px]
				md:mt-[300px]
				sm:mt-[500px]
				max-sm:mt-[500px]
				

				">
					{/* margin top changes depends on search form  */}
					<div className="container ">
						<SectionFeatures />
					</div>
				</div>

				<div className="mt-[250px] bg-white pt-12 pb-12 
				max-sm:mt-[900px]
				
				">
					<div className="container mr-32 ">
						<h1 className="text-center text-[32px] text-[700] m-3 text-[#1E1E1E]">Our partner</h1>
						<p className="text-center text-[16px] text-[400] mb-[32px]  text-[#69696A]w-[589px]">Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
						
						<ScrollableList items={[swvel,paymob,skyscanner,elgesrElAraby,ontimebus]} />
					</div>
				</div>
				<div className="flex flex-col items-center justify-center  bg-[#E8ECF2] rtl:flex-row-reverse">
					<SectionDowloadApp />
				</div>
				<div
					style={{
						perspective: "1000px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
					className="mt-[12px] sm:mt-[-120px]"
				>
					<div
						className="w-full bg-[#1D4179]"
					>
						<SectionSteps />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PageHome;
