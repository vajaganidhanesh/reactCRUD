import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products(){

    let [products,setProducts] = useState([])

    let [toast,setToast] = useState([false]);

    let [message,setMessage] = useState(null)

    useEffect(()=>{
        fetch("http://localhost:8000/products")
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setProducts(data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    function deleteProduct(id)
    {

        fetch("http://localhost:8000/products?id="+id,{
            method:"DELETE"
        })
        .then((response)=>response.json())
        .then((message)=>{
            console.log(message);

            let tempProducts = [...products]

            let eleIndex = tempProducts.findIndex((ele)=>{
                return ele.id=id;
            })
            
            tempProducts.splice(eleIndex,1);

            setProducts(tempProducts)

            if(message.message ===true)
            {
                setToast(true);
                setMessage({text:message.message,type:"success"})
            }
            else
            {
                setToast(true);
                setMessage({text:message.message,type:"error"})
            }

            setTimeout(() => {
                setToast(false)
            }, 3000);
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return (
        <div className="container">

            {
                toast===true?(
                    <div className={"toastMsg "+ message.type}>
                        {message.text}
                    </div>
                ):null
            }

            <div className="header">
                <h1 className="title">All Products</h1>
                <Link to={"/create"}>
                    <button className="btn btn-primary">Create Product</button>
                </Link>
            </div>

            <table className="product-data table">
            <thead>
                <tr>
                    <th >Sl No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody >

                {
                    products.map((product,index)=>{

                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quatity}</td>
                                <td>
                                    <i className="fa-solid fa-pen-to-square text-success me-3"></i>
                                    <i className="fa-solid fa-trash-can text-danger" 
                                    onClick={()=>{
                                        deleteProduct(product.id)
                                        console.log(product.id);
                                        console.log(product);
                                    }}></i>
                                </td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
    )
}

export default Products;