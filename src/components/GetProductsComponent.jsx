import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const GetProductsComponent = () => {

    let [searchTerm, setSearchTerm] = useState("")
    let [minPrice, setMinPrice] = useState("")
    let [maxPrice, setMaxPrice] = useState("")
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    // let[product,setProduct] =useState([])

    
   


    // base url for images from server
    const img_url = "https://brianm.alwaysdata.net/static/images/"

    let navigator = useNavigate();

    // create function to fetch products from backend api
    const getProducts = async () => {
        setError("")
        setLoading("Fetching Products.Please wait...")
        try {
            const response = await axios.get("https://brianm.alwaysdata.net/api/get_products")
            console.log(response)

            if (response.status === 200) {
                setLoading("")
                setProducts(response.data)


       
            }
        } catch (error) {
            setLoading("")
            setError(error.message)

        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productId = product.id || product._id;

    const itemExists = existingCart.find(
        (item) => item.id === productId
    );

    let updatedCart;

    if (itemExists) {
        updatedCart = existingCart.map((item) =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        updatedCart = [
            ...existingCart,
            {
                id: productId,
                product_name: product.product_name,
                product_cost: Number(product.product_cost),
                product_image: product.product_image,
                quantity: 1
            }
        ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
};





    const filteredProducts = products.filter((product) => {
    const matchesSearch =
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())

    const price = Number(product.product_cost)

    const matchesMin = minPrice ? price >= Number(minPrice) : true
    const matchesMax = maxPrice ? price <= Number(maxPrice) : true

    return matchesSearch && matchesMin && matchesMax
    })

    return (
        <div className="row">
            <div className="d-flex justify-content-center">
                

                <div className="row mb-4">
    
                 
                    
                    <div className="row mb-3 g-2 w-100" style={{ maxWidth: "900px" }}>

                        {/* Search */}
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search products by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Min Price */}
                        <div className="col-md-2 ">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>

                        {/* Max Price */}
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>

                        {/* Reset */}
                        <div className="col-md-4">
                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setSearchTerm("")
                                    setMinPrice("")
                                    setMaxPrice("")
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>

                    </div>



                   

                </div>

             
            </div>
            <div className="section-card col-md-4 ">
                <h3 className="m-0">Available Products</h3>
            </div>
         
            <h6 className="text-warning">{loading}</h6>
            <h6 className="text-danger">{error}</h6>
            
            {filteredProducts.length === 0 && (
                <div className="text-center text-muted mt-4">
                    
                </div>
            )}

           {filteredProducts.map((product) => (
                <motion.div
                className="col-md-3 justify-content-center mb-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}>
            
                    <div className="card shadow-sm border-0 rounded-4 h-100">
                       <img 
                            src={img_url + product.product_image} 
                            className="product-img mt-4 rounded-3"
                            style={{ height: "180px", objectFit: "cover" }}
                            alt="" 
                        />
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <b className="text-warning">{product.product_cost}</b>
                            <br />
                            <br />


                       <div className="d-flex gap-2">

                        <button
                            className="btn btn-dark w-100"
                            onClick={() =>
                                navigator("/makepayment", {
                                    state: { product }
                                })
                            }
                        >
                            Purchase
                        </button>

                        <motion.button
                            whileHover={{
                                scale: 1.03,
                                backgroundColor: "#0d6efd",
                                color: "#fff"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-outline-primary w-100"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </motion.button>

                        </div>
                       
                        </div>
                    </div>
                </motion.div>
            ))}

        
        </div>

    )
}
export default GetProductsComponent;

