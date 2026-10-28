"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Planets } from "@/app/lib/definitions";

interface EmblaCarouselProps {
  planets: Planets | undefined;
  onSlideChange: (index: any) => void;
}

export function Carousel({ planets, onSlideChange }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const logEmblaEvent = (
    emblaApi: EmblaCarouselType,
    eventName: EmblaEventType,
  ): void => {
    onSlideChange(emblaApi?.selectedScrollSnap());
  };

  emblaApi?.on("select", logEmblaEvent);

  return (
    <div className="embla flex flex-row w-full justify-between">
      <button
        className="embla__prev w-12 h-12 border-2 rounded-full self-center"
        onClick={() => {
          emblaApi?.scrollPrev();
          onSlideChange(emblaApi?.selectedScrollSnap());
        }}
      >
        <ChevronLeftIcon />
      </button>
      <div
        className="embla__viewport overflow-hidden w-100 lg:w-175"
        ref={emblaRef}
      >
        <div className="embla__container flex touch-pan-y touch-pinch-zoom">
          {planets?.map((planet, index) => (
            <div className=" flex-[0_0_100%] min-w-fit" key={index}>
              <div className="flex w-100 h-100 lg:w-175 lg:h-175 justify-center items-center">
                <div className="flex w-50 h-50 lg:w-100 lg:h-100 rounded-full overflow-hidden bg-black justify-center shadow-[0px_0px_25px_25px_rgba(0,0,0,0.8)] lg:shadow-[0px_0px_75px_50px_rgba(0,0,0,0.8)]">
                  <Image
                    className="my-auto"
                    src={planet.originalimage.source}
                    alt={planet.title}
                    width={planet.originalimage.width}
                    height={planet.originalimage.height}
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="embla__next w-12 h-12 border-2 rounded-full self-center"
        onClick={() => {
          emblaApi?.scrollNext();
          onSlideChange(emblaApi?.selectedScrollSnap());
        }}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
