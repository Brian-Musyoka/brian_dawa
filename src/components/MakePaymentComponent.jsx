import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MakePaymentComponent = () => {

    const{product} = useLocation().state || {}
    const img_url= "https://brianm.alwaysdata.net/static/images/"

    let[phone,setPhone]= useState("")
    let[loading,setLoading]= useState("")
    let[success,setSuccess] =useState("")
    let[error,setError] = useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault()

        setError("")
        setSuccess("")
        setLoading("Please Wait...")

        try {
            
            const data = new FormData()

            data.append("amount",product.product_cost)
            data.append("phone",phone)

            const response = await axios.post("https://brianm.alwaysdata.net/api/mpesa_payment")
            console.log(response)

            if (response.status === 200 ) {
                setLoading("")
                setSuccess(response.data.message)
                setPhone("")
            }

        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }

    return (
        <div className="row justify-content-center mt-4">
           <h2>LIPA NA MPESA</h2>
           <div className="col-md-3">
            <img src={img_url+product.product_image} className="rounded img-thumbnail" alt="" />

           </div>
           <div className="col-md-3">
            <h3 className="text-dark">{product.product_name}</h3>
            <h5 className="text-primary">{product.product_category}</h5>
            <p className="text-muted">{product.product_description}</p>
            <h3 className="text-warning">{product.product_cost}</h3>

            <hr />

            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>
            <h6 className="text-warning">{success}</h6>
            <form onSubmit={handleSubmit} >
                <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Amount"
                readOnly value={product.product_cost}/> 
                <br />


                <input 
                type="tel" 
                className="form-control" 
                placeholder="Enter Mpesa No 2547xxxxxxxx" 
                onChange={(e)=>{setPhone(e.target.value)}}
                value={phone}
                />
                <br />

                <button className="btn btn-dark">Pay Now</button>
            </form>
           </div>
        </div>
    )
}
export default MakePaymentComponent;