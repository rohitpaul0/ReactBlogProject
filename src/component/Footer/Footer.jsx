import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
function Footer() {
  return (
    <section className="relative w-full h-[10vh] bottom-0 border-t  border-gray-500 overflow-hidden  bg-[var(--navbar-bg)]">
      
      <div className="relative z-10 mx-auto h-full max-w-7xl px-4 flex items-center justify-between">
        <div className="inline-flex text-white text-center">
          <Logo width="100px" />
        </div>
        <div className="text-sm font-bold text-white">
          &copy; Copyright{" "}
          <a
            href="https://rohitpaul.netlify.app/"
            className="pl-1 text-[var(--secondary-color)]"
          >
            Rohit
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
