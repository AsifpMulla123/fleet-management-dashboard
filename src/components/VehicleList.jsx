// import React, { useState } from "react";
// import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// export default function VehicleList({
//   vehicles = [],
//   onAddVehicle,
//   onUpdateVehicle,
//   onRemoveVehicle,
// }) {
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [newVehicle, setNewVehicle] = useState({
//     id: "",
//     batteryPercentage: 100,
//     distanceTravelled: 0,
//     lastChargeTime: new Date().toISOString(),
//     status: "Idle",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       onUpdateVehicle(newVehicle);
//       setEditingId(null);
//     } else {
//       onAddVehicle(newVehicle);
//       setIsAdding(false);
//     }
//     setNewVehicle({
//       id: "",
//       batteryPercentage: 100,
//       distanceTravelled: 0,
//       lastChargeTime: new Date().toISOString(),
//       status: "Idle",
//     });
//   };

//   const handleEdit = (vehicle) => {
//     setEditingId(vehicle.id);
//     setNewVehicle(vehicle);
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Vehicle Management</h2>
//       <button
//         onClick={() => setIsAdding(true)}
//         className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         <PlusIcon className="h-5 w-5 inline-block mr-2" />
//         Add Vehicle
//       </button>
//       {(isAdding || editingId) && (
//         <form
//           onSubmit={handleSubmit}
//           className="mb-4 p-4 bg-white rounded shadow"
//         >
//           <input
//             type="text"
//             placeholder="Vehicle ID"
//             value={newVehicle.id}
//             onChange={(e) =>
//               setNewVehicle({ ...newVehicle, id: e.target.value })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Battery Percentage"
//             value={newVehicle.batteryPercentage}
//             onChange={(e) =>
//               setNewVehicle({
//                 ...newVehicle,
//                 batteryPercentage: Number(e.target.value),
//               })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//             min="0"
//             max="100"
//           />
//           <input
//             type="number"
//             placeholder="Distance Travelled (km)"
//             value={newVehicle.distanceTravelled}
//             onChange={(e) =>
//               setNewVehicle({
//                 ...newVehicle,
//                 distanceTravelled: Number(e.target.value),
//               })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//             min="0"
//           />
//           <select
//             value={newVehicle.status}
//             onChange={(e) =>
//               setNewVehicle({ ...newVehicle, status: e.target.value })
//             }
//             className="mb-2 p-2 border rounded w-full"
//             required
//           >
//             <option value="In Transit">In Transit</option>
//             <option value="Charging">Charging</option>
//             <option value="Idle">Idle</option>
//           </select>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             {editingId ? "Update" : "Add"} Vehicle
//           </button>
//         </form>
//       )}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">ID</th>
//               <th className="px-4 py-2 text-left">Battery</th>
//               <th className="px-4 py-2 text-left">Distance</th>
//               <th className="px-4 py-2 text-left">Last Charge</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vehicles.map((vehicle) => (
//               <tr
//                 key={vehicle.id}
//                 className={vehicle.batteryPercentage < 15 ? "bg-red-100" : ""}
//               >
//                 <td className="px-4 py-2">{vehicle.id}</td>
//                 <td className="px-4 py-2">{vehicle.batteryPercentage}%</td>
//                 <td className="px-4 py-2">{vehicle.distanceTravelled} km</td>
//                 <td className="px-4 py-2">
//                   {new Date(vehicle.lastChargeTime).toLocaleString()}
//                 </td>
//                 <td className="px-4 py-2">{vehicle.status}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleEdit(vehicle)}
//                     className="text-blue-500 hover:text-blue-700 mr-2"
//                   >
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={() => onRemoveVehicle(vehicle.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <TrashIcon className="h-5 w-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useCallback } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const initialVehicleState = {
  id: "",
  batteryPercentage: 100,
  distanceTravelled: 0,
  lastChargeTime: new Date().toISOString(),
  status: "Idle",
};

export default function VehicleList({
  vehicles = [],
  onAddVehicle,
  onUpdateVehicle,
  onRemoveVehicle,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newVehicle, setNewVehicle] = useState(initialVehicleState);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (editingId) {
        onUpdateVehicle(newVehicle);
        setEditingId(null);
      } else {
        onAddVehicle(newVehicle);
        setIsAdding(false);
      }
      setNewVehicle(initialVehicleState);
    },
    [editingId, newVehicle, onAddVehicle, onUpdateVehicle]
  );

  const handleEdit = useCallback((vehicle) => {
    setEditingId(vehicle.id);
    setNewVehicle(vehicle);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]:
        name === "batteryPercentage" || name === "distanceTravelled"
          ? Number(value)
          : value,
    }));
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Vehicle Management</h2>
      <button
        onClick={() => setIsAdding(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <PlusIcon className="h-5 w-5 inline-block mr-2" />
        Add Vehicle
      </button>
      {(isAdding || editingId) && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-4 bg-white rounded shadow"
        >
          <input
            type="text"
            name="id"
            placeholder="Vehicle ID"
            value={newVehicle.id}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="number"
            name="batteryPercentage"
            placeholder="Battery Percentage"
            value={newVehicle.batteryPercentage}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
            required
            min="0"
            max="100"
          />
          <input
            type="number"
            name="distanceTravelled"
            placeholder="Distance Travelled (km)"
            value={newVehicle.distanceTravelled}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
            required
            min="0"
          />
          <select
            name="status"
            value={newVehicle.status}
            onChange={handleInputChange}
            className="mb-2 p-2 border rounded w-full"
            required
          >
            <option value="In Transit">In Transit</option>
            <option value="Charging">Charging</option>
            <option value="Idle">Idle</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editingId ? "Update" : "Add"} Vehicle
          </button>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Battery</th>
              <th className="px-4 py-2 text-left">Distance</th>
              <th className="px-4 py-2 text-left">Last Charge</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className={vehicle.batteryPercentage < 15 ? "bg-red-100" : ""}
              >
                <td className="px-4 py-2">{vehicle.id}</td>
                <td className="px-4 py-2">{vehicle.batteryPercentage}%</td>
                <td className="px-4 py-2">{vehicle.distanceTravelled} km</td>
                <td className="px-4 py-2">
                  {new Date(vehicle.lastChargeTime).toLocaleString()}
                </td>
                <td className="px-4 py-2">{vehicle.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onRemoveVehicle(vehicle.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}