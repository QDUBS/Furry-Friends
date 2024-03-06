"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, database, storage } from "@/firebase";
import { v4 as uuidV4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";

type ProfileForm = {
  firstName: string;
  lastName: string;
  matNo: string;
  address: string;
  avatar: string;
};
const schema = yup.object({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  address: yup.string().required("please enter your address"),
  matNo: yup
    .string()
    .required("Please enter your MatNo")
    .min(10, "invalid mat number")
    .max(10, "invalid mat number"),
  avatar: yup.string().required("please provide a profile picture"),
});

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [uploadingFile, setUploadingFile] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingFile(true);
      // @ts-ignore
      const file = event?.target?.files[0];
      const imageRef = ref(storage, `profile/${uuidV4()}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setValue("avatar", url);
      setUploadingFile(false);
    } catch (error) {}
  };
  const onSubmit = async (data: ProfileForm) => {
    console.log(data);
    try {
      const collectionRef = collection(database, "profile");
      await addDoc(collectionRef, {
        ...data,
        userID: user?.uid,
      });
      router.replace("/dashboard");
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  if (loading) return;
  return (
    <section className="auth">
      <form
        noValidate
        className="flex justify-center items-center flex-col w-full px-4 md:w-[500px] mx-auto py-2 space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-white text-2xl font-semibold">
          Create your profile
        </h1>
        <div className="form-control w-full">
          <label className="w-full">
            <div className="label label-text text-white">First name</div>
            <span className="text-error">{errors.firstName?.message}</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("firstName")}
            />
          </label>
        </div>

        <div className="form-control w-full ">
          <label className="w-full">
            <div className="label label-text text-white">Last Name</div>
            <span className="text-error">{errors.lastName?.message}</span>

            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("lastName")}
            />
          </label>
        </div>

        <div className="form-control w-full ">
          <label className="w-full">
            <div className="label label-text text-white">
              Matriculation number
            </div>
            <span className="text-error">{errors.matNo?.message}</span>

            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("matNo")}
            />
          </label>
        </div>
        <div className="form-control w-full ">
          <label className="w-full">
            <div className="label label-text text-white">Address</div>
            <span className="text-error">{errors.address?.message}</span>

            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("address")}
            />
          </label>
        </div>
        <div className="form-control w-full">
          <div className="label label-text text-white">Profile Picure</div>
          <span className="text-error">{errors.avatar?.message}</span>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={uploadFile}
          />
        </div>
        {isSubmitting ? (
          <Spinner />
        ) : (
          <button
            disabled={uploadingFile}
            type="submit"
            className="btn btn-secondary btn-md inline-block w-full mt-6 text-xl font-bold transition-all ease-in-out hover:scale-95"
          >
            {uploadingFile ? "Please wait" : "Submit"}
          </button>
        )}
      </form>
    </section>
  );
};

export default Profile;
