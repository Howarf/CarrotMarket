import Header from "../../component/Header";
import Footer from '../../component/Footer';
import { Outlet, Route, Routes } from "react-router-dom";

export default function View(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}