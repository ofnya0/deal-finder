// ParcelList.jsx
import React from "react";

export default function ParcelList({ parcels }) {
  return (
    <ul>
      {parcels.map(parcel => (
        <li key={parcel.id}>
          <strong>{parcel.address}</strong> — Score: {parcel.score}
        </li>
      ))}
    </ul>
  );
}
