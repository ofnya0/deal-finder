// scoreParcel.js

/**
 * Calculates a feasibility score for a property parcel
 * based on zone, frontage, slope, and planning constraints.
 * @param {Object} parcel - Parcel data object
 * @returns {number} Parcel score
 */
function scoreParcel(parcel) {
  if (!parcel || typeof parcel !== 'object') return 0;

  const {
    size,
    frontage,
    zoning,
    slope,
    overlays,
    floodZone,
    heritageListed
  } = parcel;

  // Validation
  if (!size || !frontage || !zoning) {
    console.warn('Missing parcel attributes:', parcel);
    return 0;
  }

  let score = 0;

  // 🧭 Zoning weight
  const zoneWeights = { 'LDR': 1, 'MDR': 2, 'GRZ': 3 };
  score += zoneWeights[zoning.trim().toUpperCase()] ?? -5;

  // 📏 Frontage
  if (frontage >= 10) score += 5;
  else if (frontage >= 7.5) score += 2;

  // 🧮 Slope
  if (slope <= 5) score += 5;
  else if (slope <= 10) score += 2;
  else score -= 5;

  // 🏘️ Overlays
  if (overlays?.includes('character')) score -= 5;

  // 🌊 Flood zone
  if (floodZone) score -= 5;

  // 🏛️ Heritage
  if (heritageListed) score -= 10;

  return score;
}


module.exports = scoreParcel;
