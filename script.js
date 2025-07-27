import { scoreParcel } from './scoreParcel.js';

async function applyFilters() {
  try {
    const res = await fetch('listings.json');
    if (!res.ok) throw new Error('Failed to fetch listings');
    const listings = await res.json();

    const lotSize = Number(document.getElementById('lotSize').value) || 0;
    const frontage = Number(document.getElementById('frontage').value) || 0;
    const zoning = document.getElementById('zoning').value.toUpperCase();
    const builderBettyThreshold = 15;

    const bettyParcels = listings
      .map(parcel => {
        const scored = { ...parcel, score: scoreParcel(parcel) };
        console.log('🏗️ Betty Parcel:', scored.address, 'Score:', scored.score);
        return scored;
      })
      .filter(parcel => parcel.score >= builderBettyThreshold);

    const useBetty = document.getElementById('bettyToggle').checked;
    const filtered = useBetty
      ? bettyParcels
      : listings.map(site => ({ ...site, score: scoreParcel(site) })).filter(site =>
          site.lotSize >= lotSize &&
          site.frontage >= frontage &&
          (!zoning || site.zoning.toUpperCase() === zoning)
        );

    const resultsContainer = document.getElementById('results');

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p>No matching deals found 👀</p>`;
      return;
    }

    resultsContainer.innerHTML = filtered.map(site => `
      <div class="card">
        <h3>${site.address}</h3>
        <img src="${site.sketch}" alt="Sketch for ${site.address}" class="sketch">
        <p>Size: ${site.lotSize}m² | Frontage: ${site.frontage}m</p>
        <p>Zoning: ${site.zoning}</p>
        ${site.score >= builderBettyThreshold ? '<p class="betty-badge">🏗️ Builder Betty Approved</p>' : ''}
      </div>
    `).join('');

    console.log('✅ Listings Loaded:', listings);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    document.getElementById('results').innerHTML = `<p>⚠️ Error loading listings</p>`;
  }
}
 window.applyFilters = applyFilters;
