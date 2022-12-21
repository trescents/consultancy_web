import React from "react";
import { useHistory } from 'react-router-dom';


function Footer() {


    return (

        <footer className="w-full bg-blue py-8 text-center text-white flex flex-col">
            <h1>All Rights Reserved</h1> 
            <div className='lg:w-1/5 w-1/3 mt-4 mx-auto flex justify-between items-center'>
                <a className=' text-white' href="https://www.linkedin.com/in/trescents/" target="_blank"><i className="fab fa-linkedin lg:text-lg text-base mr-1"></i></a>
                <a className=' text-white' href="https://www.facebook.com/thetrescents" target="_blank"><i className="fab fa-facebook lg:text-lg text-base mr-1"></i></a>
                <a className=' text-white' href="https://www.instagram.com/thetrescents/" target="_blank"><i className="fab fa-instagram lg:text-lg text-base mr-1"></i></a> 
                <div className='h-6 border-l-2 border-white '></div>
                <a className=' text-white' href="mailto:contact@trescents.com" target="_blank"><i className="fas fa-envelope lg:text-lg text-base mr-1"></i></a>
                <a className=' text-white' href="https://wa.me/+923222240336" target="_blank"><i className="fab fa-whatsapp lg:text-lg text-base mr-1"></i></a>  
            </div>

            
        </footer>       

    );
}

export default Footer;