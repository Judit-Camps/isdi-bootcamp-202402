delete Array.prototype.indexOf

function indexOf(array, searchElement, indexFrom) {
    debugger
    if (indexFrom >= array.length) {
        return -1
    } else if (indexFrom < 0 && array.length + indexFrom < 0 || indexFrom === undefined) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === searchElement) {
                return i
            }
        }
    } else if (indexFrom < 0 && array.length + indexFrom > 0) {
        for (var i = array.length + indexFrom; i < array.length; i++) {
            if (array[i] === searchElement) {
                return i
            }
        }
    } else {
        for (var i = indexFrom; i < array.length; i++) {
            if (array[i] === searchElement) {
                return i
            }
        }
    }
    return -1
}


var array = [2, 9, 9];
// CASE 1
console.log(indexOf(array, 2));
// 0

// CASE 2
console.log(indexOf(array, 7));
// -1

// CASE 3
console.log(indexOf(array, 9, 2));
// 2

// CASE 4
console.log(indexOf(array, 2, -1));
// -1

// CASE 5
console.log(indexOf(array, 2, -3));
// 0