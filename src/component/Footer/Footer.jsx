import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
function Footer() {
  return (
    <section className="relative overflow-hidden py-4 bg-slate-800">
      <div className="relative z-10 mx-auto max-w-7xl px-4 flex items-center justify-between">
        <div className="mb-4 inline-flex text-white items-center">
          <Logo width="100px" />
        </div>
        <div>
          <p className="text-sm text-gray-300">
            &copy; Copyright 2025. All Rights Reserved by DevUI.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
