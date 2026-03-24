import axios from "axios";
import { useState } from "react";


    

const AddProductsComponent = () => {
    let[product_name,setProductName] = useState("")
    let[product_cost,setProductCost] = useState("")
    let[product_category,setProductCategory]= useState("")
    let[product_description,setProductDescription] =useState("")
    let[product_image,setProductImage] = useState("")

    let[loading,setLoading] =useState("")
    let[error,setError]=useState("")
    let[success,setSuccess]=useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault()

        setLoading("please wait...")
        setError("")
        setSuccess("")

        try {
            const product_data = new FormData()
            product_data.append('product_name',product_name)
            product_data.append("product_cost",product_cost)
            product_data.append("product_category",product_category)
            product_data.append("product_description",product_description)
            product_data.append("product_image",product_image)

            const response = await axios.post("https://brianm.alwaysdata.net/api/add_product",product_data)
            console.log(response)
            if (response.status===200){
                setSuccess(response.data.message)
                setLoading("")
                setError("")
            }
           
        } catch (error) {
            console.log(error.message) 
            setLoading("")
            setError(error.message)
        }

    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Add product</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-warning">{success}</h5>
                <h5 className="text-danger">{error}</h5>

                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    className="form-control"
                    placeholder="Enter product name"
                    value={product_name}
                    onChange={(e)=>{setProductName(e.target.value)}}

                    /> <br />

                    <input type="number" 
                    className="form-control"
                    placeholder="Enter product cost"
                    value={product_cost}
                    onChange={(e)=>{setProductCost(e.target.value)}}
                    /> <br />

                    <select 
                    className="form-select"
                    value={product_category}
                    onChange={(e)=>{setProductCategory(e.target.value)}}>
                        <option value="">Select value</option>
                        <option value="Audi">Audi</option>
                        <option value="Volvo">Volvo</option>
                        <option value="BMW">BMW</option>
                        <option value="Toyota">Toyota</option>
                        <option value= "Mercedes">Mercedes</option>
                        <option value="Mazda">Mazda</option>

                    </select> <br />

                    <textarea className="form-control"
                    rows= "5"
                    placeholder="Enter products description"
                    value={product_description}
                    onChange={(e)=>{setProductDescription(e.target.value)}}></textarea> <br />

                    <label htmlFor="" className="form-label">
                        Product Image
                    </label> <br />

                    <input 
                    type="file" 
                    accept="image/*"
                    className="form-control"
                    onChange={(e)=>{setProductImage(e.target.files[0])}}/> <br />

                <button className="btn btn-dark">
                    Add product
                </button> <br />
                
                </form>
              
            </div>
        </div>
    );
}
export default AddProductsComponent;