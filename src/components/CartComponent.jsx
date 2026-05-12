import { useEffect, useState } from "react";

const CartComponent = () => {

    const [cart, setCart] = useState([]);

    const img_url =
        "https://brianm.alwaysdata.net/static/images/";



    useEffect(() => {
    const loadCart = () => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
        window.removeEventListener("cartUpdated", loadCart);
    };
    }, []);

    // increase quantity
    const increaseQuantity = (id) => {

        const updatedCart = cart.map((item) =>

            item.id === id
                ? {
                      ...item,
                      quantity:
                          item.quantity + 1
                  }
                : item
        );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    // decrease quantity
    const decreaseQuantity = (id) => {

        const updatedCart = cart
            .map((item) =>

                item.id === id
                    ? {
                          ...item,
                          quantity:
                              item.quantity - 1
                      }
                    : item
            )
            .filter(
                (item) => item.quantity > 0
            );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    // remove item completely
    const removeItem = (id) => {

        const updatedCart =
            cart.filter(
                (item) => item.id !== id
            );

        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

 

    const total = cart.reduce(
    (sum, item) =>
        sum + Number(item.product_cost) * item.quantity,
    0
    );

    return (

        <div className="container mt-4">

            <h2 className="fw-bold mb-4">
                Shopping Cart
            </h2>

            {/* Empty Cart */}
            {cart.length === 0 ? (

                <div className="text-center mt-5">

                    <h4>
                        Your cart is empty 🛒
                    </h4>

                </div>

            ) : (

                <>
                    {/* Cart Items */}
                    {cart.map((item) => (

                        <div
                            key={item.id}
                            className="card shadow-sm border-0 rounded-4 mb-3"
                        >

                            <div className="card-body d-flex align-items-center">

                                {/* Product Image */}
                                <img
                                    src={
                                    item.product_image.startsWith("http")
                                        ? item.product_image
                                        : img_url + item.product_image
                                }
                                    alt=""
                                    width="100"
                                    height="100"
                                    className="rounded"
                                    style={{
                                        objectFit:
                                            "cover"
                                    }}
                                />

                                {/* Product Details */}
                                <div className="ms-3 flex-grow-1">

                                    <h5>
                                        {item.product_name}
                                    </h5>

                                    <p className="text-muted mb-1">

                                        Price:
                                        Ksh {
                                            item.product_cost
                                        }

                                    </p>

                                    <p className="fw-bold">

                                        Quantity:
                                        {item.quantity}

                                    </p>

                                    <p className="text-success">

                                        Subtotal:
                                        Ksh {

                                            item.product_cost *
                                            item.quantity

                                        }

                                    </p>

                                    {/* Quantity Buttons */}
                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.id
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.id
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                removeItem(
                                                    item.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Total */}
                    <div className="card border-0 shadow rounded-4 p-4 mt-4">

                        <h4 className="fw-bold">

                            Total:
                            Ksh {total}

                        </h4>

                        <button className="btn btn-dark mt-3">

                            Checkout

                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default CartComponent;