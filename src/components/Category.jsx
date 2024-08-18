import { useState } from "react";
import toast from "react-hot-toast";

function CategoryForm({ setCategories }) {
  const [isShow, setIsShow] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setCategoryFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryFormData.description || !categoryFormData.title) {
      toast.error("please fill all fields");
      return;
    }
    const newCategory = {
      id: Date.now(),
      ...categoryFormData,
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
    setCategoryFormData({ title: "", description: "" });
    setIsShow(false);
  };

  return (
    <section>
      <div className={`mb-6 ${!isShow ? "hidden" : ""}`}>
        <h2 className="text-xl text-slate-300 font-bold mb-2">
          Add New category
        </h2>
        <form
          onSubmit={handleAddCategory}
          className="bg-slate-700 p-4 rounded-xl flex flex-col gap-y-4"
        >
          <div>
            <label
              htmlFor="category-title"
              className="block mb-1 text-slate-400"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              id="category-title"
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full md:w-auto"
              autoComplete="off"
              value={categoryFormData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="category-description"
              className="block mb-1 text-slate-400"
            >
              description
            </label>
            <textarea
              className="bg-transparent rounded-xl border border-slate-500 text-slate-400 w-full"
              type=" text"
              name="description"
              id="category-description"
              value={categoryFormData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <button
              className="flex-1 border border-slate-400 text-slate-400 rounded-xl py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsShow(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-slate-500 text-slate-200 rounded-xl py-2"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => setIsShow((prev) => !prev)}
        className="text-slate-600 text-lg mb-4 font-medium"
      >
        {isShow ? "hide category form" : "Add new Category?"}
      </button>
    </section>
  );
}

export default CategoryForm;
