// getdates.js

const currentYear = new Date().getFullYear();
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
}
const lastModifiedDate = document.lastModified;
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${lastModifiedDate}`;
}