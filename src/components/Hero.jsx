import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    
    const [currentIndex, setcurrentIndex] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalvideos = 4;
    const nextVideoRef = useRef(null);
    
    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1);
    }
    
    const handleMiniVdClick = () => {
        sethasClicked(true);

        setcurrentIndex(upComingVideoIndex);
    }

    useEffect(()=> {
        if (loadedVideos === totalvideos -1) {
            setisLoading(false);
        }

    })

    const upComingVideoIndex = (currentIndex % totalvideos) + 1;

    useGSAP(() => {
    if(hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' });

        gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 3,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: () => nextVideoRef.current.play(),
        })

        gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 2,
            ease: 'Power1.inOut',


        })
    }    

    }, {dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: 'polygon(28% 0%, 100% 50%, 50% 100%, 0% 50%)',
            borderRadius: "0% 0% 40% 10%",
        });

        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: "#video-frame",
              start: "center center",
              end: "bottom center",
              scrub: true,
            },
        });
    });


    const getVideoSrc = (index) => `videos/link-${index}.mp4`;


   return (
    <div className="relative h-dvh w-screen overflow-x-hidden">


        {isLoading && (
            <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                <div className='three-body'>
                    <div className='three-body__dot'/>
                    <div className='three-body__dot'/>
                    <div className='three-body__dot'/>
                </div>        
            </div>
        )}

        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg blue-75">
            <div>
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                        <video 
                            ref={nextVideoRef}
                            src={getVideoSrc(upComingVideoIndex)}
                            loop
                            muted
                            id="current-video"
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoad}
                        
                        />
                    </div>
                </div>

                <video 
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id="next-video"
                    className="absolute-center invisible absolute z-20 size-64 object-over object-center"
                    onLoadedData={handleVideoLoad}

                />

                <video 
                    src={getVideoSrc(currentIndex === totalvideos - 1 ? 1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    className="absolute left-0 top-0 size-full object-cover object-center"
                    onLoadedData={handleVideoLoad}

                />

            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">zero</h1>

            <div className="absolute left-0 top-0 z-40 size-full">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font hero-heading text-blue-100">from</h1>

                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Check out the latest music <br /> video from the new album!</p>

                    <a href="https://www.youtube.com/watch?v=7F5MKaJMxDc" target="_blank" rel="noopener noreferrer">
                    <Button id="watch-trailer"  title="Watch Video" leftIcon={<TiLocationArrow />} containerClass="bg-pink-500 flex-center gap-1 text-white" />
                    </a>

                </div>
            </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-pink-600">zero</h1>
    </div>
   )
}

export default Hero