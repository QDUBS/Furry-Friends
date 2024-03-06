import Table from "@/components/Admin/Table";
import React from "react";

const page = () => {
  return (
    <section className="container mx-auto mt-3 px-2">
      <h1 className="font-bold text-3xl py-2">Welcome, Admin</h1>
      <Table />
    </section>
  );
};

export default page;
