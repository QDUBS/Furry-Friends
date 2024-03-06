"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Navigation from "./Navigation";
import GoogleAuth from "./GoogleAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
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
  confirmPassword: yup
    .string()
    .required("please confirm your password")
    .min(6, "password should be at least six charaters")
    .oneOf([yup.ref("password")], "password does not match"),
});

const SignUp = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpForm) => {
    const { email, password } = data;
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userID", response.user.uid);

      router.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      // router.replace("/dashboard");
    }
  }, []); // eslint-disable-line
  return (
    <section className="auth">
      <form
        className="flex justify-center items-center flex-col w-full px-4 md:w-[500px] mx-auto pt-1 space-y-3 shadow-xl py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-white text-2xl font-semibold">
          Sign Up for an account
        </h1>

        <div className="form-control w-full">
          <label className="w-full">
            <div className="label label-text text-white">Email</div>
            <span className="text-error">{errors.email?.message}</span>
            <input
              type="text"
              placeholder="your email"
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
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password")}
            />
          </label>
        </div>

        <div className="form-control w-full ">
          <label className="w-full">
            <div className="label label-text text-white">Confirm Password</div>
            <span className="text-error">
              {errors.confirmPassword?.message}
            </span>

            <input
              type="password"
              placeholder="confirm your password"
              className="input input-bordered w-full"
              {...register("confirmPassword")}
            />
          </label>
        </div>
        {isSubmitting ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="btn btn-secondary btn-md inline-block w-full mt-6 text-xl font-bold transition-all ease-in-out hover:scale-95 mb-5"
          >
            Login
          </button>
        )}
        <GoogleAuth />
        <Navigation
          text="Already have an account?"
          linkText="Sign In"
          link="/signin"
        />
      </form>
    </section>
  );
};

export default SignUp;
