// Wait until the HTML document is fully parsed
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const input = document.querySelector('#favchap');
    const button = document.querySelector('#addBtn');
    const list = document.querySelector('#chapterList');

    // Add click event listener to the Add Chapter button
    button.addEventListener('click', function () {
        // Trim whitespace and check if input is not empty
        if (input.value.trim() !== '') {
            // Create a new list item and delete button
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');

            // Set the text content of the list item
            li.textContent = input.value;

            // Configure the delete button
            deleteButton.textContent = '❌';
            deleteButton.setAttribute(
                'aria-label',
                `Remove ${input.value}`
            );

            // Append delete button to the list item
            li.appendChild(deleteButton);

            // Append the list item to the list
            list.appendChild(li);

            // Add click listener to delete button to remove the item
            deleteButton.addEventListener('click', function () {
                list.removeChild(li);
                input.focus(); // Return focus to the input
            });

            // Clear the input field
            input.value = '';
        }

        // Always set focus back to the input field
        input.focus();
    });

    // Optional: Enable/disable Add button based on input content
    input.addEventListener('input', function () {
        button.disabled = input.value.trim() === '';
    });
});
