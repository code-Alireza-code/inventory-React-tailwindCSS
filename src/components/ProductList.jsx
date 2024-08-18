function ProductList({ products, categories, setProducts }) {
  const findCategoryTitle = (p) => {
    return categories.find((category) => category.id === Number(p.categoryId))
      .title;
  };
  const handleDelete = (productId) => {
    setProducts((prevData) => prevData.filter((p) => p.id != productId));
  };

  return (
    <div id="products-list" className="overflow-x-auto">
      <hr className=" mb-4 border-[1.5px] border-slate-600 " />
      <h2 className="text-xl text-slate-300 font-bold mb-2">Product list</h2>
      <div className="overflow-x-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between mb-2 w-full md:min-w-[400px]"
          >
            <span className="text-slate-400">{product.title}</span>
            <div className="flex items-center gap-x-3">
              <span className="text-slate-400">
                {new Date().toLocaleDateString("fa-IR")}
              </span>
              <span className="hidden md:block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">
                {findCategoryTitle(product)}
              </span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">
                {product.quantity}
              </span>
              <button
                className="delete-product border px-2 py-o.5 rounded-2xl border-red-400 text-red-400 delete-product hover:text-slate-100 hover:bg-red-700"
                data-product-id={product.id}
                onClick={() => handleDelete(product.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
