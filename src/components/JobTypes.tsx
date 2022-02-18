import React from 'react';
import '../styles/jobtypes.css';


export const JobTypes:React.FC=():JSX.Element=>{
    return(
        <div className="contain">
            <h2 style={{fontSize:'36px',color:'#515357', textAlign:'left'}}>
                Full-Stack Engineer
            </h2>
            <p style={{color:'#808080'}}>
            REMOTE OPTIONAL /PRODUCT – ENGINEERING /FULL-TIME
            </p>
        </div>
    )
}