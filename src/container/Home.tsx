import React from 'react';
import { Footer } from '../components/Footer';
import Form from '../components/Form';
import Header from '../components/Header';
import { JobTypes } from '../components/JobTypes';

export const Home:React.FC=():JSX.Element=>{
    return(
        <>  
          <Header /> 
          <JobTypes />
          <Form />
          <Footer />
        </>
        
    )
}