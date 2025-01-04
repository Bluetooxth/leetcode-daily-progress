import React from "react";
import Link from "next/link";
import { SiLeetcode } from "react-icons/si";
import { RiGithubFill } from "react-icons/ri";
import { Fira_Code } from "next/font/google";

const font = Fira_Code({
  weights: [400],
  subsets: ["latin"],
});

const Nav = () => {
  return (
    <nav className="flex justify-center items-center w-full bg-zinc-900 py-2 text-zinc-300 sticky top-0 left-0 z-50 bg-opacity-70 backdrop-blur-sm">
      <div className="flex justify-between items-center w-[95vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw] px-2 md:px-0 gap-2">
        <Link
          href="/"
          className="text-xl font-medium flex justify-center items-center gap-2"
        >
          <SiLeetcode className="inline-block text-orange-500" />
          <p className={font.className}>LcDaily</p>
        </Link>
        <div className="flex justify-end items-center gap-2">
          <Link
            href="https://github.com/bluetooxth/leetcode-daily-progress"
            className="py-1 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all duration-300 ease-in-out border-2 border-orange-500 text-lg font-medium flex justify-center items-center gap-2"
          >
            Github <RiGithubFill className="inline-block" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
