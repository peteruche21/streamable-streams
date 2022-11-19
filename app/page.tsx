import Image from "next/image";
import EventCard from "../components/Cards/EventCard";
import Carousel from "../components/Carousel/Carousel";
import Personalize from "../components/Categories/Categories";
import Tab from "../components/Tab/Tab";
import TCB from "../components/ThreeColourBalls";

export default function Home() {
  return (
    <div>
      <Carousel />
      <div className="mx-auto px-5 py-10 container relative">
        <TCB />
        <Tab />
        <Personalize />
        <div className="flex w-full flex-wrap content-center justify-evenly gap-8">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((el) => {
            return (
              <div key={el}>
                <EventCard />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
