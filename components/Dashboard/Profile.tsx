"use client";
import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "@/firebase";
import { useRouter } from "next/navigation";
import Skeleton from "../shared/Skelleton";
import Image from "next/image";
import { useContextProvider } from "@/context/Context";
type UserProfile = {
  address: string;
  avatar: string;
  firstName: string;
  id: string;
  lastName: string;
  matNo: string;
  userID: string;
};
const Profile = () => {
  const [isFeteching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState<UserProfile>();
  const { setUserProfile } = useContextProvider();
  const router = useRouter();

  useEffect(() => {
    async function getUserProfile() {
      try {
        const userID = localStorage.getItem("userID");
        const collectionRef = collection(database, "profile");
        const queryRef = query(collectionRef, where("userID", "==", userID));

        const unSubscribe = onSnapshot(queryRef, (snapShots) => {
          const data = snapShots.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          if (data.length === 0) {
            return router.push("/profile");
          }
          setProfile(data[0] as UserProfile);
          setUserProfile(data[0]);
          setIsFetching(false);
        });

        return unSubscribe;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    }

    getUserProfile();
  }, []); //eslint-disable-line

  if (isFeteching) return <Skeleton />;
  return (
    <Container>
      <section className="flex flex-col justify-center items-center">
        <div className=" w-32 md:h-32 md:w-40 h-40 rounded">
          <Image
            src={profile?.avatar as string}
            width={100}
            height={100}
            alt={profile?.firstName as string}
            className="w-full h-full rounded shadow object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold py-1 mt-2">
            {profile?.firstName} {profile?.lastName}
          </h2>
          <p className="font-semibold uppercase text-sm">
            MatNo: {profile?.matNo}
          </p>
          <p className="font-semibold uppercase text-sm">
            Address: {profile?.address}
          </p>
        </div>
      </section>
    </Container>
  );
};

export default Profile;
