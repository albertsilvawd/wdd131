// Update current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Update last modified date/time of the page
document.getElementById("lastModified").textContent = document.lastModified;

// Calculate Wind Chill (in °C), if applicable
function calculateWindChill(tempCelsius, windKmh) {
    if (tempCelsius <= 10 && windKmh > 4.8) {
        // Wind chill formula in Celsius
        const chill =
            13.12 +
            0.6215 * tempCelsius -
            11.37 * Math.pow(windKmh, 0.16) +
            0.3965 * tempCelsius * Math.pow(windKmh, 0.16);
        return chill.toFixed(1);
    } else {
        return "N/A";
    }
}

// Execute calculation with values from HTML
const temp = parseFloat(document.getElementById("temp").textContent);
const wind = parseFloat(document.getElementById("wind").textContent);
const windChill = calculateWindChill(temp, wind);

document.getElementById("windchill").textContent =
    windChill !== "N/A" ? `${windChill} °C` : "N/A";
