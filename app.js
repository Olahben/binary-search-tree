function node(data, left, right) {
  return { data, left, right };
}

function buildTree(arr) {
  function merge(a, b, m, n) {
    const sorted = [];
    let i = 0,
      j = 0,
      k = 0;

    while (i <= m && j <= n) {
      if (a[i] < b[j]) {
        sorted[k++] = a[i++];
      } else {
        sorted[k++] = b[j++];
      }
    }

    for (; i <= m; i++) {
      sorted[k++] = a[i];
    }
    for (; j <= n; j++) {
      sorted[k++] = b[j];
    }

    return sorted;
  }
  function mergeSort(arr2) {
    const copy = arr2;
    if (copy.length <= 1) return copy;

    const mid = copy.length / 2;

    const left = mergeSort(copy.slice(0, mid));
    const right = mergeSort(copy.slice(mid, copy.length));
    if (left === undefined) return copy;
    if (right === undefined) return copy;
    return merge(left, right, left.length - 1, right.length - 1);
  }
  return mergeSort(arr);
}

console.log(buildTree([2, 1, 6, 4, 8, 7, 3, 5]));
// console.log(buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
