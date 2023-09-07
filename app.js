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

function buildTree(arr) {
  const result = mergeSort(arr);
  const set = new Set([]);
  result.forEach((val) => {
    set.add(val);
  });
  const nonDuplicateResult = [...set]; // An array created with the spread operator

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
  return createTree(nonDuplicateResult);
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
  if (data.left === null && val < x) {
    data.left = nodeFac(val);
    data.left.right = null;
    data.left.left = null;
    return;
  }
  if (val > x) insert(val, data.right);
  if (val < x) insert(val, data.left);
}

function find(val, data) {
  // console.log(data);
  if (data.data === val) {
    // console.log(data);
    return data;
  }

  if (val > data.data) return find(val, data.right);
  // eslint-disable-next-line no-else-return
  else return find(val, data.left);
}
let first = true;
const stop = false;
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

function height(data, edges = 0) {
  if (data === null) {
    edges -= 1;
    return edges;
  }
  edges += 1;
  const left = height(data.left, edges);
  const right = height(data.right, edges);
  return Math.max(left, right);
}

function depth(node, data, edges = 0) {
  if (data === null) return;
  edges += 1;
  if (data.data === node) return edges - 1;
  if (node > data.data) return depth(node, data.right, edges);
  return depth(node, data.left, edges);
}

function rebalance(data, newArr = []) {
  if (data === null) return newArr;
  newArr.push(data.data);
  console.log(newArr);
  rebalance(data.left, newArr);
  rebalance(data.right, newArr);
  return newArr;
}

function isBalanced(data) {
  const leftHeight = height(data.left) + 1;
  const rightHeight = height(data.right) + 1;
  if (
    leftHeight - rightHeight === 0 ||
    leftHeight - rightHeight === -1 ||
    leftHeight - rightHeight === 1
  ) {
    return true;
  }
  const newArr = rebalance(data);
  const newTree = buildTree(newArr);
  prettyPrint(newTree);
  return false;
}

function drive() {
  const arr = [];
  for (let i = 0; i <= 100; i++) {
    const num = Math.random() * 100;
    arr.push(num.toFixed(0));
  }
  const result = buildTree(arr);
}
drive();
