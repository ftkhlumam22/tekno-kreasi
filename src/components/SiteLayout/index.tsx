import React, { ReactNode } from "react";
import { Navbar } from "@components";
import Footer from "@/modules/layout-2/components/footer";

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#fffaf4] pt-[76px] text-[#1f2937]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default SiteLayout;
