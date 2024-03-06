import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { useRouter } from "next/navigation";
const GoogleAuth = () => {
  const router = useRouter();
  async function googleAuth() {
    try {
      signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      onClick={googleAuth}
      type="button"
      className="btn inline-flex justify-center items-center text-sm md:text-xl btn-md w-full mt-10"
    >
      <FcGoogle size={30} />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleAuth;
