/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let str1_set = new Set();;
  let str2_set = new Set();;
  let i;
  for(i = 0; i < str1.length; i++){
    str1_set.add(str1[i].toLowerCase());
  }
  for(i = 0; i < str2.length; i++){
    str2_set.add(str2[i].toLowerCase());
  }
  if(str1_set.size !== str2_set.size){
    return false;
  }
  for(let char of str1_set){
    if(!str2_set.has(char)){
      return false;
    }
  }
  return true;
}

module.exports = isAnagram;
