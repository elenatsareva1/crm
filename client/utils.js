/* Sorting Utils */
let sortArrayByProperty = (arr, property) => {
  const temp = [...arr];

  const sortedFromLowToHigh = temp.sort(function (a, b) {
    let x = a[property].toLowerCase();
    let y = b[property].toLowerCase();
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


  /* Dates Utils */

  function getUTCfullYear(someDateObj){

    const options = {
      hour: '2-digit',
      minute: '2-digit',
    }
    let date = someDateObj.getUTCDate();
    let month = someDateObj.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
    let year = someDateObj.getUTCFullYear();
    
    let hour = someDateObj.toLocaleTimeString('ru-RU', options)
    
    let dateObj ={
      date : date + "-" + month + "-" + year,
      hour : hour
    }
    return dateObj;
  }