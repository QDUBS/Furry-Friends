import SignIn from "@/components/Auth/SignIn";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Sign in",
};
const page = () => {
  return <SignIn />;
};

export default page;
