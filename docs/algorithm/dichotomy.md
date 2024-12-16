# 二分法——leetcode 704

1. 左闭右闭 [1, 1]

```javascript
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}
```

2. 左闭右开 [1, 1)

```javascript
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}
```
