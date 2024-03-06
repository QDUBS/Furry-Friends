import DashBoardNavBar from "@/components/Dashboard/NavBar";
import Container from "@/components/shared/Container";
import { ContextProvider } from "@/context/Context";
import { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <section className="px-1">
        <DashBoardNavBar />
        <main className="mt-7">{children}</main>
      </section>
    </ContextProvider>
  );
}
