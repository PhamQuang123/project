import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const [exitProduct, setExitProduct] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  });
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = product;
  const param = useParams();
  const loadData = async () => {
    await axios
      .get(`http://localhost:8888/products/${param.id}`)
      .then((data) => setProduct(data.data))
      .catch((err) => console.log(err));
  };
  const navigate = useNavigate();
  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  console.log(product);
  const handleUpdateProduct = async () => {
    await axios.put(`http://localhost:8888/products/${param.id}`, product);
    navigate("/manager-product");
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <NavLink to={"/manager-product"}>
        <button
          style={{ margin: "10px 0" }}
          className="btn btn-outline-info mx-10 "
        >
          Back
        </button>
      </NavLink>
      <form className="row g-3">
        <div className="mx-5 ">
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Description:</label>
          <input
            className="form-control"
            type="text"
            name="description"
            value={description}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Price:</label>
          <input
            className="form-control"
            type="text"
            name="price"
            value={price}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>DiscountPercentage:</label>
          <input
            className="form-control"
            type="text"
            name="discountPercentage"
            value={discountPercentage}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Rating:</label>
          <input
            className="form-control"
            type="text"
            name="rating"
            value={rating}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Stock:</label>
          <input
            className="form-control"
            type="text"
            name="stock"
            value={stock}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Brand:</label>
          <input
            className="form-control"
            type="text"
            name="brand"
            value={brand}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Category:</label>
          <input
            className="form-control"
            type="text"
            name="category"
            value={category}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Thumbnail:</label>
          <input
            className="form-control"
            type="text"
            name="thumbnail"
            value={thumbnail}
            onChange={handleInput}
          />
        </div>
        <div className="mx-5 ">
          <label>Images:</label>
          <input
            className="form-control"
            type="text"
            name="images"
            value={images}
            onChange={handleInput}
          />
        </div>
      </form>
      <button
        style={{ margin: "10px 0" }}
        className="btn btn-outline-success"
        onClick={handleUpdateProduct}
      >
        Update
      </button>
    </div>
  );
}

export default EditProduct;
