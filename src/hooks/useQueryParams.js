import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addFiltersPerProducts, clearAll, startFilterProducts } from "../actions/productsAction";
import { helpersProducts } from "../helpers";
import { params } from "../staticData/queryParams";

export const useQueryParams = (endpoint, { router }) => {
  const { getQueryParams, filterSearch } = helpersProducts;

  const dispatch = useDispatch();

  const [queryParams, setQueryParams] = useState("");

  const paramsFilters = (filter) =>{
    dispatch(addFiltersPerProducts(filter));
  }

  const startSearchByQueryParams = (param) => {
    const paramIsValid = params.find((p) => p === Object?.keys(param)[0]);

    if (!paramIsValid) {
      router.push(
        {
          pathname: router.path,
        },
        undefined,
        { shallow: true }
      );
    }

    filterSearch({ router, param });
  };

  const starClearQueryParams = async (endpoint) => {
    if(router.query.hasOwnProperty('url')) {
      router.push({
        pathname: router.route,
        query: { url: router.query.url },
      }, undefined, { shallow: true })
    }else{
      router.push(
        {
          pathname: router.path,
        },
        undefined,
        { shallow: true }
      );
    }
    await dispatch(startFilterProducts(endpoint));
    await dispatch(clearAll());
  };

  useEffect(() => {
    if (router.query) {
      const queries = getQueryParams(router.asPath);
      dispatch(startFilterProducts(endpoint, queries));
      setQueryParams(queries);
      return;
    }
  }, [router.asPath]);

  return { queryParams, startSearchByQueryParams, starClearQueryParams, paramsFilters };
};