import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Create(){

    let product={}

    // state variables...

    let [toast,setToast] = useState(false);

    let [message,setMessage] = useState(null)

    let form = useRef();

    function readProduct(property,value)
    {

        product[property] = value

        console.log(product);

    }

    function createProduct()
    {

        fetch("http://localhost:8000/products",{
            method:"POST",
            body:JSON.stringify(product),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then((response)=>response.json())
        .then((msg)=>{
            console.log(msg);
            if(msg.success===true)
            {
                setToast(true);
                setMessage({text:msg.message,type:"success"})
                form.current.reset();
            }
            else
            {
                setToast(true);
                setMessage({text:msg.message,type:"error"})
            }

            setTimeout(()=>{
                setToast(false)
            },5000)


        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(

        <div className="container">

            {
                toast===true?(
                    <div className={"toastMsg "+ message.type}>
                        {message.text}
                    </div>
                ):null
            }

            

            <div className="header">
                <h1 className="title">Create new Products</h1>
                <Link to={"/products"}>
                    <button className="btn btn-primary">view Product</button>
                </Link>
            </div>

            <form ref={form} className="container form">

                <input type="number" className="form-control" placeholder="Enter ID" onChange={
                    (event)=>{
                        readProduct("id",event.target.value)
                    }
                }/>

                <input type="text" className="form-control" placeholder="Enter Name" onChange={
                    (event)=>{
                        readProduct("name",event.target.value)
                    }
                }/>

                <input type="number" className="form-control" placeholder="Enter Price" onChange={
                    (event)=>{
                        readProduct("price",event.target.value)
                    }
                }/>

                <input type="number" className="form-control" placeholder="Enter Quality" onChange={
                    (event)=>{
                        readProduct("quatity",event.target.value)
                    }
                }/>

                <button type="button" className="btn btn-primary" onClick={createProduct}> Create product</button>


            </form>
        </div>

    )

}

export default Create;