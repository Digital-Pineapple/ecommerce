import { useSelector } from "react-redux";
import { Slide } from "react-slideshow-image";
import styles from "./Slideshow.module.css";

export const Slider = ({ sliders }) => {
  // const { sliders } = useSelector((state) => state.sliders);
  const properties = {
    duration: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="bg-luz pb-8 px-2 md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
      {" "}
      {sliders && (
        <Slide {...properties}>
          {sliders.map((slideImage, index) => (
            <div className={styles["each-slide"]} key={index}>
              <div
                style={{
                  backgroundImage: `url(${slideImage.imageWeb})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
      )}
    </section>
  );
};
