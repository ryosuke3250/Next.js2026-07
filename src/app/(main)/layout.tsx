import Header from "@/src/common/components/layouts/Header";
import Footer from "@/src/common/components/layouts/Footer";
import React from "react";

export default function MainLayout({
  children,
}:{
  children: React.ReactNode
}){
  return(
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}