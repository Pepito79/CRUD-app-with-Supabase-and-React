import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// components/Auth.tsx
function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullname: ""
    })


    // Verify if the token is stored in the local storage at loading of the page
    console.log(formData)
    function handleChange(event: any) {

        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value

            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.fullname
                }

            }
        });

        if (error) {
            alert("Erreur : " + error.message);
            return;
        }

        toast.success("Mail envoyé à " + formData.email)
        console.log("Utilisateur créé :", data.user);
        setFormData({ fullname: "", email: "", password: "" })
    };


    return (
        <form
            className="  h-auto flex flex-col justify-center items-center gap-y-7"
            onSubmit={handleSubmit}
        >
            < h1 className="text-5xl font-bold mt-35  "> Sign Up  </h1>
            <div className=" flex flex-col">
                <fieldset className="fieldset w-70 mb-1  mt-5 ">
                    <legend className="fieldset-legend text-lg -mb-2  ">Full Name</legend>
                    <input type="text"
                        className="input"
                        placeholder="Full name"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange} />
                </fieldset>
                <fieldset className="fieldset w-70 mb-5 ">
                    <legend className="fieldset-legend text-lg -mb-2  ">Email address</legend>
                    <input type="text"
                        className="input"
                        placeholder="Email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange} />
                </fieldset>

                <fieldset className="fieldset w-70 -mt-4">
                    <legend className="fieldset-legend text-lg font-bold -mb-2 ">Password</legend>
                    <input type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={handleChange} />
                </fieldset>
            </div>
            <div className=" w-70 flex justify-evenly -mt-2">
                <Link to={"/login"}>
                    <button className="btn btn-md btn-primary ">Sign In</button>
                </Link>
                <button className="btn btn-md btn-primary " type="submit">Sign Up</button>
            </div>
        </form >
    );
}
export default SignUp