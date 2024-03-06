"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Navigation from "./Navigation";
import GoogleAuth from "./GoogleAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";

type SignInForm = {
  email: string;
  password: string;
};
const schema = yup.object({
  email: yup
    .string()
    .email("invalid email address")
    .required("email field is required"),
  password: yup
    .string()
    .required("password field is required")
    .min(6, "password should be at least six charaters"),
});

const SignIn = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignInForm) => {
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userID", response.user.uid);
      router.replace("/dashboard");
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      // router.replace("/dashboard");
    }
  }, []); //eslint-disable-line
  return (
    <section className="auth">
      <form
        className="flex justify-center items-center flex-col w-full px-4 md:w-[500px] mx-auto py-1 pb-2 space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-white text-2xl font-semibold">
          Sign in to continue
        </h1>
        <div className="form-control w-full">
          <label className="w-full">
            <div className="label label-text text-white">Email</div>
            <span className="text-error">{errors.email?.message}</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("email")}
            />
          </label>
        </div>

        <div className="form-control w-full ">
          <label className="w-full">
            <div className="label label-text text-white">Password</div>
            <span className="text-error">{errors.password?.message}</span>

            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("password")}
            />
          </label>
        </div>

        {isSubmitting ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="btn btn-secondary btn-md inline-block w-full mt-6 text-xl font-bold transition-all ease-in-out hover:scale-95"
          >
            Login
          </button>
        )}
        <GoogleAuth />
        <Navigation
          text="Don't have an account?"
          linkText="Sign up"
          link="/signup"
        />
      </form>
    </section>
  );
};

export default SignIn;
