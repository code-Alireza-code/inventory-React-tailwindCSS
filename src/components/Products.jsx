import { useState } from "react";
import toast from "react-hot-toast";

function ProductsForm({ categories, setProducts }) {
  const [productsFormData, setProductsFormData] = useState({
    title: "",
    quantity: "",
    categoryId: "",
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProductsFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      !productsFormData.categoryId ||
      !productsFormData.quantity ||
      !productsFormData.title
    ) {
      toast.error("please fill all fields");
      return;
    }

    const newProduct = {
      ...productsFormData,
      id: Date.now(),
      createAt: new Date().toISOString(),
    };
    setProducts((prevData) => [...prevData, newProduct]);
    setProductsFormData({
      categoryId: "",
      title: "",
      quantity: "",
    });
  };

  return (
    <div className="mb-6 ">
      <h2 className="text-xl text-slate-300 font-bold mb-2">Add New Product</h2>
      <form
        onSubmit={handleAddProduct}
        className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4"
      >
        <div>
          <label htmlFor="product-title" className="block mb-1 text-slate-400">
            title
          </label>
          <input
            type="text"
            name="title"
            id="product-title"
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            autoComplete="off"
            value={productsFormData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="product-quantity"
            className="block mb-1 text-slate-400 "
          >
            quantity
          </label>
          <input
            className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
            type="number"
            name="quantity"
            id="product-quantity"
            value={productsFormData.quantity}
            min={1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="product-category"
            className="block mb-1 text-slate-400"
          >
            category
          </label>
          <select
            name="categoryId"
            id="product-category"
            className="bg-transparent text-slate-400 rounded-xl w-full"
            value={productsFormData.categoryId}
            onChange={handleChange}
          >
            <option value="" className="bg-slate-500 text-slate-300">
              Select a Category
            </option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="bg-slate-500 text-slate-300"
              >
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <button
            type="submit"
            className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
          >
            Add new Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductsForm;
