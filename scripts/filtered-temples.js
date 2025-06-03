// ✅ Array of temple objects using WebP images
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/aba.webp"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/manti.webp"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/payson.webp"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "images/yigo.webp"
    },
    {
        templeName: "Lima Peru",
        location: "Lima, Peru",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/lima.webp"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/mexico.webp"
    },
    {
        templeName: "Recife Brazil",
        location: "Recife, Brazil",
        dedicated: "2000, December, 15",
        area: 37000,
        imageUrl: "images/recife.webp"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 52800,
        imageUrl: "images/tokyo.webp"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41000,
        imageUrl: "images/rome.webp"
    }
];

// ✅ Get the container element from the DOM
const container = document.getElementById("temples-container");

// ✅ Render function: displays temple cards dynamically
function renderTemples(templesArray) {
    container.innerHTML = ""; // Clear any existing content

    templesArray.forEach(temple => {
        const card = document.createElement("section");
        card.className = "temple-card";

        card.innerHTML = `
        <h2>${temple.templeName}</h2>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        <img 
          src="${temple.imageUrl}" 
          alt="${temple.templeName}" 
          width="400" 
          height="250" 
          loading="lazy"
        >
      `;

        container.appendChild(card);
    });
}

// ✅ Filter temples based on criteria (old, new, large, small, all)
function filterTemples(filterType) {
    let filtered;

    switch (filterType) {
        case "old":
            filtered = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
            break;
        case "new":
            filtered = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
            break;
        case "large":
            filtered = temples.filter(t => t.area > 90000);
            break;
        case "small":
            filtered = temples.filter(t => t.area < 10000);
            break;
        default:
            filtered = temples;
    }

    renderTemples(filtered);
}

// ✅ Footer date updates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ✅ Initial render
renderTemples(temples);
