import React from "react";

const OfferComponent = ({ sliders }) => {
  return (
    <section className="bg-luz pb-8 px-2 md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
      <div className="w-full mx-auto">
        <h1>Nuestras ofertas</h1>
        {sliders.map((sl) => (
          <image src={sl.imageWeb} />
        ))}
      </div>
    </section>
  );
};

export default OfferComponent;
