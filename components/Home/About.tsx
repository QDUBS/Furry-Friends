import Image from "next/image";
import React from "react";
import sthetoscope from "@/assets/images/stethoscope.jpg";
import Link from "next/link";
const About = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center mt-7 bg-neutral text-white">
      <div className="w-full px-2 py-4 md:pl-10 text-center md:text-left">
        <h3 className="text-xl md:text-3xl  mb-4 font-semibold">
          Student Health is our priority
        </h3>
        <p className=" text-center md:text-left text-md md:text-xl md:leading-8">
          Welcome to Uniben Medi-Plus, where your well-being is our priority.
          Established with a commitment to exceptional healthcare, we are a
          dedicated team of medical professionals striving to provide
          personalized and compassionate services.
        </p>
        <button className="btn btn-md btn-primary mt-4">
          <Link href={"/about"}>Read more</Link>
        </button>
      </div>

      <div className="w-full">
        <Image
          src={sthetoscope}
          width={200}
          height={200}
          alt="sthetoscope"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default About;
