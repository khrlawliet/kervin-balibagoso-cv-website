import React, { useEffect, useState } from "react";
import './Footer.css';

const Footer = ({ data }) => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    if (data) {
      setSocials(data.social);
    }
  }, [data]);

  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            {socials.map((network) => (
              <li key={network.name}>
                <a href={network.url}>
                  <i className={network.className}></i>
                </a>
              </li>
            ))}
          </ul>
          <ul className="copyright">
            <li>
            &copy;{new Date().getFullYear()} | KaiBal Tech | All right reserved
            </li>
           
          </ul>
        </div>
        <div id="go-top">
          <a className="smoothscroll" title="Back to Top" href="#home">
            <i className="icon-up-open"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
