import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
function Footer() {
  return (
    <section className="relative overflow-hidden py-8 bg-slate-800 border border-t-2 border-t-black ">
      <div className="relative z-10 mx-auto max-w-7xl px-4 flex justify-between">
        <div className="mb-4 inline-flex text-white items-center">
          <Logo width="100px" />
        </div>
        <div>
          <p className="text-sm text-gray-300">
            &copy; Copyright 2023. All Rights Reserved by DevUI.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
