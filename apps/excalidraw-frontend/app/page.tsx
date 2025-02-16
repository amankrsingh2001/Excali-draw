import Link from "next/link";
import DisplayCard from "./components/DisplayCard";
import { Brush } from "lucide-react";
import { CardDetails } from "@/utils/CardDetails";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      {/* navbar */}
      <div className="absolute inset-x-0 top-[20px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-20 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotted-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
            >
              <circle cx="4" cy="4" r="1.5" fill="currentColor" />
              <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              <circle cx="28" cy="28" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotted-pattern)"></rect>
        </svg>
      </div>
      {/* navbar */}
      <div className="h-[9vh] w-full flex justify-between border-b-2 sticky top-0 z-50 opacity-90 bg-white px-6 lg:px-24">
        <div className="flex gap-2 lg:justify-center my-auto">
          <svg width="30" height="30" viewBox="0 0 24 24" className="my-auto">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="black" />
                <stop offset="100%" stopColor="orange" />
              </linearGradient>
            </defs>
            <Brush stroke="url(#gradient)" />
          </svg>
          <h1 className="sm:text-md lg:text-2xl font-bold bg-gradient-to-r from-[#28282B] to-orange-500  text-transparent bg-clip-text">
            DrawTogether
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-900 hidden md:block hover:text-gray-900 font-[500]"
          >
            Features
          </Link>

          <Link
            href="/"
            className="text-gray-900 hidden md:block hover:text-gray-900 font-[500]"
          >
            Pricing
          </Link>

          <Link href={"/signup"}>
            <button className="text-sm lg:text-md bg-gradient-to-r from-black to-orange-500 px-2 py-2 lg:px-5 lg:py-2  text-white rounded-md hover:opacity-90 font-serif">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Hero section */}

      <div className="h-[30vh] md:h-[45vh]  lg:h-[40vh] mt-12 flex flex-col items-center ">
        <h1 className="text-2xl md:text-5xl w-[80%] text-center font-bold mb-6 mt-4 bg-gradient-to-r from-[#28282B] to-orange-500 text-transparent bg-clip-text">
          Collaborate and Create in Real-Time{" "}
        </h1>
        <p className="text-sm md:text-xl w-[80%]  lg:w-[38%] text-center text-gray-700 font-medium">
          DrawTogether brings your team's ideas to life with our powerful
          collaborative drawing tool. Sketch, design, and innovate together, no
          matter where you are.
        </p>

        <button className="bg-gradient-to-r font-bold text-sm md:text-lg mt-12 from-black to-orange-500 px-4 py-2 md:px-8 md:py-3 text-white rounded-md hover:shadow-xl">
          Start Drawing Now
        </button>
      </div>

      {/* cardSection */}
      <div className=" lg:h-[36vh] flex flex-col md:flex-row justify-center items-center gap-12">
        {CardDetails.map((card) => {
          return (
            <DisplayCard
              heading={card.heading}
              description={card.description}
              icon={card.icon}
            />
          );
        })}
      </div>

      {/* second section */}

      <div className=" w-full h-[20vh] md:min-h-[30vh] mt-12 flex flex-col items-center ">
        <h1 className="text-lg md:text-3xl font-extrabold mb-6 mt-2 bg-gradient-to-r from-[#28282B] to-orange-500 text-transparent bg-clip-text">
          Ready to bring your ideas to life?
        </h1>
        <button className="bg-gradient-to-r font-bold text-sm md:text-lg mt-2 md:mt-4 from-[#28282B] to-orange-500 px-4 py-2 md:px-8 md:py-3 text-white rounded-md hover:shadow-lg">
          Get Started For Free
        </button>
      </div>
    </div>
  );
}
