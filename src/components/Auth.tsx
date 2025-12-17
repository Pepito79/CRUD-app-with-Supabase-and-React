// components/Auth.tsx
function Auth() {
    return (
        <form
            className="  h-auto flex flex-col justify-center items-center gap-y-7">
            < h1 className="text-5xl font-bold mt-35  "> Sign In  </h1>
            <div className=" flex flex-col">
                <fieldset className="fieldset w-70 mb-5 ">
                    <legend className="fieldset-legend text-lg -mb-2  ">Email address</legend>
                    <input type="text" className="input" placeholder="Email" />
                </fieldset>

                <fieldset className="fieldset w-70 -mt-4">
                    <legend className="fieldset-legend text-lg font-bold -mb-2 ">Password</legend>
                    <input type="text" className="input" placeholder="Enter your password" />
                </fieldset>
            </div>
            <div className=" w-70 flex justify-evenly -mt-2">
                <button className="btn btn-md btn-primary ">Connect</button>
                <button className="btn btn-md btn-primary ">Sign Up</button>
            </div>
            {/* Logique de ton formulaire Supabase ici */}
        </form >
    );
}
export default Auth