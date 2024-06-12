// 6. Write a function that takes a number and returns the perimeter of either a circle or a square or a rectangle.
// The input will be in the form (letter l, number num, number num2) where the letter will be either "s" for square, or "c" for circle.
// The number will be the side of the square or the radius of the circle.
// For rectangle - letter will be "r" and "num" and "num2" are sides of rectangle.

//Bonus: do an alternative with a named parameters approach (with errors if mandatory params are missing)
function calculatePerimeter(shape, num1, num2) {
    switch (shape) {
        case 's':
            return 4 * num1;
        case 'c':
            return 2 * Math.PI * num1;
        case 'r':
            return 2 * (num1 + num2);
        default:
            throw new Error("Invalid shape");
    }
}

console.log(calculatePerimeter('s', 5)); // Square with side 5
console.log(calculatePerimeter('c', 3)); // Circle with radius 3
console.log(calculatePerimeter('r', 4, 6)); // Rectangle with sides 4 and 6
console.log(calculatePerimeter('t', 4, 6)); // Invalid shape1
