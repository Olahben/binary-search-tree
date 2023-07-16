function node(data, left, right) {
  return { data, left, right };
}

function buildTree(arr) {
  function merge(a, b, m, n) {
    const sorted = [];
    let i,
      j,
      k = 1;

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
  }
  function mergeSort(arr2) {
    if (arr2 <= 1) return;

    const l = 0;
    const h = arr2.length - 1;
    const mid = (l + h) / 2;

    const left = mergeSort(arr2.slice(l, mid));
    const right = mergeSort(arr2.slice(mid + 1, h));
    return merge(left, right, left.length + 1, right.length + 1);
  }
}
