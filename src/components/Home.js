import React, { useState } from "react";
import Filter from "./Filter";
import Products from "./Products";
import Cart from "./Cart";
import data from "../data";

function Home() {
  const [item, setItem] = useState(data.products);
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [cartItem, setCartItem] = useState([]);

  const sortProducts = (e) => {
    setSort(e.target.value);
    if (sort === "asc") {
      setItem(data.products.sort((a, b) => (a.id < b.id ? 1 : -1)));
    }
    if (sort === "desc") {
      setItem(data.products.sort((a, b) => (a.id > b.id ? 1 : -1)));
    }
  };

  const filterProducts = (e) => {
    if (e.target.value === "") {
      setBrand(e.target.value);
      setItem(data.products);
    } else {
      setBrand(e.target.value);
      setItem(
        data.products.filter(
          (product) => product.availableBrand.indexOf(e.target.value) >= 0
        )
      );
    }
  };

  const addProducts = (product) => {
    const exist = cartItem.find((elemant) => elemant.id === product.id);
    if (exist) {
      setCartItem(
        cartItem.map((element) =>
          element.id === product.id ? { ...exist, qty: exist.qty + 1 } : element
        )
      );
    } else {
      setCartItem([...cartItem, { ...product, qty: 1 }]);
    }
  };

  const removeProducts = (product) => {
    const exist = cartItem.find((elemant) => elemant.id === product.id);
    if (exist.qty === 1) {
      setCartItem(cartItem.filter((element) => element.id !== product.id));
    } else {
      setCartItem(
        cartItem.map((element) =>
          element.id === product.id ? { ...exist, qty: exist.qty - 1 } : element
        )
      );
    }
  };

  return (
    <div className="container">
      <header>
        <a href="#">فروشگاه آنلاین</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={item.length}
              sortProducts={sortProducts}
              brand={brand}
              filterProducts={filterProducts}
            />
            <Products item={item} addProducts={addProducts} />
          </div>
          <div className="sidebar">
            <Cart cartItem={cartItem} removeProducts={removeProducts} />
          </div>
        </div>
      </main>
      <footer>طراحی و توسعه</footer>
    </div>
  );
}

export default Home;
