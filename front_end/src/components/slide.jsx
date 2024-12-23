import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/react/24/solid'

const Slide = () => {
	//Array of Images
	const images = [
		'https://skin1004korea.com/web/upload/210705/collection03/220801_collection03_img04.png',
        'https://skin1004korea.com/web/upload/210705/collection/220809_collection_img04.png',
        'https://skin1004korea.com/web/upload/210705/collection02/220809_collection02_img01.png',
		
	];
	
	//These are custom properties for zoom effect while slide-show
	const zoomInProperties = {
		scale: 1,
		duration: 1600,
		transitionDuration: 400,
		infinite: true,
		prevArrow: (
			<div className="ml-10 top-40 md:top-72">
				<ArrowLeftIcon className="h-8 w-8 text-white cursor-pointer" />
			</div>
		),
		nextArrow: (
				<div className="mr-10 top-40 md:top-72">
				   <ArrowRightIcon className="h-8 w-8 text-white cursor-pointer" />
			    </div>
		),
	};
	return (
		<div className="w-full h-screen">
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
					<div key={index} className="flex items-start w-screen h-screen relative">
						<img
							className="w-1/2"
							src={each}
						/>
                        
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slide;