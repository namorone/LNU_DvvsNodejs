// 2. Check two strings if they are anagrams of one another.
// Use object to count string letters. Use cycle for-in to compare count of letters.

// // access to object props can be done via [] operator
// const letters = {};
// letters["a"] = 1;

// // if same letter is present again increase counter
// let letter = "b";
// letters[letter] += 1;

function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) return false;

    const count = {};

    for (let char of str1) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of str2) {
        if (!count[char]) return false;
        count[char]--;
    }

    return true;
}

console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("listen", "google")); // false