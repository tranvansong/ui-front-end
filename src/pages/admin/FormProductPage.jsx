import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { uploadImage } from "../../api/upload/upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProduct } from "../../api/product/product";
import { getBrands } from "../../api/product/brand";
import { getCategories } from "../../api/product/category";
import { getColors } from "../../api/product/color";

const FormProductPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brandId: "",
    categoryId: "",
  });

  const [colors, setColors] = useState([
    {
      colorId: "",
      dropdownOpen: false,
      images: [],
      variants: [{ size: "", stockQuantity: "", soldQuantity: "" }],
    },
  ]);

  const [errors, setErrors] = useState({});

  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await getBrands();
        const categoriesResponse = await getCategories();
        const colorsResponse = await getColors();
        setBrands(brandsResponse);
        setCategories(categoriesResponse);
        setColorsData(colorsResponse);
      } catch (error) {
        console.error(error);
        toast.error(error.data.message);
      }
    }
    fetchData();
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageUpload = (colorIndex, e) => {
    const files = Array.from(e.target.files);
    const newColors = [...colors];
    const imageFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    newColors[colorIndex].images = [
      ...newColors[colorIndex].images,
      ...imageFiles,
    ];
    setColors(newColors);
  };

  const removeImage = (colorIndex, imageIndex) => {
    const newColors = [...colors];
    newColors[colorIndex].images.splice(imageIndex, 1);
    setColors(newColors);
  };

  const addColor = () => {
    setColors([
      ...colors,
      {
        colorId: "",
        images: [],
        variants: [{ size: "", stockQuantity: "", soldQuantity: "" }],
      },
    ]);
  };

  const removeColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const toggleDropdown = (colorIndex) => {
    const newColors = colors.map((color, index) =>
      index === colorIndex
        ? { ...color, dropdownOpen: !color.dropdownOpen }
        : { ...color, dropdownOpen: false }
    );
    setColors(newColors);
  };

  const handleColorChange = (colorIndex, value) => {
    // Kiểm tra xem màu đã được chọn chưa
    const isColorDuplicate = colors.some(
      (color, index) => index !== colorIndex && color.colorId === value
    );

    if (isColorDuplicate) {
      alert("Màu này đã được chọn!");
      return; // Nếu trùng, không làm gì
    }

    // Nếu không trùng, tiến hành thay đổi màu
    const newColors = colors.map((color, index) =>
      index === colorIndex
        ? { ...color, colorId: value, dropdownOpen: false } // Đóng dropdown sau khi chọn
        : color
    );
    setColors(newColors);
  };

  const addVariation = (colorIndex) => {
    const newColors = [...colors];
    newColors[colorIndex].variants.push({
      size: "",
      stockQuantity: "",
      soldQuantity: "",
    });
    setColors(newColors);
  };

  const removeVariation = (colorIndex, variationIndex) => {
    const newColors = [...colors];
    newColors[colorIndex].variants = newColors[colorIndex].variants.filter(
      (_, i) => i !== variationIndex
    );
    setColors(newColors);
  };

  const handleVariationChange = (colorIndex, variationIndex, field, value) => {
    if (field === "size") {
      const selectedSizes = colors[colorIndex].variants.map(
        (variation, index) => index !== variationIndex && variation.size
      );

      if (selectedSizes.includes(value)) {
        alert("Size này đã được chọn cho một variant khác!");
        return;
      }
    }
    const newColors = [...colors];
    newColors[colorIndex].variants[variationIndex][field] = value;
    setColors(newColors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name)
      newErrors.name = "Tên sản phẩm không để trống";
    if (!formData.description)
      newErrors.description = "Mô tả sản phẩm không để trống";
    if (!formData.price) newErrors.price = "Giá không để trống";
    if (!formData.brandId) newErrors.brand = "Chưa chọn thương hiệu";
    if (!formData.categoryId) newErrors.category = "Chưa chọn danh mục";
    colors.forEach((color, colorIndex) => {
          if (!color.colorId) {
            newErrors[`color-${colorIndex}`] = `Chưa chọn màu cho màu số ${colorIndex + 1}`;
            toast.error(`Chưa chọn màu cho màu số ${colorIndex + 1}`);
          }
      
          color.variants.forEach((variant, variantIndex) => {
            if (!variant.size) {
              newErrors[`color-${colorIndex}-variant-${variantIndex}-size`] =
                `Chưa chọn size cho màu số ${colorIndex + 1}, variant số ${variantIndex + 1}`;
              toast.error(`Chưa chọn size cho màu số ${colorIndex + 1}, variant số ${variantIndex + 1}`);
            }
            if (!variant.stockQuantity) {
              newErrors[`color-${colorIndex}-variant-${variantIndex}-stockQuantity`] =
                `Chưa nhập số lượng tồn cho màu số ${colorIndex + 1}, variant số ${variantIndex + 1}`;
              toast.error(`Chưa nhập số lượng tồn cho màu số ${colorIndex + 1}, variant số ${variantIndex + 1}`)
            }
            if (!variant.soldQuantity) {
              newErrors[`color-${colorIndex}-variant-${variantIndex}-soldQuantity`] =
                `Chưa nhập số lượng đã bán cho màu số ${colorIndex + 1}, variant số ${variantIndex + 1}`;
              toast.error(`Chưa nhập số lượng đã bán cho màu số ${colorIndex + 1}, variant số ${variantIndex + 1}`)
            }
          });
        });
    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const imageData = new FormData();
      // Thêm tất cả các ảnh vào FormData
      colors.forEach((color) => {
        color.images.forEach((image) => {
          imageData.append("files", image.file);
        });
      });

      try {
        const imageUrls = await uploadImage(imageData);
        const updatedColors = colors.map((color, index) => {
          const updatedImages = color.images.map(
            (_, imageIndex) =>
              imageUrls[index * color.images.length + imageIndex] // Chỉ lấy chuỗi URL
          );
      
          return { ...color, images: updatedImages };
        });
      
        const cleanedColors = updatedColors.map(
          ({ dropdownOpen, ...color }) => color
        );
        console.log("Form submitted:", { ...formData, colors: cleanedColors });
        const productData = { ...formData, colors: cleanedColors };
        try {
          await createProduct(productData);
          toast.success("Tạo sản phẩm thành công");
        } catch (error) {
          console.error(error);
          toast.error(error.data.message);
        }

      } catch (error) {
        toast.error(error.data.message);
        console.error(error);
      } finally {
        setIsLoading(false); // Kết thúc xử lý, ẩn loading
      }

    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Thêm mới sản phẩm
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mô tả sản phẩm
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Giá
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Thương hiệu
                      </label>
                      <select
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Chọn thương hiệu</option>
                        {brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.brand}
                          </option>
                        ))}
                      </select>
                      {errors.brand && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.brand}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Danh mục
                      </label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Màu sắc và biến thể
                      </h3>
                      <button
                        type="button"
                        onClick={addColor}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
                      >
                        <AddIcon className="-ml-1 mr-2 h-5 w-5" />
                        Thêm màu sắc
                      </button>
                    </div>

                    {colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="border rounded-lg p-6 bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-grow mr-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Chọn màu sắc
                            </label>
                            <div className="relative">
                              {/* Hiển thị giá trị đã chọn hoặc "Select color" */}
                              <div
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onClick={() => toggleDropdown(colorIndex)}
                              >
                                <div className="flex items-center space-x-2">
                                  <span
                                    className="w-4 h-4 rounded-full border"
                                    style={{
                                      backgroundColor:
                                        colorsData.find(
                                          (mockColor) =>
                                            mockColor.id === color.colorId
                                        )?.colorCode || "transparent",
                                    }}
                                  ></span>
                                  <span>
                                    {colorsData.find(
                                      (mockColor) =>
                                        mockColor.id === color.colorId
                                    )?.color || "Chọn màu"}
                                  </span>
                                </div>
                              </div>

                              {/* Dropdown menu */}
                              {color.dropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                  {colorsData.map((mockColor) => (
                                    <div
                                      key={mockColor.id}
                                      onClick={() =>
                                        handleColorChange(
                                          colorIndex,
                                          mockColor.id
                                        )
                                      }
                                      className="flex items-center space-x-2 py-2 px-3 cursor-pointer hover:bg-gray-100"
                                    >
                                      <span
                                        className="w-4 h-4 rounded-full border"
                                        style={{
                                          backgroundColor: mockColor.colorCode,
                                        }}
                                      ></span>
                                      <span>{mockColor.color}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeColor(colorIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <DeleteOutlineIcon className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Hình ảnh
                          </label>
                          <div className="mt-1 flex items-center">
                            <input
                              type="file"
                              multiple
                              onChange={(e) => handleImageUpload(colorIndex, e)}
                              className="hidden"
                              id={`images-${colorIndex}`}
                              accept="image/*"
                            />
                            <label
                              htmlFor={`images-${colorIndex}`}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <ImageOutlinedIcon className="-ml-1 mr-2 h-5 w-5" />
                              Tải lên ảnh
                            </label>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {color.images.map((image, imageIndex) => (
                              <div key={imageIndex} className="relative group">
                                <img
                                  src={image.preview}
                                  alt={`Preview ${imageIndex + 1}`}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeImage(colorIndex, imageIndex)
                                  }
                                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <DeleteOutlineIcon className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              Biến thể sản phẩm
                            </h4>
                            <button
                              type="button"
                              onClick={() => addVariation(colorIndex)}
                              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                            >
                              <AddIcon className="-ml-1 mr-1 h-4 w-4" />
                              Thêm biến thể
                            </button>
                          </div>

                          {color.variants.map((variation, variationIndex) => (
                            <div
                              key={variationIndex}
                              className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-center"
                            >
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Size
                                </label>
                                <select
                                  value={variation.size}
                                  onChange={(e) =>
                                    handleVariationChange(
                                      colorIndex,
                                      variationIndex,
                                      "size",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                  <option value="" disabled>
                                    Chọn size
                                  </option>
                                  {sizes.map((size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Số lượng
                                </label>
                                <input
                                  type="number"
                                  value={variation.stockQuantity}
                                  onChange={(e) =>
                                    handleVariationChange(
                                      colorIndex,
                                      variationIndex,
                                      "stockQuantity",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Đã bán
                                </label>
                                <input
                                  type="number"
                                  value={variation.soldQuantity}
                                  onChange={(e) =>
                                    handleVariationChange(
                                      colorIndex,
                                      variationIndex,
                                      "soldQuantity",
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeVariation(colorIndex, variationIndex)
                                }
                                className="mt-6 text-red-600 hover:text-red-800"
                              >
                                <DeleteOutlineIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-4">
                      <div className="animate-spin rounded-full border-t-4 border-dotted border-indigo-900 w-8 h-8"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-greenlight hover:bg-green focus:outline-none"
                    >
                      Thêm mới sản phẩm
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default FormProductPage;
