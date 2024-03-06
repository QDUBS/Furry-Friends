type UserProfile = {
  address: string;
  avatar: string;
  firstName: string;
  id: string;
  lastName: string;
  matNo: string;
  userID: string;
};
type Patient = {
  address: string;
  avatar: string;
  firstName: string;
  id: string;
  lastName: string;
  matNo: string;
  userID: string;
};

type Appointment = {
  appointType: string;
  cancled: boolean;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  description: string;
  hasPrevRecord: boolean;
  id: string;
  isCompleted: boolean;
  patient: Patient;
  doctor: string;
};
