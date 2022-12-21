import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';


function Journey() {


    return (
        
        <section className='container mx-auto min-h-screen lg:px-16 px-6 pt-28'>
            <h1 className='text-center lg:text-5xl text-3xl my-10'>Customer Journey</h1>
          
            <img className='absolute w-24 top-1/3 right-10 z-0' src="images/icons/spiral.svg" alt="" />
            <img className='absolute w-1/5 lg:bottom-20 bottom-32 left-0 z-minus' src="images/icons/cloud_sm.svg" alt="" />
        </section>
    );
  
}
  
export default Journey;