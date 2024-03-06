import { convertDate } from "@/utils/ConverDate";
import React from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
type TableData = {
  userAppointments: Appointment[];
  cancleAppointment: (id: string) => void;
  deleteAppointment: (id: string) => void;
};
const Table = ({
  userAppointments,
  cancleAppointment,
  deleteAppointment,
}: TableData) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Cancled</th>
            <th></th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {userAppointments.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">
                      {convertDate(item.date.seconds)}
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.doctor}</td>
              <td>
                {item.cancled ? (
                  <span>
                    <CiCircleRemove size={40} color="red" />
                  </span>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() => cancleAppointment(item.id)}
                  >
                    Cancle
                  </button>
                )}
              </td>

              <td>
                <button
                  className="btn btn-error"
                  onClick={() => deleteAppointment(item.id)}
                >
                  Delete
                </button>
              </td>

              <td>
                {item.isCompleted && (
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      id=""
                      checked={item.isCompleted}
                    />
                  </label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
