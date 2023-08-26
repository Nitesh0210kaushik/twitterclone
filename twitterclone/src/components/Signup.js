import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../App.css";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async(e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {

                console.log("User registered successfully");

                const responseData = await response.json();
                console.warn(responseData)
                const token = responseData.token;

                Cookies.set("token", token);
                Cookies.set('isLoggedIn', true);

                navigate("/home");
            } else {
                console.error("Error registering user");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return ( <
        div className = "signupform" >
        <
        form onSubmit = { handleSignup } >
        <
        label htmlFor = "name" > Name < /label> <
        input type = "text"
        id = "name"
        name = "name"
        placeholder = "Enter your name"
        value = { name }
        onChange = {
            (e) => setName(e.target.value) }
        />

        <
        label htmlFor = "email" > Email address < /label> <
        input type = "email"
        id = "email"
        placeholder = "Enter email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        /> <
        small > We 'll never share your email with anyone else.</small>

        <
        label htmlFor = "password" > Password < /label> <
        input type = "password"
        id = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        />

        <
        label htmlFor = "confirmPassword" > Confirm Password < /label> <
        input type = "password"
        id = "confirmPassword"
        placeholder = "Confirm Password"
        value = { confirmPassword }
        onChange = {
            (e) => setConfirmPassword(e.target.value) }
        />

        <
        button type = "submit" > Sign Up < /button> <
        /form> <
        /div>
    );
}

export default Signup;