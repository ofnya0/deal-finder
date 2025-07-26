import React, { useState } from "react";
import ScoreDropdown from "../components/ScoreDropdown";
import { scoreParcel } from "../utils/scoreParcel";
import listings from "../../data/listings.json";
import ParcelList from "../components/ParcelList";

export default function ResultsPage() {
  const [minScore, setMinScore] = useState(10);

  const scoredParcels = listings
    .map(parcel => ({ ...parcel, score: scoreParcel(parcel) }))
    .filter(parcel => parcel.score >= minScore);

  return (
    <div>
      <ScoreDropdown value={minScore} onChange={setMinScore} />
      <ParcelList parcels={scoredParcels} />
    </div>
  );
}
