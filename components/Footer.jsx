import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full bg-zinc-800">
      <div className="flex justify-center items-center w-[95vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw] px-2 py-2 md:px-0 gap-2">
        <p className="text-md text-white flex justify-center items-center space-x-2">
          <span>Developed by</span>
          <Link
            href="https://github.com/bluetooxth"
            className="text-orange-500 underline"
          >
            Priyanshu
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
