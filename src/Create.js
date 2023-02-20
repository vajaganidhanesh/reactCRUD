import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Create() {
  let product = {};
  const API = "http://localhost:8000/products";
  // state variables...
  let [toast, setToast] = useState(false);
  let [message, setMessage] = useState(null);
  let form = useRef();

  function readProduct(property, value) {
    product[property] = value;
    console.log(product);
  }
  const createProduct = async () => {
    const response = await fetch(`${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    if (data.success === true) {
      setToast(true);
      setMessage({ text: data.message, type: "success" });
      form.current.reset();
    } else {
      setToast(true);
      setMessage({ text: data.message, type: "error" });
    }

    setTimeout(() => {
      setToast(false);
    }, 5000);
  };

  return (
    <div className='container'>
      {toast === true ? (
        <div className={"toastMsg " + message.type}>{message.text}</div>
      ) : null}

      <div className='header'>
        <h1 className='title'>Create new Products</h1>
        <Link to={"/products"}>
          <button className='btn btn-primary'>view Product</button>
        </Link>
      </div>

      <form ref={form} className='container form'>
        <input
          type='number'
          className='form-control'
          placeholder='Enter ID'
          onChange={(event) => {
            readProduct("id", event.target.value);
          }}
        />

        <input
          type='text'
          className='form-control'
          placeholder='Enter Name'
          onChange={(event) => {
            readProduct("name", event.target.value);
          }}
        />

        <input
          type='number'
          className='form-control'
          placeholder='Enter Price'
          onChange={(event) => {
            readProduct("price", event.target.value);
          }}
        />

        <input
          type='number'
          className='form-control'
          placeholder='Enter Quality'
          onChange={(event) => {
            readProduct("quatity", event.target.value);
          }}
        />

        <button
          type='button'
          className='btn btn-primary'
          onClick={createProduct}
        >
          {" "}
          Create product
        </button>
      </form>
    </div>
  );
}

export default Create;
