import React from 'react';
import {useProductsState} from "../context/ProductContext";
import {useFilterState} from "../context/FilterContext";
import GridView from "./GridView";

const ProductList = () => {
    const {filteredProducts:products}=useFilterState()
    if (products.length < 1) {
        return (
            <h5 style={{ textTransform: 'none' }}>
                Sorry, no products matched your search...
            </h5>
        )
    }
    //if (grid_view === false) {
     //   return <ListView products={products} />
   // }
    return <GridView products={products}>product list</GridView>
};

export default ProductList;