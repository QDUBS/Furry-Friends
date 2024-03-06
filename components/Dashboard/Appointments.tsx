"use client";
import React, { Fragment, useEffect, useState } from "react";
import Table from "./Table";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "@/firebase";
import { useContextProvider } from "@/context/Context";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";
import { toast } from "react-toastify";

const Appointments = () => {
  const { userProfile } = useContextProvider();
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  // complete appointment
  const cancleAppointment = async (id: string) => {
    if (confirm("Are you sure you want to cancle this appoinment?")) {
      setFlag(true);
      try {
        const docRef = doc(database, "appointments", id);
        await updateDoc(docRef, { cancled: true });
        setFlag(true);
      } catch (error) {
        setFlag(true);
      }
    }
  };

  // cancle appointment
  const deleteAppointment = async (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      try {
        const docRef = doc(database, "appointments", id);
        await deleteDoc(docRef);
        toast("Appointment deleted...");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    async function getUserAppointment() {
      try {
        const collectionRef = collection(database, "appointments");
        const queryRef = query(
          collectionRef,
          where("patient.id", "==", userProfile.id)
        );
        const unSubscribe = onSnapshot(queryRef, (snapshots) => {
          const data = snapshots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          setUserAppointments(data as Appointment[]);
        });

        return unSubscribe;
      } catch (error) {
        router.push("/dashboard");
      }
    }

    getUserAppointment();
  }, []); //eslint-disable-line
  return (
    <div>
      {userAppointments.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3 className="text-xl font-semibold">Your Appointments</h3>
          <Table
            userAppointments={userAppointments}
            cancleAppointment={cancleAppointment}
            deleteAppointment={deleteAppointment}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Appointments;
