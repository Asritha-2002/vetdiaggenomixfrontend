import React from "react";
import { format } from "date-fns";
import { Eye, Dog, Cat, Bird, MapPin, Clock } from "lucide-react";
// import StatusBadge from "../components/Appointment/StatusBadge";
import StatusBadge from "../components/appointments/StatusBadge";

const petIcons = {
  dog: Dog,
  cat: Cat,
  bird: Bird,
};

export default function AppointmentMobileCards({ appointments, onView }) {
  if (!appointments?.length) return null;

  return (
    <div className="space-y-4">
      {appointments.map((apt) => {
        const PetIcon = petIcons[apt.petCategory] || Dog;

        return (
          <div
            key={apt._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{apt.name}</p>
                <p className="text-xs text-gray-500">{apt.email}</p>
              </div>

              <StatusBadge status={apt.status} />
            </div>

            {/* Service */}
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-green-100 p-1 rounded-full">
                <PetIcon className="w-4 h-4 text-green-800" />
              </div>
              <div>
                <p className="text-sm font-medium">{apt.service}</p>
                <p className="text-xs text-gray-500 capitalize">
                  {apt.petCategory}
                </p>
              </div>
            </div>

            {/* Date + Time */}
            <div className="flex items-center justify-between mt-3 text-sm">
              <div>
                <p className="font-medium">
                  {format(new Date(apt.dateOfAppointment), "MMM dd, yyyy")}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {apt.time}
                </p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                {apt.location}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => onView(apt)}
              className="mt-4 w-full flex items-center justify-center gap-2 text-green-600 border border-green-200 rounded-lg py-2 hover:bg-green-50"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}