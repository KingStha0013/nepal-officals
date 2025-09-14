const DATA_URL = "https://raw.githubusercontent.com/KingStha0013/nepal-officals/main/officials.json";
const officialsList = document.getElementById("officialsList");
const searchBox = document.getElementById("searchBox");
const toggleTheme = document.getElementById("toggleTheme");

// Fetch and render officials
async function fetchOfficials() {
  try {
    const res = await fetch(DATA_URL + "?t=" + Date.now()); // prevent cache
    const data = await res.json();
    renderOfficials(data);
  } catch (err) {
    console.error("Error fetching officials:", err);
    officialsList.innerHTML = "<p>⚠️ Failed to load data.</p>";
  }
}

function renderOfficials(data) {
  officialsList.innerHTML = "";

  const searchTerm = searchBox.value.toLowerCase();
  data
    .filter(o =>
      o.name.toLowerCase().includes(searchTerm) ||
      o.position.toLowerCase().includes(searchTerm) ||
      o.ministry.toLowerCase().includes(searchTerm)
    )
    .forEach(o => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${o.photo || "https://via.placeholder.com/300x180?text=No+Photo"}" 
             alt="${o.name}">
        <h3>${o.name}</h3>
        <p><strong>Position:</strong> ${o.position}</p>
        <p><strong>Ministry:</strong> ${o.ministry}</p>
      `;
      officialsList.appendChild(card);
    });
}

// Search filter
searchBox.addEventListener("input", fetchOfficials);

// Theme toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Auto-refresh every 40s
setInterval(fetchOfficials, 40000);

// Initial load
fetchOfficials();