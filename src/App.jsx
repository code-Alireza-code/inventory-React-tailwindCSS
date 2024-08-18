import { useEffect, useState } from "react";
import "./App.css";
import CategoryForm from "./components/Category";
import Navbar from "./components/Navbar";
import ProductsForm from "./components/Products";
import { Toaster } from "react-hot-toast";
import ProductList from "./components/ProductList";
import Filters from "./components/Filters";

// const products = [
//   {
//     id: 1,
//     title: "React.js",
//     category: "frontend",
//     createdAt: "2024-05-17T05:02:20.745Z",
//   },
//   {
//     id: 2,
//     title: "Next.js",
//     category: "frontend",
//     createdAt: "2024-06-17T05:02:20.745Z",
//   },
//   {
//     id: 3,
//     title: "Node.js",
//     category: "backend",
//     createdAt: "2024-07-17T05:02:20.745Z",
//   },
// ];
// const categories = [
//   {
//     id: 1,
//     title: "frontend",
//     description: "developing frontend",
//     createdAt: "2024-02-17T05:02:20.745Z",
//   },
//   {
//     id: 2,
//     title: "backend",
//     description: "developing backend",
//     createdAt: "2024-01-17T05:02:20.745Z",
//   },
// ];

// data flow => products + categories
// storage => save datas to locaStorage
// context API ?? ...

function App() {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || []
  );
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("latest");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSort = (e) => {
    setSort(e.target.value);
    let sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      if (e.target.value === "latest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (e.target.value === "earliest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const handleSortCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const value = e.target.value.trim().toLowerCase();
    const searchedProducts = products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    setFilteredProducts(searchedProducts);
  };

  const filterSearchTitle = (array) => {
    return array.filter((p) =>
      p.title.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  };

  const sortDate = (array) => {
    return [...array].sort((a, b) => {
      if (sort === "latest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "earliest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  };

  const filterSelectedCategory = (array) => {
    if (!selectedCategory) return array;
    return array.filter((item) => item.categoryId == selectedCategory);
  };

  useEffect(() => {
    let result = products;
    result = filterSearchTitle(result);
    result = filterSelectedCategory(result);
    result = sortDate(result);
    setFilteredProducts(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, products, sort, selectedCategory]);

  // # localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <div>
      <Toaster />
      <div className="bg-slate-800 min-h-screen">
        <Navbar products={products} />
        <div className="container max-w-screen-sm mx-auto p-4">
          <CategoryForm setCategories={setCategories} />
          <ProductsForm setProducts={setProducts} categories={categories} />
          <Filters
            onSort={handleSort}
            onSearch={handleSearch}
            searchValue={searchValue}
            sort={sort}
            categories={categories}
            onSelectCategory={handleSortCategory}
            sortCategory={selectedCategory}
          />
          <ProductList
            products={filteredProducts}
            categories={categories}
            setProducts={setProducts}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
