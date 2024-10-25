import React, { useState, useCallback } from "react";

export default function ChargingSchedule({ vehicles = [], onScheduleCharge }) {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [chargeTime, setChargeTime] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedVehicle && chargeTime) {
        onScheduleCharge(selectedVehicle, chargeTime);
        setSelectedVehicle("");
        setChargeTime("");
      }
    },
    [selectedVehicle, chargeTime, onScheduleCharge]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Charging Schedule</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        >
          <option value="">Select a vehicle</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.id} - Battery: {v.batteryPercentage}%
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={chargeTime}
          onChange={(e) => setChargeTime(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Schedule Charge
        </button>
      </form>
      <div>
        <h3 className="text-lg font-medium mb-2">Scheduled Charges</h3>
        <ul>
          {vehicles
            .filter((v) => v.scheduledCharge)
            .map((v) => (
              <li key={v.id} className="mb-2">
                {v.id} - {new Date(v.scheduledCharge).toLocaleString()}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
