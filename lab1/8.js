// 8. Given a string consisting from digits and #, translate a string to English lowercase characters as follows:
//   Characters ("a" to "i") are represented by ("1" to "9").
//   Characters ("j" to "z") are represented by ("10#" to "26#").
// Bonus: except a decrypt - do an encrypt function too.

function decrypt(s) {
    let result = '';
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '#') {
            result = String.fromCharCode(parseInt(s.substring(i - 2, i)) + 96) + result;
            i -= 2;
        } else {
            result = String.fromCharCode(parseInt(s[i]) + 96) + result;
        }
    }
    return result;
}

function encrypt(s) {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i) - 96;
        if (code >= 10) {
            result += code + '#';
        } else {
            result += code;
        }
    }
    return result;
}

const encrypted = encrypt('jazz');
console.log(encrypted); // 10#1#26#26#
console.log(decrypt(encrypted)); // jazz

const encrypted2 = encrypt('hello');
console.log(encrypted2); // 8#5#12#12#15#
console.log(decrypt(encrypted2)); // hello