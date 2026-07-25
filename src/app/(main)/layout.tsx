import Header from "@/src/components/layouts/Header";
import Footer from "@/src/components/layouts/Footer";
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