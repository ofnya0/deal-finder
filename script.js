import { scoreParcel } from './scoreParcel.js';

async function applyFilters() {
  try {
    const res = await fetch('listings.json');
    if (!res.ok) throw new Error('Failed to fetch listings');
    const listings = await res.json();

    // 🔧 Normalize lotSize to size
    const normalizedListings = listings.map(parcel => ({
      ...parcel,
      size: parcel.lotSize ?? parcel.size,
    }));

    // 🧮 Get filter input values
    const lotSize = Number(document.getElementById('lotSize').value) || 0;
    const frontage = Number(document.getElementById('frontage').value) || 0;
    const zoning = document.getElementById('zoning').value.toUpperCase();
    const builderBettyThreshold = 15;

    const useBetty = document.getElementById('bettyToggle').checked;

    // 🏗️ Builder Betty flow
    const bettyParcels = normalizedListings.map(parcel => {
      const scored = { ...parcel, score: scoreParcel(parcel) };
      console.log('🏗️ Betty Parcel:', scored.address, 'Score:', scored.score);
      return scored;
    }).filter(parcel => parcel.score >= builderBettyThreshold);

    console.log('🔘 Betty toggle:', useBetty);
    console.log('🎯 Matching Betty parcels:', bettyParcels.length);

    // 🔎 Generic filter flow
    const filtered = useBetty
      ? bettyParcels
      : normalizedListings.map(site => ({ ...site, score: scoreParcel(site) }))
          .filter(site =>
            site.size >= lotSize &&
            site.frontage >= frontage &&
            (!zoning || site.zoning.toUpperCase() === zoning)
          );

    const resultsContainer = document.getElementById('results');

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p>No matching deals found 👀</p>`;
      return;
    }

    // 🧱 Render parcel cards
    resultsContainer.innerHTML = filtered.map(site => `
      <div class="card">
        <h3>${site.address}</h3>
        <img src="${site.sketch}" alt="Sketch for ${site.address}" class="sketch">
        <p>Size: ${site.size}m² | Frontage: ${site.frontage}m</p>
        <p>Zoning: ${site.zoning}</p>
        ${site.score >= builderBettyThreshold ? '<p class="betty-badge">🏗️ Builder Betty Approved</p>' : ''}
      </div>
    `).join('');

    console.log('👓 Sample parcel:', normalizedListings[0]);
    console.log('🧮 Filtered count:', filtered.length);
    console.log('✅ Listings Loaded:', listings);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    document.getElementById('results').innerHTML = `<p>⚠️ Error loading listings</p>`;
  }
}

window.applyFilters = applyFilters;
