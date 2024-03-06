"use client";
import Container from "@/components/shared/Container";
import React, { useEffect, useState } from "react";
import booking from "@/assets/images/booking.jpg";
import Image from "next/image";
import seedAppointmemt from "@/seeds/appointments";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import { auth, database } from "@/firebase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as yup from "yup";
import { SlCalender } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContextProvider } from "@/context/Context";
import Spinner from "@/components/shared/Spinner";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = yup.object({
  description: yup
    .string()
    .max(100, "Description should not be more 100 characters")
    .min(15, "please, enter a clear description"),
  hasPrevRecord: yup.boolean(),
  appointType: yup.string().required("please select an appointment"),
});

type AppointType = {
  description: string;
  hasPrevRecord: boolean;
  appointType: string;
};

type AppoinmentTypes = {
  id: string;
  date: Date;
  type: string;
  doctor: string;
}[];

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const AppointmentForm = () => {
  const [appointType, setAppointType] = useState<AppoinmentTypes>([]);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [value, onChange] = useState<Value>(new Date());
  const { userProfile } = useContextProvider();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AppointType>({
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      hasPrevRecord: false,
      description: "",
    },
  });

  const onSubmit = async (fields: AppointType) => {
    if (!value) {
      return setValue("appointType", "Please select an availble date");
    }

    const selectedAppointment = getValues("appointType");
    const doctor = appointType.find(
      (item: { type: string }) => item.type === selectedAppointment
    )?.doctor;
    const data = {
      ...fields,
      isCompleted: false,
      cancled: false,
      doctor,
      date: value,
      patient: { ...userProfile },
    };
    try {
      const docRef = collection(database, "appointments");
      await addDoc(docRef, data);
      toast("Appointment succesfully booked");
      router.push("/dashboard/appointments");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userProfile) {
      return router.push("/dashboard");
    }
    async function getAppointmentTypes() {
      const collectionRef = collection(database, "appointmentTypes");
      const queryRef = query(collectionRef);
      const unSubscribe = onSnapshot(queryRef, (snapshot) => {
        const data = snapshot.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }));
        setAppointType(data as AppoinmentTypes);
      });

      return unSubscribe;
    }

    getAppointmentTypes();
  }, []); //eslint-disable-line

  return (
    <Container>
      <section className="flex flex-row justify-between items-end gap-10 px-3">
        {/* <div className="w-full hidden md:block">
          <Image
            src={booking}
            width={300}
            height={100}
            alt="Booking image"
            className="w-full"
          />
        </div> */}

        <form
          className="w-full md:w-[600px] mx-auto shadow-md px-3 py-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl font-semibold my-3 text-primary md:text-3xl">
            Book an appointments with us today
          </h1>
          {/* <div className="form-control my-5 w-full">
            <label className="label label-text"></label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div> */}
          {appointType.length === 0 ? (
            <div className="skeleton w-full h-10 py-3 "></div>
          ) : (
            <div className="form-control my-5 w-full">
              <label className="label label-text">Select Appointment</label>
              <select
                className="select select-primary w-full"
                {...register("appointType")}
              >
                {appointType.map((app: any) => (
                  <option key={app.id}>{app.type}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Do you have a previous record to this
              </span>
              <input
                type="checkbox"
                {...register("hasPrevRecord")}
                className="checkbox"
              />
            </label>
          </div>

          <div className="form-control my-5">
            <span className="text-error">{errors.description?.message}</span>

            <label className="label label-text">Give short description</label>
            <textarea
              className="textarea textarea-bordered h-24 resize-none"
              placeholder="short description"
              {...register("description")}
            ></textarea>
          </div>
          <div className="form-control my-5">
            <label className="label label-text">Appointment Date</label>
            <span className="text-error">{errors.appointType?.message}</span>
            <button
              type="button"
              onClick={() => setIsCalenderOpen(!isCalenderOpen)}
              className="btn flex flex-row items-center justify-between nt-4"
            >
              <span>{value ? value.toLocaleString() : "DD MM YY"}</span>
              <SlCalender />
            </button>
            {isCalenderOpen && <Calendar onChange={onChange} value={value} />}
          </div>
          {isSubmitting ? (
            <div className="w-full btn btn-md inline-block">
              <Spinner />
            </div>
          ) : (
            <button className="btn btn-md inline-block w-full" type="submit">
              Submit
            </button>
          )}
        </form>
      </section>
    </Container>
  );
};

export default AppointmentForm;
