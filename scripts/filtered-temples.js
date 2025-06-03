// ✅ Array of temple objects
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Recife Brazil",
        location: "Recife, Brazil",
        dedicated: "2000, December, 15",
        area: 37000,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/74d57cefebf31773df61b0b882067ee236de5279/full/640%2C/0/default"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 52800,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/df6b96801c9f11ec99eeeeeeac1ea2207e7c517b/full/640%2C/0/default"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41000,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/640%2C/0/default"
    }
];

// ✅ Get the container where temple cards will be rendered
const container = document.getElementById("temples-container");

// ✅ Render function that creates temple cards dynamically
function renderTemples(templesArray) {
    container.innerHTML = ""; // Clear the container

    templesArray.forEach((temple) => {
        const card = document.createElement("section");
        card.className = "temple-card";
        card.innerHTML = `
        <h2>${temple.templeName}</h2>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" />
      `;
        container.appendChild(card);
    });
}

// ✅ Filter temples based on filter type from menu
function filterTemples(filterType) {
    let filteredTemples;

    switch (filterType) {
        case "old":
            filteredTemples = temples.filter(
                (t) => new Date(t.dedicated).getFullYear() < 1900
            );
            break;
        case "new":
            filteredTemples = temples.filter(
                (t) => new Date(t.dedicated).getFullYear() > 2000
            );
            break;
        case "large":
            filteredTemples = temples.filter((t) => t.area > 90000);
            break;
        case "small":
            filteredTemples = temples.filter((t) => t.area < 10000);
            break;
        default:
            filteredTemples = temples;
    }

    renderTemples(filteredTemples);
}

// ✅ Update footer with current year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ✅ Initial load of all temples
renderTemples(temples);
