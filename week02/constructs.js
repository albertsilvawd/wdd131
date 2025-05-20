// Example of if / else if / else
let score = 75;

if (score >= 90) {
    console.log("Grade: A");            // If score is 90 or above
} else if (score >= 80) {
    console.log("Grade: B");            // If score is between 80 and 89
} else if (score >= 70) {
    console.log("Grade: C");            // If score is between 70 and 79
} else {
    console.log("Grade: D or F");       // Otherwise
}

// Example of switch statement
let dayNumber = 3;

switch (dayNumber) {
    case 1:
        console.log("Sunday");
        break;
    case 2:
        console.log("Monday");
        break;
    case 3:
        console.log("Tuesday");
        break;
    default:
        console.log("Another day");
        break;
}

// Example of a for loop
for (let i = 1; i <= 5; i++) {
    console.log(`For loop iteration: ${i}`); // Prints numbers 1 through 5
}

// Example of a while loop
let count = 1;
while (count <= 3) {
    console.log(`While loop count: ${count}`);
    count++; // Increment count to eventually end the loop
}

// Example of forEach loop over an array
const fruits = ["apple", "banana", "cherry"];
fruits.forEach(function (fruit, index) {
    console.log(`Fruit ${index + 1}: ${fruit}`);
    // For each element in the fruits array, print its name
});
