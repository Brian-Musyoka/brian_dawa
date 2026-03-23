import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpComponent = () => {
    let [username, updateUsername] = useState("")
    let [phone, updatePhone] = useState("")
    let [password, updatePassword] = useState("")
    let [email, updateEmail] = useState("")

    // loading state variables
    let [loading, updateLoading] = useState("")
    let [success, updateSuccess] = useState("")
    let [error, updateError] = useState("")

    let handleSubmit = async (e) => {
        // prevent form from reloading page
        e.preventDefault();

        // alert user loading 
        updateError("")
        updateSuccess("")
        updateLoading("Submitting data.Please wait...")
        // confirm user data
        console.log(username, email, phone, password)

        // try sent  data to the server
        try {
            const user_data = new FormData()
            user_data.append("username", username)
            user_data.append("email", email)
            user_data.append("phone", phone)
            user_data.append("password", password)

            // use axios to sent data to server
            const response = await axios.post("https://brianm.alwaysdata.net/api/signup", user_data)
            console.log(response)

            if (response.status === 200) {
                updateSuccess(response.data.message)
                updateLoading("")
                updateUsername("")
                updateEmail("")
                updatePhone("")
                updatePassword("")
            }
        } catch (error) {
            console.log(error)
            updateLoading("")
            updateError(error.message)
        }
    }


    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>

                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>


                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="username"
                        required
                        value={username}
                        onChange={(e) => { updateUsername(e.target.value) }} />
                    <br />


                    <input
                        className="form-control"
                        type="email"
                        placeholder="enter email"
                        required
                        value={email}
                        onChange={(e) => { updateEmail(e.target.value) }} />
                    <br />


                    <input
                        className="form-control"
                        type="tel"
                        placeholder="enter phone number"
                        required
                        value={phone}
                        onChange={(e) => { updatePhone(e.target.value) }} />
                    <br />


                    <input
                        className="form-control"
                        type="password"
                        placeholder="enter password"
                        required
                        value={password}
                        onChange={(e) => { updatePassword(e.target.value) }} />
                    <br />


                    <button className="btn btn-dark">
                        Sign Up
                    </button><br />

                    <Link to="/signin">Alredy have an account?Sign in</Link>
                </form>
            </div>
        </div>
    );

}
export default SignUpComponent;