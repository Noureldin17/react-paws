import React, { useState } from "react";

const ImageTest = (props: {name: string}) => {
  const [product, setProduct] = useState({
    name: "Cat Food",
    price: 12.99,
    description: "test",
    category: {
        categoryId: 1
    },
    petType: {
        id: 1
    },
    stockQuantity: 22,
    images: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MzUwNjc4NzcsImV4cCI6MTczODY2Nzg3N30.TeF5tqn-GXEZIuz_lalzoDlVy8NrSXGKY8rRvD6ksX4"; // Replace with your JWT token

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!images.length) {
      alert("Please select at least one image.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    images.forEach((image) => formData.append("imageFiles", image));

    try {
      const response = await fetch("http://localhost:8080/api/v1/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Product uploaded successfully:", responseData);
        alert("Product uploaded successfully!");
      } else {
        console.error("Failed to upload product:", response.statusText);
        alert("Failed to upload product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product.");
    } finally {
      setUploading(false);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/products?size=20", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        console.log("Fetched product data:", res);
        const data = res.response.content.pop();
        setProduct({
          ...product,
          name: data.name,
          price: data.price,
          description: data.description,
          stockQuantity: data.stockQuantity,
        });

        // Map the image data to URLs
        const imageUrls = data.images.map((image: { data: string }) =>
          URL.createObjectURL(new Blob([Uint8Array.from(atob(image.data), (c) => c.charCodeAt(0))]))
        );
        setUploadedImages(imageUrls);
      } else {
        console.error("Failed to fetch product data:", response.statusText);
        alert("Failed to fetch product data.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Error fetching product data.");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stock Quantity:
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Images:
          <input
            className="form-control"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </label>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <button onClick={fetchProductData} className="btn btn-secondary">
        Fetch Product Data
      </button>

      <div>
        <h3>Uploaded Images:</h3>
        {uploadedImages.length > 0 ? (
          uploadedImages.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} width={200} />
          ))
        ) : (
          <p>No images uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default ImageTest;
