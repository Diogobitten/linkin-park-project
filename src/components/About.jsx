import { useGSAP } from '@gsap/react';
import React from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Animatedtitle from './Animatedtitle';
import { FaSpotify, FaApple } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // Animação de clip path
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Animação para a imagem about2.jpg e o texto
    gsap.to(".about-webp", {
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      scale: 1/3,
      duration: 0.5,
      transform: "translate(-50%, -50%)",
      borderRadius: 20,
      delay: 0.8,
    });

    // Animação para o texto abaixo da imagem
    gsap.to(".about-text", {
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.2,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[14px]">
          Linkin Park | New album
        </h2>

        <Animatedtitle
          title="Rising From Zero <br /> to Redefine Music"
          containerClass="mt-5 !text-black text-center justify-center"
        />

        <div className="about-subtext">
          <p>Available now on </p>
          <p className="flex items-center justify-center gap-2">
            <FaSpotify className="text-green-500" size={36} /> |
            <FaApple className="text-black" size={36} />
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          {/* Primeira imagem */}
          <img
            src="img/about1.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />

          {/* Segunda imagem */}
          <img
            src="img/about2.jpg"
            alt="Background"
            className="absolute left-1/2 top-1/2 size-fit object opacity-0 scale-0 about-webp"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Texto abaixo da imagem */}
          <p
            className="about-text absolute left-1/2 top-[70%] opacity-0 text-white text-center text-lg font-bold transform -translate-x-1/2 translate-y-10"
          >
            Linkin Park • From Zero
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
