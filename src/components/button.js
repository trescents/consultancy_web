import React from "react";


function Button({title, onClick, type, href, target}) {


    if(type == 'anchor'){

        return (

            <a href={href} target={target} className="rounded-r-lg rounded-bl-lg px-6 py-3 text-center bg-btn text-white transition-all z-50">{title}            
            </a>       
    
        );

    } else{

        return (

            <button onClick={onClick} className="rounded-r-lg rounded-bl-lg w-full py-3 text-center bg-btn text-white transition-all z-50">{title}            
            </button>       
    
        );
        
    }
    
}

export default Button;