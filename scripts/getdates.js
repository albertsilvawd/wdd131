// Set the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = `© ${currentYear}`;

// Format and display the document's last modified date
const lastModifiedDate = new Date(document.lastModified);
const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
}).format(lastModifiedDate);

document.getElementById("lastModified").textContent = `Last Modified: ${formattedDate}`;
