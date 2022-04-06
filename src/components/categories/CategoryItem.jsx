import { useRouter } from 'next/router';

import { useDispatch, useSelector } from "react-redux";

import { startLoadProductsPerCategory } from '../../actions/productsAction';
import { helpersProducts } from '../../helpers';

const CategoryItem = ({ category }) => {

    const { filterSearch } = helpersProducts;

    const { filters } = useSelector(state => state.products);

    const router = useRouter();

    const dispatch = useDispatch();

    const filterToCategory = (category) => {

        const categoriesInFilter = filters.find(categorySelected => categorySelected._id === category._id);

        if (!categoriesInFilter) {
            dispatch(startLoadProductsPerCategory(category));
            filterSearch({ router, category: category._id })
        }

    }

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => filterToCategory(category)}
        >
            <p>{category.name} ({category.totalProducts})</p>
        </li>
    )
}

export default CategoryItem