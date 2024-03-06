import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <main className="container mx-auto">{children}</main>;
};

export default Container;
