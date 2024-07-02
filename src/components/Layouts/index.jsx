import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { Meta } from "../meta/meta";
import Script from "next/script";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({
  children,
  canonical,
  title,
  keywords,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
  robots,
  categories,
  price,
  curren,
  structuredData,
}) => {
  return (
    <>
      <Meta
        title={title}
        keywords={keywords}
        description={description}
        ogTitle={ogTitle}
        ogType={ogType}
        ogUrl={ogUrl}
        ogImage={ogImage}
        robots={robots}
        canonical={canonical}
        price={price}
        curren={curren}
        structuredData={structuredData}
      />
      <NavBar />
      {children}
      <Footer categories={categories} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Script
        id="google-tag-manager"
        src="https://www.googletagmanager.com/gtag/js?id=G-GRWCEYYWSK"
      ></Script>
      <Script
        id="google-data-layer"
        dangerouslySetInnerHTML={{
          __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                 page_path: window.location.pathname,
               });
               `,
        }}
      />

      <Script
        id="google-data-layer"
        dangerouslySetInnerHTML={{
          __html: `
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                 page_path: window.location.pathname,
               });
               `,
        }}
      />
    </>
  );
};

export default Layout;
