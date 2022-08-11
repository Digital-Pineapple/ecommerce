
const SubcategoryItem = ({ subcategory, startSearchByQueryParams, paramsFilters, setLoading }) => {


  const handleFilterProducts = async (subcategory) =>{
    await startSearchByQueryParams({subcategory_id: subcategory._id});
    await paramsFilters(subcategory);
  } 

  return (
    <li
      className="hover:text-[#222] cursor-pointer mr-2 mt-2 transition-all duration-500 ease-out text-base text-gray-400 ml-6"
      onClick={() => handleFilterProducts(subcategory)}
    >
      {subcategory.name}
    </li>
  );
};

export default SubcategoryItem;
