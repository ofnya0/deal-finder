// scoreParcel.js

/**
 * Calculates a feasibility score for a property parcel
 * based on zone, frontage, slope, and planning constraints.
 * @param {Object} parcel - Parcel data object
 * @returns {number} Parcel score
 */
function scoreParcel(parcel) {
  let score = 0;

  // ✅ Zoning logic
  if (parcel.zone === 'LMR') score += 10;
  else if (parcel.zone === 'MDR') score += 5;
  else score -= 5;

  // 📏 Frontage logic
  if (parcel.frontage >= 10) score += 5;
  else if (parcel.frontage >= 7.5) score += 2;

  // 🧮 Slope logic
  if (parcel.slope <= 5) score += 5;
  else if (parcel.slope <= 10) score += 2;
  else score -= 5;

  // 🏘️ Overlay penalties
  if (parcel.overlays?.includes('character')) score -= 5;

  // 🌊 Flood zone
  if (parcel.floodZone) score -= 5;

  // 🏛️ Heritage listing
  if (parcel.heritageListed) score -= 10;

  return score;
}

module.exports = scoreParcel;
