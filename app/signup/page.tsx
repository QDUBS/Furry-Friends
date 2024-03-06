import SignUp from "@/components/Auth/SignUp";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign UP",
};
const page = () => {
  return <SignUp />;
};

export default page;
