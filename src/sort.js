/******************************************************************************\
 * This library adds methods to Array prototypes to allow direct sorting of
 * arrays. Does not work on objects.
 *
 * Defaults to ascending sort in case of typo and user will not be notified.
\******************************************************************************/

/**
 * Performs in-place insertion sort.
 *
 * @param {String} order
 */
Array.prototype.insertionSort = function (order = 'asc') {
  for (let i = 1; i < this.length; i++) {
    if (order === 'des') {
      for (let j = i; this[j - 1] < this[j]; j--) {
        const temp = this[j]
        this[j] = this[j - 1]
        this[j - 1] = temp
      }
    } else {
      for (let j = i; this[j - 1] > this[j]; j--) {
        const temp = this[j]
        this[j] = this[j - 1]
        this[j - 1] = temp
      }
    }
  }
}

/**
 * Performs in-place bubble sort.
 *
 * @param {*} array
 */
Array.prototype.bubbleSort = function (order = 'asc') {
//
}

/**
 * Performs in-place quick sort.
 */
Array.prototype.quickSort = function (array) {
  const ref = array[0]
  let left = []; let right = []; const duplicates = []

  for (let i = 1; i < array.length; i++) {
    if (array[i] === ref) duplicates.push(array[i])

    array[i] < ref ? left.push(array[i]) : right.push(array[i])
  }

  if (left.length > 1) left = this.quickSort(left)
  if (right.length > 1) right = this.quickSort(right)

  return left.concat(ref, duplicates, right)
}

const arr = []
const len = 10

// Generate a random array
while (arr.length < len) arr.push(Math.ceil(Math.random() * 100))

// Fill a decreasing array
// for (let i = 11; i > 0;  i--) arr.push(i)

// Fill an inceasing array
// for (let i = 0;  i < 10; i++) arr.push(i)


console.log(`Original array is [${arr}]`)
console.log(`-----------------------------------------------------------------`)

let start, end, duration

start = new Date().getTime()
arr.insertionSort('asc')
end = new Date().getTime()
duration = end - start
console.log(`Sorted array ascending is [${arr}]`)
console.log(`Time started is ${start}`)
console.log(`Time ended is ${end}`)
console.log(`Time taken is ${duration} ms`)

console.log(`-----------------------------------------------------------------`)

start = new Date().getTime()
arr.insertionSort('des')
end = new Date().getTime()
duration = end - start
console.log(`Sorted array descending is [${arr}]`)
console.log(`Time started is ${start}`)
console.log(`Time ended is ${end}`)
console.log(`Time taken is ${duration} ms`)
