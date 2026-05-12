import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";


const NavbarComponent = () => {

    const [count, setCount] = useState(0);

    const updateCartCount = () => {

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const total = cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

        setCount(total);
    };

    useEffect(() => {

        updateCartCount();

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );

        return () => {

            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );
        };

    }, []);
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Brian Motors</Link>
            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/addproducts">Add Product</Link>
                  

                </div>

                <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/signin">Sign In</Link>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                    <Link
                        to="/cart"
                        className="nav-link position-relative text-dark"
                    >
                        <i className="bi bi-cart3 fs-4"></i>

                        {count > 0 && (

                            <span
                                className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"
                            >
                                {count}
                            </span>

                        )}
                    </Link>
                </div>
            </div>

        </nav>
    )
}
export default NavbarComponent;