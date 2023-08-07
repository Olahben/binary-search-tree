function nodeFac(data) {
  return { data };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function merge(a, b, m, n) {
  const sorted = [];
  let i = 0,
    j = 0,
    k = 0;

  while (i <= m && j <= n) {
    if (a[i] <= b[j]) {
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

function insert(val, data) {
  console.log(data);
  // if (data === null) return;
  const x = data.data;
  console.log(x);
  console.log(data.right);
  if (data.right === null && val > x) {
    data.right = nodeFac(val);
    data.right.right = null;
    data.right.left = null;
    console.log("case0");
    return;
  }
  if (data.left === null && val > x) {
    data.left = nodeFac(val);
    data.left.right = null;
    data.left.left = null;
    console.log("case1");
    return;
  }
  if (val > x) insert(val, data.right);
  if (val < x) insert(val, data.left);
}

function buildTree(arr) {
  const result = mergeSort(arr);
  const set = new Set([]);
  result.forEach((val) => {
    set.add(val);
  });
  const nonDuplicateResult = [...set]; // An array created with the spread operator
  console.log(nonDuplicateResult);

  function createTree(arr3) {
    const copy = arr3;
    const start = 0;
    const end = copy.length - 1;
    if (start > end) return null;
    const mid = Math.round((start + (end - start)) / 2);
    const leftSubarray = copy.slice(start, mid);
    const rightSubarray = copy.slice(mid + 1, copy.length);
    const root = nodeFac(copy[mid]);
    root.left = createTree(leftSubarray);
    root.right = createTree(rightSubarray);

    return root;
  }
  const callResult = createTree(nonDuplicateResult);
  // console.log(callResult);
  insert(24, callResult);
  prettyPrint(callResult);
  return callResult;
}

// console.log(buildTree([2, 1, 6, 4, 8, 7, 3, 5]));
buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
