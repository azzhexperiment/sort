/******************************************************************************\
 * This library adds methods to Array prototypes to allow direct sorting of
 * arrays. Does not work on objects.
 *
 * Defaults to ascending sort in case of typo and user will not be notified.
 *
 * Types of sorts includes:
 *   - insertion sort
 *   - quick sort
 *   - merge sort
 *   - heap sort
 *   - selection sort
 *   - bubble sort
\******************************************************************************/

/**
 * Performs in-place insertion sort.
 *
 * @param {String} order
 */
Array.prototype.insertionSort = function (order = 'asc') {
  for (let i = 1; i < this.length; i++) {
    if (order === 'desc') {
      for (let j = i; this[j - 1] < this[j]; j--) {
        swap(this, j - 1, j)
      }
    } else {
      for (let j = i; this[j - 1] > this[j]; j--) {
        swap(this, j - 1, j)
      }
    }
  }
}

/**
 * Performs in-place bubble sort.
 *
 * @param {String} order
 */
Array.prototype.bubbleSort = function (order = 'asc') {
  for (let i = 0; i < this.length; i++) {
    let swapped = false

    if (order === 'desc') {
      for (let j = 0; j < this.length - i - 1; j++) {
        if (this[j] < this[j + 1]) {
          swap(this, j, j + 1)
          swapped = true
        }
      }
      if (!swapped) break
    } else {
      for (let j = 0; j < this.length - i - 1; j++) {
        if (this[j] > this[j + 1]) {
          swap(this, j, j + 1)
          swapped = true
        }
      }
      if (!swapped) break
    }
  }
}

/**
 * Performs in-place quick sort with pivot at middle of array.
 *
 * @param {String} order
 */
Array.prototype.quickSort = function (order = 'asc') {
  _quickSort(this, 0, this.length - 1)

  function _quickSort (array, start, end) {
    if (start >= end) return

    const pivot = _partition(array, start, end)

    _quickSort(array, start, pivot - 1)
    _quickSort(array, pivot, end)
  }

  function _partition (array, start, end) {
    const pivot = array[Math.floor((start + end) / 2)]
    let leftIndex = start
    let rightIndex = end

    while (leftIndex <= rightIndex) {
      if (order === 'desc') {
        while (array[leftIndex] > pivot) leftIndex++
        while (array[rightIndex] < pivot) rightIndex--
      } else {
        while (array[leftIndex] < pivot) leftIndex++
        while (array[rightIndex] > pivot) rightIndex--
      }

      if (leftIndex <= rightIndex) {
        swap(array, leftIndex, rightIndex)
        leftIndex++
        rightIndex--
      }
    }

    return leftIndex
  }
}

/**
 * Performs in-place selection sort.
 *
 * @param {String} order
 */
Array.prototype.selectionSort = function (order = 'asc') {
  for (let i = 0; i < this.length; i++) {
    let min = i

    if (order === 'desc') {
      for (let j = i + 1; j < this.length; j++) {
        if (this[j] > this[min]) min = j
      }
    } else {
      for (let j = i + 1; j < this.length; j++) {
        if (this[j] < this[min]) min = j
      }
    }

    if (i !== min) swap(this, i, min)
  }
}

Array.prototype.heapSort = function (order = 'asc') {

}

/**
 * Swap 2 elements in an array.
 *
 * @param {Array} array
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 */
function swap (array, leftIndex, rightIndex) {
  const temp = array[leftIndex]
  array[leftIndex] = array[rightIndex]
  array[rightIndex] = temp
}

/******************************************************************************\
 * START OF MANUAL TESTS
\******************************************************************************/

const arr = []
const len = 20000

// Generate a random array
while (arr.length < len) arr.push(Math.ceil(Math.random() * 100))

// Fill a decreasing array
// for (let i = 10; i > 0;  i--) arr.push(i)

// Fill an inceasing array
// for (let i = 0;  i < 10; i++) arr.push(i)

console.log(`Original array is [${arr}]`)
console.log('-----------------------------------------------------------------')

const start = new Date().getTime()
arr.selectionSort('desc')
const end = new Date().getTime()
const duration = end - start
console.log(`Sorted array is [${arr}]`)
console.log(`Time started is ${start}`)
console.log(`Time ended is ${end}`)
console.log(`Time taken is ${duration} ms`)
