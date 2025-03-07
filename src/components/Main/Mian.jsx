import React from "react";
import Notice from "./Notice/Notice";
import Categories from "./Categories/Categories";
import ProductsOfferSec from "./LazyloadImage/ProductsOfferSec";
import CustomerCat from "./Cumtomer/CustomerCat";
import ProductList from "./Products/ProductList";
import ContainerCustomer from "./ContainerCustomer/ContainerCustomer";
import MoshaverCustomer from "./ContainerCustomer/MoshverCustomer";
import SwipperBrands from "./SwipperBrands/SwipperBrands";
import { Articles } from "./ArticleHomePage/Articles";
import AmazingSlider from "../Header/Navbar/Carousel";
function Mian() {
  return (
    <div>
      <div className="App">
        <main>
          <AmazingSlider />
        </main>
      </div>
      <Notice />
      <Categories />
      <ProductsOfferSec />
      <CustomerCat />
      <ProductList />
      <ContainerCustomer />
      <MoshaverCustomer />
      <SwipperBrands />
      <Articles />
    </div>
  );
}

export default Mian;
