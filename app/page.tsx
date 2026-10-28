"use client";

import { Carousel } from "@/app/ui/carousel";
import fetchWiki from "@/app/lib/fetchWiki";
import { useEffect, useState } from "react";
import { Planets } from "./lib/definitions";

export default function Page() {
  const [planets, setPlanets] = useState<Planets>();
  const [currentSlide, setCurrentSlide] = useState<any>(0);

  const handleSlideChange = (index: any) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await fetchWiki();
        setPlanets(data);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, []);

  return (
    <>
      <div className="flex flex-col px-4 lg:px-16 w-full items-center">
        <div className="w-full lg:w-3/4">
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-full text-start justify-self-center">
              <div className="w-full self-center">
                <Carousel planets={planets} onSlideChange={handleSlideChange} />
              </div>
            </div>
          </div>
          <div className="w-full rounded-md p-4 mb-4 lg:mb-8 bg-gray-950 bg-opacity-50 shadow-[0px_4px_20px_5px_rgba(255,255,255,0.5)]">
            <h1 className="self-start pb-4 text-4xl font-bold">
              {planets?.at(currentSlide)?.title}
            </h1>
            {planets?.at(currentSlide)?.extract}
          </div>
        </div>
      </div>
    </>
  );
}
