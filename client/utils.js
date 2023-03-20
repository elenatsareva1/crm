let sortArrayByProperty = (arr, property) => {
  const temp = [...arr];

  const sortedFromLowToHigh = temp.sort(function (a, b) {
    var x = a[property].toLowerCase();
    var y = b[property].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  if (compareArrays(arr, sortedFromLowToHigh)) {
    return sortedFromLowToHigh.reverse();
  } else {
    return sortedFromLowToHigh;
  }
};

const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
