import React from "react";
import {isMobile} from 'react-device-detect';
import { useHistory } from 'react-router-dom';


function Header() {

    const [showNav, setshowNav] = React.useState(false);
    const [screenChange, setscreenChange] = React.useState(false);
    const [showdropdown, setshowdropdown] = React.useState(false);
    let history = useHistory();

    React.useEffect(() => {
        if(!isMobile){
            setshowNav(true);
        }
        else{
            setshowNav(false);
        }
    }, [screenChange]);
    
    return (

        <header data-aos="fade-down" data-aos-duration="800" class="bg-transparent absolute top-0 left-0 w-full z-50">
            <nav className="container mx-auto lg:py-10 py-6 lg:px-16 px-6 flex flex-row justify-between items-center w-full">
                <div class="w-1/3 flex justify-start">
                    <div class="logo">
                        <a className="flex flex-col" onClick={()=>{history.push('/');setscreenChange(!screenChange)}}>
                            <img className="lg:w-20 w-16" src="images/logo/trescents_logo.png" alt="Consultancy Logo" />
                            <span className="text-black text-vs mt-0">We make it happen!</span>
                            {/* <h1 className="text-2xl text-black font-semibold">Logo</h1>  */}
                        </a>    
                    </div>
                </div>
                {!showNav ? 
                    <i className="fa-bars fa-solid text-lg text-black lg:hidden z-100" onClick={()=>setshowNav(!showNav)}></i> :
                    <i className="fa-times fa-solid text-lg lg:hidden z-100" onClick={()=>setshowNav(!showNav)}></i>}
                {showNav ?
                    <div className="lg:w-1/3 w-full lg:relative absolute lg:bg-transparent bg-white flex lg:flex-row flex-col justify-between items-center lg:h-auto  lg:text-black text-black top-0 left-0 py-12 lg:py-0 fade-in z-50">
                        <a  onClick={()=>{history.push('/');setTimeout(() => {const PageNode = document.getElementById('about');
                            PageNode.scrollIntoView({behavior: "smooth"});}, 0);setscreenChange(!screenChange)}}>About</a>
                        <a className="lg:mt-0 mt-8" onClick={()=>{history.push('/');setTimeout(() => {const PageNode = document.getElementById('services');
                            PageNode.scrollIntoView({behavior: "smooth"});}, 0);setscreenChange(!screenChange)}}>Services</a>
                        <a className="lg:mt-0 mt-8" onClick={()=>{history.push('/');setTimeout(() => {const PageNode = document.getElementById('journey');
                            PageNode.scrollIntoView({behavior: "smooth"});}, 0);setscreenChange(!screenChange)}}>Journey</a>
                        <a className="lg:mt-0 mt-8" onClick={()=>{history.push('/blogs');setscreenChange(!screenChange)}}>Blogs</a>
                        <a className="lg:mt-0 mt-8" onClick={()=>{history.push('/alerts');setscreenChange(!screenChange)}}>Alerts</a>
                    </div> : null}
                    <div className="w-1/3 lg:flex justify-end hidden">
                        {/* <img className="w-10" src="images/icons/uk_flag.svg" alt="UK Flag" /> */}
                        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-white effect hover:shadow-lg cursor-pointer">
                            <a href="https://wa.me/923363781910" target="_blank"><i class="fa-solid fa-paper-plane text-2xl"></i></a>   
                        </div>
                    </div>
            </nav>
            <div className="fixed right-12 top-8 lg:hidden w-10 h-10 rounded-full flex justify-center items-center bg-white effect hover:shadow-lg cursor-pointer">
                <a href="https://wa.me/923363781910" target="_blank"><i class="fa-solid fa-paper-plane text-2xl"></i></a>   
            </div>
        </header>

    );
}

export default Header;
