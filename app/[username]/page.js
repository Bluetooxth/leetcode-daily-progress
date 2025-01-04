"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { MdDownload } from "react-icons/md";
import html2canvas from "html2canvas";
import Link from "next/link";
import { Fira_Code } from "next/font/google";

const font = Fira_Code({
  weights: [400],
  subsets: ["latin"],
});

const UsernameProgress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();

  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await axios.get(`/api/fetch?username=${username}`);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  useEffect(() => {
    if (username) {
      setLoading(true);
      handleFetch();
      setLoading(false);
    }
  }, [username]);

  const handleDownload = () => {
    const element = document.getElementById("progress-card");
    const images = element.querySelectorAll("img");

    let loadedImages = 0;

    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            html2canvas(element, { useCORS: true }).then((canvas) => {
              const link = document.createElement("a");
              link.download = `${username}_progress.png`;
              link.href = canvas.toDataURL("image/png");
              link.click();
            });
          }
        };
      }
    });

    if (loadedImages === images.length) {
      html2canvas(element, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${username}_progress.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen">
      <div className="flex flex-col justify-start items-center w-[95vw] sm:max-w-[400px] mt-24">
        <div id="progress-card" className={font.className}>
          <div className="flex flex-col justify-center items-start w-full border-t-4 border-t-orange-500 rounded-md bg-zinc-800">
            <h1 className="text-2xl text-gray-200 p-5 self-center text-center">
              {username} Leetcode Progress
            </h1>
            <span className="w-full h-[1px] bg-gray-400"></span>
            {loading && <p>{`Loading...`}</p>}
            {error && <p className="text-red-500">{error.message}</p>}
            {data && (
              <div className="flex flex-col justify-start items-start w-full">
                <p className="p-2 text-md text-center self-center text-gray-200">
                  Solved on {new Date().toLocaleDateString()}
                  <span>{`: `}</span>
                  {data.solvedToday}
                </p>
                <span className="w-full h-[1px] bg-gray-400"></span>
                <ul className="p-5 flex flex-col justify-start items-start w-full gap-2">
                  {data.problems.map((problem, index) => (
                    <li
                      className={`text-md flex gap-2 ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                      key={`${problem.title}-${index}`}
                    >
                      <GoDotFill className="mt-1" /> {problem.title} (
                      {problem.difficulty})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <span className="w-full h-[1px] bg-gray-400"></span>
            <Link
              href="https://github.com/bluetooxth/leetcode-daily-progress"
              className="self-center"
            >
              <p className="text-sm py-2 text-gray-200 text-center hover:underline">
                {`https://lc-daily.vercel.app`}
              </p>
            </Link>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all duration-300 ease-in-out border-2 border-orange-500 text-lg font-medium flex justify-center items-center gap-2 mt-5 self-start"
        >
          Download <MdDownload />
        </button>
      </div>
    </section>
  );
};

export default UsernameProgress;
