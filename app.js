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

function deleteNode(val, data) {
  const x = data.data;

  function findLeftOfRight(_data) {
    if (_data.left.left === null) {
      const dltNode = _data.left.data;
      deleteNode(dltNode, _data);
      return dltNode;
    }
    return findLeftOfRight(_data.left);
  }

  if (x === val) {
    if (data.left !== null && data.right !== null) {
      const { right } = data;
      const result = findLeftOfRight(right);
      data.data = result;
      return;
    }
    return;
  }
  // parent checker
  if (data.left.data === val) {
    // if two children
    if (data.left.left !== null && data.left.right !== null) {
      const { right } = data.right;
      const result = findLeftOfRight(right);
      data.right.data = result;
      return;
    }
    // if leaf node
    if (data.left.left === null && data.left.right === null) {
      data.left = null;
      return;
    }
    // if one child
    if (data.left.left !== null) {
      data.left = data.left.left;
      return;
    }
    if (data.left.right !== null) {
      data.left = data.left.right;
      return;
    }
  }
  if (data.right.data === val) {
    // parent checker
    // if two children
    if (data.right.left !== null && data.right.left !== null) {
      const { right } = data.right;
      const result = findLeftOfRight(right);
      data.right.data = result;
      return;
    }
    // if leaf node
    if (data.right.left === null && data.right.right === null) {
      data.right = null;
      return;
    }

    // if one child
    if (data.right.right !== null) {
      data.right = data.right.right;
      return;
    }
    if (data.right.left !== null) {
      data.right = data.right.left;
      return;
    }
  }
  if (val > x) deleteNode(val, data.right);
  if (val < x) deleteNode(val, data.left);
}

function insert(val, data) {
  const x = data.data;
  if (data.right === null && val > x) {
    data.right = nodeFac(val);
    data.right.right = null;
    data.right.left = null;
    return;
  }
  if (data.left === null && val > x) {
    data.left = nodeFac(val);
    data.left.right = null;
    data.left.left = null;
    return;
  }
  if (val > x) insert(val, data.right);
  if (val < x) insert(val, data.left);
}

function find(val, data) {
  if (data.data === val) {
    // console.log(data);
    return data;
  }

  if (val > data.data) return find(val, data.right);
  // eslint-disable-next-line no-else-return
  else return find(val, data.left);
}
let first = true;
let stop = false;
const queue = [];
function levelOrder(cb, data) {
  if (stop || data == null) return;
  if (first === true) queue.push(data);
  first = false;
  cb();
  levelOrder(cb, queue[0]);
}

function preorder(data) {
  if (data === null) return;
  // console.log(data.data);

  preorder(data.left);
  preorder(data.right);
}

function inorder(data) {
  if (data === null) return;
  inorder(data.left);
  // console.log(data.data);
  inorder(data.right);
}

function postorder(data) {
  if (data === null) return;
  postorder(data.left);
  postorder(data.right);
  // console.log(data.data);
}

function height(data) {
  if (data === null) {
    return -1;
  }
  const leftHeight = height(data.left);
  const rightHeight = height(data.right);
  return Math.max(leftHeight, rightHeight) + 1;
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
  insert(24, callResult);
  insert(7778, callResult);
  insert(10, callResult);
  insert(350, callResult);
  deleteNode(67, callResult);
  find(10, callResult);
  levelOrder(() => {
    if (queue.length === 0) {
      stop = true;
      return;
    }
    const node = queue.shift(); // remove the first item in the queue and push its children
    // console.log(node.data);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }, callResult);
  preorder(callResult);
  inorder(callResult);
  postorder(callResult);
  height(find(324, callResult));
  prettyPrint(callResult);
  return callResult;
}

// console.log(buildTree([2, 1, 6, 4, 8, 7, 3, 5]));
buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
