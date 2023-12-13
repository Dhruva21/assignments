/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlphabetic(char) {
  return /^[a-zA-Z]$/.test(char);
}

function isPalindrome(str) {
  str=str.toLowerCase().replace(/\W/g, '')
  // find whether a string is palindrome or not using two pointer(start and end) technique.
  let p1 = 0;
  let p2 = str.length - 1;
  while(p1 < p2){
    if(str[p1] != str[p2]){
      return false;
    }
      p1++;
      p2--;
    
  }
  return true;
}
module.exports = isPalindrome;
