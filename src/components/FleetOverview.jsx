import React from "react";

export default function FleetOverview({ vehicles = [] }) {
  const totalVehicles = vehicles.length;
  const inTransit = vehicles.filter((v) => v.status === "In Transit").length;
  const charging = vehicles.filter((v) => v.status === "Charging").length;
  const idle = vehicles.filter((v) => v.status === "Idle").length;

  const averageBattery =
    vehicles.length > 0
      ? (
          vehicles.reduce((sum, v) => sum + v.batteryPercentage, 0) /
          totalVehicles
        ).toFixed(2)
      : 0;
  const lowBatteryVehicles = vehicles.filter(
    (v) => v.batteryPercentage < 20
  ).length;

  const estimatedChargeTime = charging * 100; // Assuming 100 minutes for a full charge

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Fleet Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium">Vehicle Status</h3>
          <p>Total Vehicles: {totalVehicles}</p>
          <p>In Transit: {inTransit}</p>
          <p>Charging: {charging}</p>
          <p>Idle: {idle}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Battery Health</h3>
          <p>Average Battery: {averageBattery}%</p>
          <p>Low Battery Vehicles: {lowBatteryVehicles}</p>
          <p>Est. Full Charge Time: {estimatedChargeTime} minutes</p>
        </div>
      </div>
    </div>
  );
}