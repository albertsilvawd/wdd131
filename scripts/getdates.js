// Set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = `© ${currentYear}`;

// Format and display the last modified date using Intl API
const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
});

const lastModified = formatter.format(new Date(document.lastModified));
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
