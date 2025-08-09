import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const[loading,setLoading]=useState(false);

  const login = async (data) => {
    setLoading(true)
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
        setLoading(false)
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center w-full">
      <div
        className={`mx-auto w-[85%] h-full sm:max-w-md bg-slate-900 rounded-xl p-5 md:p-10 border border-slate-400`}
      >
        <div className="mb-5 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-white text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-300">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-4">
          <div className="space-y-4">
            <Input
            className="border-gray-400"
              label="Email:"
             placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
            className="border-gray-400"
              label="Password:"
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full mt-2 text-base cursor-pointer font-semibold">
              {loading ? "Plase Wait..":"Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
