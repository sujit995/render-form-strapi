import React from 'react';
import '../styles/footer.css';


export const  Footer:React.FC=():JSX.Element=> {
  return (
    <footer className="app__footer">
        <div className="footer__link">
            <a href="https://www.google.com/">Render Home Page</a>
        </div>
        <div className="footer__content">
            Jobs powered by
            <img src="https://jobs.lever.co/img/lever-logo-full.svg" alt="lever logo" className="lever-logo" />
        </div>
  </footer>
  );
}