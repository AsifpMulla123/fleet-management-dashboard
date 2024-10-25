import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const VehicleList = lazy(() => import("./VehicleList"));
const FleetOverview = lazy(() => import("./FleetOverview"));
const ChargingSchedule = lazy(() => import("./ChargingSchedule"));

const Loader = () => {
  <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"></div>;
};

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const savedVehicles = localStorage.getItem("fleetVehicles");
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fleetVehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          if (vehicle.status === "In Transit") {
            return {
              ...vehicle,
              batteryPercentage: Math.max(0, vehicle.batteryPercentage - 1),
              distanceTravelled: vehicle.distanceTravelled + 3,
            };
          } else if (vehicle.status === "Charging") {
            return {
              ...vehicle,
              batteryPercentage: Math.min(100, vehicle.batteryPercentage + 1),
            };
          }
          return vehicle;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addVehicle = useCallback((vehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
  }, []);

  const updateVehicle = useCallback((updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
    );
  }, []);

  const removeVehicle = useCallback((id) => {
    setVehicles((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
  }, []);

  const scheduleCharge = useCallback((id, time) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) =>
        v.id === id ? { ...v, scheduledCharge: time } : v
      )
    );
  }, []);

  const batteryData = vehicles.map((v) => ({
    name: v.id,
    battery: v.batteryPercentage,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Fleet Management Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<Loader />}>
          <FleetOverview vehicles={vehicles} />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <ChargingSchedule
            vehicles={vehicles}
            onScheduleCharge={scheduleCharge}
          />
        </Suspense>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Fleet Battery Health</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={batteryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="battery" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Suspense fallback={<Loader />}>
        <VehicleList
          vehicles={vehicles}
          onAddVehicle={addVehicle}
          onUpdateVehicle={updateVehicle}
          onRemoveVehicle={removeVehicle}
        />
      </Suspense>
    </div>
  );
}
