async function applyFilters() {
  const res = await fetch('data/listings.json');
  const listings = await res.json();

  const lotSize = Number(document.getElementById('lotSize').value) || 0;
  const frontage = Number(document.getElementById('frontage').value) || 0;
  const zoning = document.getElementById('zoning').value.toUpperCase();
  const builderBettyThreshold = 15;
const bettyParcels = listings
  .map(parcel => ({ ...parcel, score: scoreParcel(parcel) }))
  .filter(parcel => parcel.score >= builderBettyThreshold);


const useBetty = document.getElementById('bettyToggle').checked;
const filtered = useBetty
  ? bettyParcels
  : listings.filter(site =>
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
}
