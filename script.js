async function applyFilters() {
  const res = await fetch('data/listings.json');
  const listings = await res.json();

  const lotSize = parseInt(document.getElementById('lotSize').value) || 0;
  const frontage = parseInt(document.getElementById('frontage').value) || 0;
  const zoning = document.getElementById('zoning').value;

  const filtered = listings.filter(site => 
    site.lotSize >= lotSize &&
    site.frontage >= frontage &&
    (!zoning || site.zoning === zoning)
  );

  document.getElementById('results').innerHTML = filtered.map(site => `
    <div class="card">
      <h3>${site.address}</h3>
      <p>Size: ${site.lotSize}m² | Frontage: ${site.frontage}m</p>
      <p>Zoning: ${site.zoning}</p>
    </div>
  `).join('');
}
