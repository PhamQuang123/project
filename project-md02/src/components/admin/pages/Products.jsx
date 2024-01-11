import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Products() {
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  const handleClose = () => setShow(false);
  const handleShow = (element) => {
    setViewData(element);
    setShow(true);
  };
  const [sortType, setSortType] = useState("asc");
  const [sortName, setSortName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [products, setProduct] = useState([]);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleSortType = () => {
    setSortType(sortType === "asc" ? "desc" : "asc");
    setSortName("price");
  };
  const loadData = async () => {
    let URL = "http://localhost:8888/products";

    if (searchText) {
      URL += `?q=${searchText}`;
    } else if (sortName) {
      if (sortType === "asc") {
        URL += `?_sort=${sortName}&_order=${sortType}`;
      } else {
        URL += `?_sort=${sortName}&_order=${sortType}`;
      }
    }
    const result = await axios.get(URL);

    setProduct(result.data);
    console.log(URL, searchText);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8888/products/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [searchText, sortType]);
  return (
    <>
      {" "}
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="mt-5 mb-5"
      >
        <NavLink to={"/add-product"}>
          <button className="btn btn-outline-info">Add New Product</button>
        </NavLink>
        <h1 style={{ margin: "0 10px" }}>Product</h1>

        <form className="d-flex" role="search">
          <input
            onChange={handleSearch}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchText}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <table className="table  table-bordered" style={{ textAlign: "center" }}>
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>
              Price
              <i onClick={handleSortType} className="fa-solid fa-sort"></i>
            </th>
            <th>DiscountPercentage</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Thumbnail</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {products.map((element, index) => (
            <tr key={element.id}>
              <td>{index + 1}</td>
              <td>{element.id}</td>
              <td>{element.title}</td>
              <td>{element.description}</td>
              <td>{element.price}</td>
              <td>{element.discountPercentage}</td>
              <td>{element.rating}</td>
              <td>{element.stock}</td>
              <td>{element.brand}</td>
              <td>{element.category}</td>
              <td>
                <img
                  width={100}
                  height={100}
                  src={element.thumbnail}
                  alt="photo"
                />
              </td>
              <td>
                {element.images.map((e, i) => (
                  <img
                    width={100}
                    height={100}
                    style={{ margin: "5px 5px" }}
                    key={i + 1}
                    src={e}
                    alt="photo"
                  />
                ))}
              </td>
              <td>
                <div style={{ display: "flex", justifyContent: "ceter" }}>
                  <button
                    onClick={() => handleShow(element)}
                    className="btn btn-outline-info"
                  >
                    View
                  </button>
                  <NavLink to={`/edit-product/${element.id}`}>
                    <button
                      style={{ margin: "0 10px" }}
                      className="btn btn-outline-warning"
                    >
                      Edit
                    </button>
                  </NavLink>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(element.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Sản phẩm: ${viewData.title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`ID: ${viewData.id}`}</p>
          <p>{`Description: ${viewData.description}`}</p>
          <p>{`Price: ${viewData.price}`}</p>
          <p>{`DiscountPercentage: ${viewData.discountPercentage}`}</p>
          <p>{`Rating: ${viewData.rating}`}</p>
          <p>{`Stock: ${viewData.stock}`}</p>
          <p>{`Brand: ${viewData.brand}`}</p>
          <p>{`Category: ${viewData.category}`}</p>
          <img style={{ width: "50%" }} src={viewData.thumbnail} alt="photo" />
          <div>
            <p>Images:</p>
            {viewData.images.map((e, i) => (
              <img style={{ width: "100px" }} src={e} alt="photo" />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Products;
