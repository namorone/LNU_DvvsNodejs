// 3. Sort array via quick sort algorithm.
// const arr = [25, 4, 18, 14, 2, 9];

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return (i + 1);
}

function quickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

const arr = [25, 4, 18, 14, 2, 9];
quickSort(arr, 0, arr.length - 1);
console.log(arr);
const arr2 =[77, 2, 5, 3, 1, 4, 6, 8, 7, 9, 0];
quickSort(arr2, 0, arr2.length - 1);
console.log(arr2);
