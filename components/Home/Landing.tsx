import React from "react";
import med1 from "@/assets/images/med1.jpg";
import med2 from "@/assets/images/med2.jpg";
import med3 from "@/assets/images/med3.jpg";
import med4 from "@/assets/images/med4.jpg";
import Image from "next/image";
import Link from "next/link";

export const Landing = () => {
  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div>
        <h1 className="text-3xl font-bold text-darkBlue uppercase text-center py-3">
          Uniben Medi-Plus
        </h1>
        <p className="tex-sm md:text-md text-center px-3">
          Empowering Health, Embracing Care; Your Wellness Journey Starts
        </p>
      </div>

      <div className="grid grid-cols-2  gap-3 md:gap-5 mt-4 px-2">
        <div className="w-full md:w-[17rem]">
          <Image
            src={med1}
            width={100}
            height={100}
            alt=""
            className="image_class"
          />
        </div>
        <div className="w-full md:w-[17rem]">
          <Image
            src={med2}
            width={100}
            height={100}
            alt=""
            className="image_class"
          />
        </div>
        <div className="w-full md:w-[17rem]">
          <Image
            src={med3}
            width={100}
            height={100}
            alt=""
            className="image_class"
          />
        </div>
        <div className="w-full md:w-[17rem]">
          <Image
            src={med4}
            width={100}
            height={100}
            alt=""
            className="image_class"
          />
        </div>
      </div>

      <button className="btn mt-4 btn-md btn-neutral inline-block w-3/4 md:w-1/5">
        <Link href={"/dashboard"}>Get Started</Link>
      </button>
    </section>
  );
};
