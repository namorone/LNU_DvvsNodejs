// 7. Create a function that takes two arguments: an array "arr" and a number "num".
// If an element occurs in "arr" more than "num" times, remove the extra occurrence(s) and return the result.

function removeOccurrences(arr, num) {
    const count = {};
    const result = [];

    for (let element of arr) {
        count[element] = (count[element] || 0) + 1;
        if (count[element] <= num) result.push(element);
    }

    return result;
}

const arr = [1, 2, 3, 4, 5, 2, 2, 3, 4, 4];
console.log(removeOccurrences(arr, 2)); // expected [1, 2, 3, 4, 5, 2, 3, 4]
console.log(removeOccurrences(arr, 1)); // expected [1, 2, 3, 4, 5]