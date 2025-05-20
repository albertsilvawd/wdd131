// Select DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('#addBtn');
const list = document.querySelector('#chapterList');

// Add event listener to the "Add Chapter" button
button.addEventListener('click', function () {
    // Prevent adding empty entries
    if (input.value.trim() === '') {
        return;
    }

    // Create a new list item and delete button
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    // Set the text content of the li to the input value
    li.textContent = input.value;

    // Configure the delete button
    deleteButton.textContent = '❌';
    // Add an accessible label for screen readers
    deleteButton.setAttribute(
        'aria-label',
        `Remove ${input.value}`
    );

    // Append delete button to the li
    li.appendChild(deleteButton);

    // Append the li to the list
    list.appendChild(li);

    // Clear the input and set focus back to it
    input.value = '';
    input.focus();

    // Add event listener to remove the li when delete button is clicked
    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
    });
});
