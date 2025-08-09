import React, { use, useState } from "react";
import authService from "../appWrite/auth";
import { login } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";

function Signup() {
  const [error, SetError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    SetError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      SetError(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center ">
      <div
        className={`mx-auto w-[85%] h-full sm:max-w-md bg-transparent
        rounded-xl p-5 md:p-10 border border-gray-400`}
      >
        <div className="mb-5 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100px" />
          </span>
        </div>

        <h2 className="text-white text-center text-xl sm:text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2  text-center text-base text-gray-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

         <form onSubmit={handleSubmit(create)} className="">
                    <div className='space-y-1 mt-2'>
                        <Input
                        className="border-gray-400"
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        className="border-gray-400"
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        className="border-gray-400"
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full mt-4 cursor-pointer">
                            Create Account
                        </Button>
                    </div>
                </form>
      </div>
    </div>
  );
}

export default Signup;
