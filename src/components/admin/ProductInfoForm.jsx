import React from "react";

const ProductInfoForm = ({ formProduct, handleInputChange, errors }) => {
  const brands = [
    { id: 1, brand: "Nike" },
    { id: 2, brand: "Adidas" },
    { id: 3, brand: "Puma" },
    { id: 4, brand: "Reebok" },
    { id: 5, brand: "Under Armour" },
  ];

  const categories = [
    { id: 1, category: "Áo thun" },
    { id: 2, category: "Quần jeans" },
    { id: 3, category: "Áo polo" },
    { id: 4, category: "Áo thể thao" },
    { id: 5, category: "Áo khoác Jacket" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formProduct.name}
            onChange={handleInputChange}
            className={`mt-1 px-3 py-2 block w-full shadow-sm ${errors.name ? "border-red-500" : "border-gray-400"} border rounded-md focus:outline-none`}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formProduct.price}
            onChange={handleInputChange}
            className={`mt-1 px-3 py-2 block w-full rounded-md shadow-sm border ${errors.price ? "border-red-500" : "border-gray-400"} focus:outline-none`}
            required
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="brandId" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            id="brandId"
            name="brandId"
            value={formProduct.brandId}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 block w-full rounded-md shadow-sm border border-gray-400 focus:outline-none"
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formProduct.categoryId}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 block w-full rounded-md shadow-sm border border-gray-400 focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formProduct.description}
          onChange={handleInputChange}
          className="mt-1 px-3 py-2 block w-full rounded-md shadow-sm border border-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ProductInfoForm;
