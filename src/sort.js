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
    let leftIndex  = start
    let rightIndex = end

    while (leftIndex <= rightIndex) {
      if (order === 'desc') {
        while (array[leftIndex]  > pivot) leftIndex++
        while (array[rightIndex] < pivot) rightIndex--
      } else {
        while (array[leftIndex]  < pivot) leftIndex++
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

/**
 * Performs in-place heap sort.
 *
 * @param {String} order
 */
Array.prototype.heapSort = function (order = 'asc') {
  _heapify(this)

  let end = this.length - 1

  while (end > 0) {
    swap(this, end, 0)
    end--
    _siftDown(this, 0, end)
  }

  /**
   * Converts an array into the heap data structure.
   *
   * @param {Array} array
   */
  function _heapify (array) {
    let start = Math.floor((array.length / 2) - 1)
    const end = array.length

    while (start >= 0) {
      _siftDown(array, start, end)
      start--
    }
  }

  /**
   * Descends depth-first into a heap and swap elements.
   *
   * @param {Array}  array
   * @param {Number} start
   * @param {Number} end
   */
  function _siftDown (array, start, end) {
    let root = start
    let child

    if (order === 'desc') {
      while ((root * 2) + 1 <= end) {
        child = (root * 2) + 1

        if (child + 1 <= end && array[child] < array[child + 1]) child++

        if (array[root] < array[child]) {
          swap(array, root, child)
          root = child
        } else return
      }
    } else {
      while ((root * 2) + 1 <= end) {
        child = (root * 2) + 1

        if (child + 1 <= end && array[child] > array[child + 1]) child++

        if (array[root] > array[child]) {
          swap(array, root, child)
          root = child
        } else return
      }
    }
  }
}

/**
 * Performs in-place merge sort using auxiliary arrays.
 *
 * @param {String} order
 */
Array.prototype.mergeSort = function (order = 'asc') {
  _mergeSort(this)

  function _mergeSort (array) {
    if (array.length < 2) return

    let mid   = Math.floor(array.length / 2)
    let left  = array.slice(0, mid)
    let right = array.slice(mid)

    _mergeSort(left)
    _mergeSort(right)
    _merge(array, left, right)
  }

  function _merge (array, left, right) {
    let i = 0
    let leftIndex  = 0
    let rightIndex = 0

    if (order === 'desc') {
      while (leftIndex < left.length && rightIndex < right.length) {
        array[i++] = (right[0] > left[0]) ? right.shift() : left.shift()
      }
    } else {
      while (leftIndex < left.length && rightIndex < right.length) {
        array[i++] = (right[0] < left[0]) ? right.shift() : left.shift()
      }
    }

    while (left.length)  array[i++] = left.shift()
    while (right.length) array[i++] = right.shift()
  }
}

/**
 * Swap 2 elements in an array.
 *
 * @param {Array}  array
 * @param {Number} i
 * @param {Number} j
 */
function swap (array, i, j) {
  const temp = array[i]
  array[i]   = array[j]
  array[j]   = temp
}

/******************************************************************************\
 * START OF MANUAL TESTS
\******************************************************************************/

const arr = []
const len = 200000

// Generate a random array
while (arr.length < len) arr.push(Math.ceil(Math.random() * 100))

// Fill a decreasing array
// for (let i = 10; i > 0;  i--) arr.push(i)

// Fill an inceasing array
// for (let i = 0;  i < 10; i++) arr.push(i)

// console.log(`Original array is [${arr}]`)
console.log('-----------------------------------------------------------------')

const start = new Date().getTime()
arr.quickSort('asc')
const end   = new Date().getTime()

// console.log(`Sorted array is [${arr}]`)
console.log(`Time taken is ${end - start} ms`)
