import { memo } from 'react';
import { helpers } from '../../helpers';

const RangePriceItem = memo(({ price, startSearchByQueryParams, paramsFilters, setOpen, dimensions }) => {

  const handleFilterProducts = async (price) => {
    await startSearchByQueryParams({ lowPrice: price.min, maxPrice: price.max });
    await paramsFilters({ ...price, type: 1 });
    if (dimensions === 'sm') setOpen(false);
  }

  const minPrice = helpers.priceFormat(price.min);
  const maxPrice = helpers.priceFormat(price.max);

  return (
    <li
      className="hover:text-[#222] text-xs md:text-sm cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
      onClick={() => handleFilterProducts(price)}
    >
      {`${minPrice} - ${maxPrice}`}
    </li>
  );
});

export default RangePriceItem;

RangePriceItem.displayName = 'RangePriceItem';
