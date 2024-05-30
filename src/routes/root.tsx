import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "./footer";

export default function RootPage() {

  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

