export default function removeDuplicates(arr, key) {
  let unique = arr.reduce(function (acc, curr) {
    if (key) {
      if (!acc.includes(curr[key])) acc.push(curr);
      return acc;
    }

    if (!acc.includes(curr)) acc.push(curr);
    return acc;
  }, []);
  return unique;
}
