import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const API = "http://localhost:8000/";
  let [products, setProducts] = useState([]);
  let [toast, setToast] = useState([false]);
  let [message, setMessage] = useState(null);
  let [modelvisible, setModelvisible] = useState(false);
  let [productsToVisible, setProductsToVisible] = useState([]);
  let product = useRef({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch(`${API}products`);
    const data = await response.json();
    setProducts(data);
  }

  const deleteProduct = async (id) => {
    const response = await fetch(`${API}products?id=${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);

    let tempProducts = [...products];
    let eleIndex = tempProducts.findIndex((ele) => {
      return ele.id === id;
    });
    tempProducts.splice(eleIndex, 1);
    setProducts(tempProducts);

    if (data.success === true) {
      setToast(true);
      setMessage({ text: data.message, type: "success" });
    } else {
      setToast(true);
      setMessage({ text: data.message, type: "error" });
    }

    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  function setProductModel(pro) {
    setModelvisible(true);
    setProductsToVisible(pro);
    product.current = { ...pro };
  }

  function readProduct(property, value) {
    product.current[property] = value;
    console.log(product.current);
  }

  const updateProduct = async () => {
    const response = await fetch(`${API}products?id=${product.current.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product.current),
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      setModelvisible(false);
      let tempProducts = [...products];
      let indexToUpdate = tempProducts.findIndex((ele) => {
        return ele.id === product.current.id;
      });

      tempProducts[indexToUpdate] = product.current;
      setProducts(tempProducts);

      setToast(true);
      setMessage({ text: data.message, type: "success" });
    } else {
      setToast(true);
      setMessage({ text: data.message, type: "error" });
    }
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };
  return (
    <div className='container'>
      {toast === true ? (
        <div className={"toastMsg " + message.type}>{message.text}</div>
      ) : null}

      {modelvisible === true ? (
        <div className='update_wrapper'>
          <div className='update_model'>
            <div className='update_model_name'>Update Model</div>
            <input
              type='number'
              className='form-control'
              defaultValue={productsToVisible.id}
              placeholder='Enter ID'
              onChange={(event) => {
                readProduct("id", event.target.value);
              }}
            />
            <input
              type='text'
              className='form-control'
              defaultValue={productsToVisible.name}
              placeholder='Enter Name'
              onChange={(event) => {
                readProduct("name", event.target.value);
              }}
            />
            <input
              type='number'
              className='form-control'
              defaultValue={productsToVisible.price}
              placeholder='Enter price'
              onChange={(event) => {
                readProduct("price", event.target.value);
              }}
            />
            <input
              type='number'
              className='form-control'
              defaultValue={productsToVisible.quatity}
              placeholder='Enter quality'
              onChange={(event) => {
                readProduct("quatity", event.target.value);
              }}
            />
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                updateProduct();
              }}
            >
              {" "}
              update product
            </button>
          </div>
        </div>
      ) : null}

      <div className='header'>
        <h1 className='title'>All Products</h1>
        <Link to={"/create"}>
          <button className='btn btn-primary'>Create Product</button>
        </Link>
      </div>

      <table className='product-data table'>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quatity}</td>
                <td>
                  <i
                    className='fa-solid fa-pen-to-square text-success me-3'
                    onClick={() => {
                      setProductModel(product);
                    }}
                  ></i>
                  <i
                    className='fa-solid fa-trash-can text-danger'
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
