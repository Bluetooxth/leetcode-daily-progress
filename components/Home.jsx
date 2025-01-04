"use client";
import React, { useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [username, setUsername] = useState("");

  const router = useRouter();

  const handleGetProgress = () => {
    if (username) {
      router.push(`/${username}`);
    }
  };

  return (
    <section className="flex flex-col items-center justify-start h-screen">
      <div className="flex flex-col justify-start items-center w-[95vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw] mt-24">
        <h2 className="text-4xl font-medium text-white text-center flex flex-wrap justify-center items-center space-x-1">
          <span>Leetcode</span>
          <span className="text-orange-500">
            <SiLeetcode />
          </span>
          <span>Daily</span>
          <span>Progress</span>
        </h2>
        <div className="flex flex-col justify-between items-center w-full max-w-xl mt-8 gap-3">
          <input
            type="text"
            name=""
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Leetcode username"
            className="p-2 rounded-md outline-none border-2 border-gray-800 bg-transparent focus:border-gray-400 transition-all duration-300 ease-in-out text-md w-full"
          />
          <button
            onClick={handleGetProgress}
            className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all duration-300 ease-in-out border-2 border-orange-500 text-lg font-medium flex justify-center items-center gap-2 mt-5 w-full"
          >
            Get progress <SiLeetcode className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
