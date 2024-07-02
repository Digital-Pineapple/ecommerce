import { memo } from "react";

import { useRouter } from "next/router";
import { ProductSlider } from "./";
import { useQueryParams } from "../../hooks/useQueryParams";
import LoadingScreen from "../LoadingScreen";

import { FixedSizeList as List } from "react-window";

const endpoint = "/brands/with/categories";

const ProductsArea = memo(({ products }) => {
  const router = useRouter();

  const { startSearchByQueryParams, loading } = useQueryParams(endpoint, {
    router,
  });

  const searchByCategory = async (brand_id, category_id) => {
    await startSearchByQueryParams({ brand_id, category_id });
  };
  //   470 producto en precio distribuidor
  // 75 pesos en la foto
  return (
    <>
      {loading && <LoadingScreen />}
      <section className="bg-luz pb-8 px-2  md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
        <button
          style={{
            color: "white",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "50%",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <a
            href="https://wa.me/7293222418?text=Hola, estoy interesado en adquirir productos de su marca. ¿Podría proporcionarme más detalles para realizar mi compra? ¡Gracias! "
            target="blank"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2111/2111728.png"
              style={{
                width: "50px  ",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                bottom: "20px",
                right: "20px",
              }}
            />
          </a>
        </button>
        <div className="w-full mx-auto">
          {products?.brands?.map(({ _id, name, categories, products, url }) => (
            <ProductSlider
              key={_id}
              brand_id={_id}
              name={name}
              categories={categories}
              products={products}
              search={searchByCategory}
              brand_url={url}
            />
          ))}
        </div>
      </section>
    </>
  );
});

export default ProductsArea;

ProductsArea.displayName = "ProductsArea";
