import { useState } from "react";
import "../index.css";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className=" bg-green-50 h-15 align-top block">
            <h2 className="text-2xl text-black text-left " style={{
              marginLeft : '1.3rem', paddingTop:'0.7rem' , fontWeight:"50px", fontFamily:'Playwrite DE SAS'
            }} >TaskMasters</h2>
            <button className="fixed top-2 right-35 h-11 z-50 login-button"style={{
              backgroundColor:'gray' , color : 'black' , fontSize:'18px',paddingBottom:'20px' ,paddingLeft: '15px' ,paddingRight: '15px'
            }}>log in</button>
            <button className="fixed top-2 right-8 h-11 bg-gray-500 z-50" style={{
              
            }}>Sign in</button>
        </div>
    </nav>
  );
}

export default Navbar;
