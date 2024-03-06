import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";
const DashBoardNavBar = () => {
  return (
    <div className="drawer w-['60%'] z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <IoMenu />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4  w-[80%] md:w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link href={"/dashboard"}>Profile</Link>
          </li>
          <li>
            <Link href={"/dashboard/appointments"}>Appointments</Link>
          </li>

          <li>
            <Link href={"/dashboard/update-profile"}>Update Profile</Link>
          </li>
          <li>
            <Link href={"/dashboard/new"}>Book new appointments</Link>
          </li>

          <li>
            <button className="btn btn-secondary ml-5 mt-5 flex flex-col items-center justify-center w-[5rem]">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardNavBar;
