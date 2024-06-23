import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useEffect } from "react";

export default function RootPage() {
  const navigate = useNavigate()

  useEffect(()=>{
    navigate("/users")
  },[navigate])

  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

