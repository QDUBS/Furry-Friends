"use client";
import { auth, database } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Spinner from "../shared/Spinner";
import Image from "next/image";
import { convertDate } from "@/utils/ConverDate";
import Link from "next/link";
import { toast } from "react-toastify";

const Table = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const {} = useAuthState(auth);

  const cancleAppointment = async (id: string) => {
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
    const getAllAppointment = async () => {
      const collectionRef = collection(database, "appointments");
      const queryRef = query(collectionRef);
      const unSubscribe = onSnapshot(queryRef, (snaphots) => {
        const data = snaphots.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }));
        setAppointments(data as Appointment[]);
      });
      return unSubscribe;
    };

    getAllAppointment();
  }, []);

  return (
    <main>
      {appointments.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full w-full mt-10">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label></label>
                  </th>
                  <th>Name</th>
                  <th>Problem Description</th>
                  <th>Doctor </th>
                  <th>Completed </th>
                  <th>Cancled </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item.id}>
                    <th></th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              src={item.patient.avatar}
                              width={30}
                              height={30}
                              alt={item.patient.firstName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {item.patient.firstName} {item.patient.lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            {item.appointType}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.description}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {convertDate(item.date.seconds)}
                      </span>
                    </td>

                    <td>{item.doctor}</td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={item.isCompleted}
                        />
                      </label>
                    </td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={item.cancled}
                        />
                      </label>
                    </td>
                    <th>
                      <button className="btn btn-neutral ">
                        <Link href={`/admin/${item.id}`}>Details</Link>
                      </button>
                    </th>

                    <th>
                      <button
                        className="btn btn-error"
                        onClick={() => cancleAppointment(item.id)}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </main>
  );
};

export default Table;
