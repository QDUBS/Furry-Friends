"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user, pathname]);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, []); // eslint-disable-line
  return (
    <header className="navbar bg-white shadow-md">
      <Container>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-3xl text-darkBlue">
            <Link href={"/"}>
              <Image
                src={logo}
                width={30}
                height={30}
                alt="logo"
                className="w-[3rem]"
              />
            </Link>
          </h1>
          <nav className="">
            {isLoggedIn ? (
              <Link href={"/dashboard"} className="btn btn-neutral">
                <FaUser color="white" size={20} />
              </Link>
            ) : (
              <ul className="flex justify-between items-center gap-10">
                <li className="btn btn-primary">
                  <Link href={"signup"}>Sign Up</Link>
                </li>
                <li className="btn btn-secondary">
                  <Link href={"signin"}>Sign in</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
