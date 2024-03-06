import Profile from "@/components/Auth/Profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create profile",
};

const page = () => {
  return <Profile />;
};

export default page;
