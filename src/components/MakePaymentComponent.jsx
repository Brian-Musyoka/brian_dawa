import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const MakePaymentComponent = () => {

    const { product } = useLocation().state || {}
    const img_url = "https://brianm.alwaysdata.net/static/images/"

    let [phone, setPhone] = useState("")
    let [loading, setLoading] = useState("")
    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")
        if (!phone.trim()) {
            setError("Phone number is required")
            return
        }
        setLoading("Please Wait...")

        try {
            const data = new FormData()
            data.append("amount", product.product_cost)
            data.append("phone", phone)

            const response = await axios.post(
                "https://brianm.alwaysdata.net/api/mpesa_payment",
                data, // ✅ FIX: send the data
                {
                    timeout: 10000 // ✅ prevent hanging
                }
            )

            console.log(response)

            if (response.status === 200) {
                setLoading("")
                setSuccess(response.data.message)
                setPhone("")
            }

        } catch (error) {
            console.log("FULL ERROR:", error); // ✅ debug

            if (error.response) {
                setError(error.response.data.message || "Server error");
            } else if (error.request) {
                setError("Server not responding. Check backend or internet.");
            } else {
                setError(error.message);
            }

            setLoading("")
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                "radial-gradient(circle at top left, #ffff, transparent 50%)," +
                "radial-gradient(circle at bottom right, #fff, transparent 50%)," +
                "linear-gradient(135deg, #4e524fff, #1f9725ff)"
                }}
                >

            <div
                className="p-4 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                    color: "#fff"
                }}
                >

                <h2
                    className="text-center fw-bold mb-4"
                    style={{ color: "#1e3c72", letterSpacing: "1px" }}
                    >
                    LIPA NA M-PESA
                </h2>

                <div className="row g-4">

                    <div className="col-md-5 text-center border-end">
                        <img
                            src={img_url + product.product_image}
                            className="img-fluid mb-3"
                            style={{
                                height: "240px",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "15px"
                            }}
                            alt={product.product_name}
                            />

                        <h4 className="fw-bold">{product.product_name}</h4>
                        <p className="text-muted">{product.product_category}</p>
                        <h5 className="text-success fw-bold">
                            Ksh {product.product_cost}
                        </h5>
                    </div>

                    <div className="col-md-7">

                       {loading && (
                        <div
                            className="alert alert-warning text-center"
                            style={{ borderRadius: "10px" }}
                        >
                            {loading}
                        </div>
                        )}

                        {error && (
                        <div
                            className="alert alert-danger text-center"
                            style={{ borderRadius: "10px" }}
                        >
                            {error}
                        </div>
                        )}

                        {success && (
                        <div
                            className="alert alert-success text-center"
                            style={{ borderRadius: "10px" }}
                        >
                            {success}
                        </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Amount</label>
                                <input 
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={product.product_cost}
                                    readOnly
                                    style={{
                                        borderRadius: "12px",
                                        padding: "12px"
                                    }}
                                    
                                    
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Phone Number</label>
                                <input 
                                    type="tel"
                                    className="form-control form-control-lg"
                                    placeholder="2547XXXXXXXX"
                                    value={phone}
                                    style={{
                                        borderRadius: "12px",
                                        padding: "12px"
                                    }}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                           <button
                            className="w-100 py-3 fw-bold"
                            style={{
                                border: "none",
                                borderRadius: "12px",
                                padding: "12px",
                                fontSize: "16px",
                                fontWeight: "600",
                                background: "linear-gradient(135deg, #537260ff, #00e676)",
                                color: "#0f172a",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                                transition: "0.3s ease"
                            }}
                        >
                            Make Payment
                        </button>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MakePaymentComponent;