import Link from "next/link";
import React from "react";

const Navigation = ({
  text,
  link,
  linkText,
}: {
  text: string;
  linkText: string;
  link: string;
}) => {
  return (
    <div className="flex flex-row justify-center items-center text-white mt-5 relative z-10 gap-3 font-semibold ">
      <p>{text}</p>
      <Link href={link} className="text-lightBlue">
        {linkText}
      </Link>
    </div>
  );
};

export default Navigation;
