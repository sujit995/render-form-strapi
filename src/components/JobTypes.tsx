import React from 'react';
import '../styles/jobtypes.css';


export const JobTypes:React.FC=():JSX.Element=>{
    return(
        <div className="col-lg-8 contain">
            <div className="col-lg-6">
            <h2 style={{fontSize:'36px',color:'#515357', textAlign:'left'}}>
                Full-Stack Engineer
            </h2>
            </div>
            <div className="col-lg-8 pt-3">
            <p style={{color:'#808080', fontWeight: 'bold', fontSize:'15px', letterSpacing: '2px'}}>
            REMOTE OPTIONAL /&nbsp;&nbsp;PRODUCT – ENGINEERING /&nbsp;&nbsp;FULL-TIME
            </p>
            </div>
        </div>
    )
}