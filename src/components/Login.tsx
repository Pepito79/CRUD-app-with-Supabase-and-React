import { useState } from "react";
import { supabase } from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setUser }: any) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();

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

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        console.log(data)

        if (error) {
            toast.error("Erreur : " + error.message);
            return;
        }


        setUser(data.user)

        console.log("Utilisateur logged in avec succès :", data.user);
        setFormData({ email: "", password: "" })
        toast.success(`Connecté avec succès : ${data.user?.email}`);
        navigate("/todoBoard")
    };


    return (
        <form
            className="  h-auto flex flex-col justify-center items-center gap-y-7"
            onSubmit={handleSubmit}
        >
            < h1 className="text-5xl font-bold mt-35  "> Login  </h1>
            <div className=" flex flex-col">

                <fieldset className="fieldset w-70 mb-5 ">
                    <legend className="fieldset-legend text-lg -mb-2  ">Email address</legend>
                    <input type="text"
                        className="input"
                        placeholder="email"
                        name="email"
                        value={formData.email}
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
                <Link to={"/"}>
                    <button className="btn btn-md btn-primary ">Sign Up</button>
                </Link>
                <button className="btn btn-md btn-primary " type="submit">Login</button>
            </div>
        </form >
    );
}
export default Login