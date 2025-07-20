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
    <img src="${site.sketch}" alt="Sketch for ${site.address}" class="sketch">
    <p>Size: ${site.lotSize}m² | Frontage: ${site.frontage}m</p>
    <p>Zoning: ${site.zoning}</p>
  </div>
`).join('');

const zoneSketchMap = {
  "LDR": "https://via.placeholder.com/400x250?text=2x3BR+Concept",
  "MDR": "https://via.placeholder.com/400x250?text=3BR+4BR+Concept",
  "GRZ": "https://via.placeholder.com/400x250?text=Split-Level+Design"
};
site.sketch = zoneSketchMap[site.zoning] || defaultSketchURL;

<img src="${site.sketch}" alt="Sketch for ${site.address}" class="sketch">

}
