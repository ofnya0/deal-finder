/**
 * Calculates a feasibility score for a property parcel
 * based on zone, frontage, slope, and planning constraints.
 * @param {Object} parcel - Parcel data object
 * @returns {number} Parcel score
 */
export function scoreParcel(parcel) {
  if (!parcel || typeof parcel !== 'object') return 0;

  const {
    lotSize: size,
    frontage,
    zoning,
    slope = 0,
    overlays = [],
    floodZone = false,
    heritageListed = false
  } = parcel;

  if (!size || !frontage || !zoning) {
    console.warn('⚠️ Missing parcel attributes:', parcel);
    return 0;
  }

  let score = 0;

  // 🧭 Zoning
  const zoneWeights = {
    LDR: 1,
    MDR: 2,
    GRZ: 3,
    // Extendable: add more zones here
  };
  const zoneScore = zoneWeights[zoning.trim().toUpperCase()] ?? -5;
  score += zoneScore;

  // 📏 Frontage
  score += frontage >= 10 ? 5 : frontage >= 7.5 ? 2 : 0;

  // 🧮 Slope
  score += slope <= 5 ? 5 : slope <= 10 ? 2 : -5;

  // 🏘️ Overlays
  if (overlays.includes('character')) score -= 5;

  // 🌊 Flood zone
  if (floodZone) score -= 5;

  // 🏛️ Heritage
  if (heritageListed) score -= 10;

  // 🔍 Debug log (optional)
  // console.log(`📊 Score breakdown for ${parcel.address}:`, { zoneScore, frontage, slope, score });

  return score;
}
