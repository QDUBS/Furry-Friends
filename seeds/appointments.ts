import { appointmentTypes } from "@/constants/appointments";
import { database } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

async function seedAppointmemt() {
  try {
    const collectionRef = collection(database, "appointmentTypes");
    appointmentTypes.forEach(async (item) => {
      await addDoc(collectionRef, item);
      console.log(`${item.type} addded to database`);
    });
  } catch (error) {
    console.log(error);
  }
}

export default seedAppointmemt;
