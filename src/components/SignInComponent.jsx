import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIncomponent = () => {
    let [email, updateEmail] = useState("");
    let [password, updatePassword] = useState("");
    let [loading, updateLoading] = useState("");
    let [success, updateSuccess] = useState("");
    let [error, updateError] = useState("");

    //use useNavigate hook to automatically navigate to home component 
    let navigater = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        updateError("");
        updateSuccess("");
        updateLoading("Please wait...")
        try {
            // we create the form data
            const user_data = new FormData();
            user_data.append("email", email);
            user_data.append("password", password);
            // get response form sevre after getting data
            const response = await axios.post("https://brianm.alwaysdata.net/api/signin", user_data)
            console.log(response);

            if (response.data.user) {
                updateSuccess(response.data.message);
                updateLoading("")
                // to save user data after login

                // reroute to home page

                navigater("/")
            }

            else {
                updateError(response.data.message);
                updateLoading("");
            }
        } catch (error) {
            updateError(error.message)
            updateLoading("")

        }

    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h1>Sign In </h1>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>

                <form onSubmit={handleSubmit}>
                    <input  type="email" className="form-control"  placeholder="Email" required value={email} onChange={(e) => { updateEmail(e.target.value) }} /> <br />
                    <input type="password" className="form-control" placeholder="Enter your password" required value={password} onChange={(e) => { updatePassword(e.target.value) }} /><br />
                    <button className="btn btn-dark">Sign in</button> <br />
                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link to="/signin" style={{ textDecoration: "none", fontWeight: "bold" }}>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
export default SignIncomponent;