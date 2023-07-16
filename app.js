function node(data, left, right) {
  return { data, left, right };
}

function buildTree(arr) {
  function mergeSort(l, h) {
    const mid = (l + h) / 2;
  }

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
}
