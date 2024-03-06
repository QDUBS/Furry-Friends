"use client";
import Container from "@/components/shared/Container";
import Spinner from "@/components/shared/Spinner";
import { database } from "@/firebase";
import { convertDate } from "@/utils/ConverDate";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentDetails = ({ params: { id } }: { params: { id: string } }) => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  // complete appointment
  const completeAppointment = async () => {
    if (
      confirm(
        "Clicking on the Button will change the state of the appointment to completed. Are your sure you want to continue"
      )
    ) {
      setFlag(true);
      try {
        const docRef = doc(database, "appointments", id);
        await updateDoc(docRef, { isCompleted: true });
        router.push("/admin");
        setFlag(true);
      } catch (error) {
        console.log(error);
        setFlag(true);
      }
    }
  };

  // cancle appointment

  const cancleAppointment = async () => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      try {
        const docRef = doc(database, "appointments", id);
        await deleteDoc(docRef);
        toast("Appointment deleted...");
        router.push("/admin");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const docRef = doc(database, "appointments", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          router.replace("/not-found");
          return;
        }
        setAppointment(docSnap.data() as Appointment);
      } catch (error) {}
    };

    getAppointment();
  }, [id, router]);

  return (
    <section className="container mx-auto">
      {!appointment ? (
        <div className="flex flex-col justify-center items-center h-full w-full mt-10">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <Container>
            <section className="flex justify-center gap-10 items-center px-3 mt-10 flex-col md:flex-row-reverse">
              <div className="h-48 w-48 flex flex-col justify-center items-center">
                <Image
                  src={appointment?.patient.avatar as string}
                  width={100}
                  height={100}
                  alt={appointment?.patient.firstName as string}
                  className="w-full h-full rounded shadow object-cover"
                />
              </div>
              <div className="space-y-1 md:space-y-2">
                <h2 className="text-xl font-bold py-1 mt-2">
                  Name: {appointment?.patient.firstName}{" "}
                  {appointment?.patient.lastName}
                </h2>

                <p className="font-semibold text-md md:text-xl">
                  Description:{" "}
                  <span className="font-normal">{appointment.description}</span>
                </p>
                <p className="font-semibold text-md md:text-xl">
                  Type:{" "}
                  <span className="font-normal">
                    {appointment.appointType}{" "}
                  </span>
                </p>
                <p className="font-semibold text-md md:text-xl">
                  Date:{" "}
                  <span className="font-normal">
                    {" "}
                    {convertDate(appointment.date.seconds)}{" "}
                  </span>
                </p>
                <p className="font-semibold text-md md:text-xl">
                  Patient ID{" "}
                  <span className="fort-normal">
                    {appointment.patient.userID}
                  </span>{" "}
                </p>
                <p className="flex flex-row font-semibold justify-between items-center">
                  Has Previous Recored:{" "}
                  <label>
                    <input
                      type="checkbox"
                      checked={appointment.hasPrevRecord}
                      className="checkbox "
                    />
                  </label>{" "}
                </p>

                <p className="flex flex-row font-semibold justify-between items-center">
                  Appointment Completed:{" "}
                  <label>
                    <input
                      type="checkbox"
                      checked={appointment.isCompleted}
                      className="checkbox"
                    />
                  </label>{" "}
                </p>

                {flag ? (
                  <div className="mt-6">
                    <Spinner />
                  </div>
                ) : (
                  <div>
                    {!appointment.isCompleted && !appointment.cancled && (
                      <button
                        className="btn btn-primary mt-16 block"
                        onClick={completeAppointment}
                      >
                        Finish Appointment session
                      </button>
                    )}
                  </div>
                )}

                {appointment.isCompleted ||
                  (appointment.cancled && (
                    <button
                      className="btn btn-error"
                      onClick={cancleAppointment}
                    >
                      Delete Appointmemt
                    </button>
                  ))}
              </div>
            </section>
          </Container>
        </Fragment>
      )}
    </section>
  );
};

export default AppointmentDetails;
