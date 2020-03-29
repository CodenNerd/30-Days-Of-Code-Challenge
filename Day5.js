const noReverse = (string, left_pos = 0, right_pos = 0) =>{
    const str_len = string.length;
    right_pos = right_pos? right_pos : str_len - left_pos - 1 ; // calculate right pos from left pos if none is passed as an argument
   
    if (string[left_pos]===' ')  return noReverse(string, ++left_pos, right_pos);  // check for space on the left pos
    if (string[right_pos]===' ') return noReverse(string, left_pos, --right_pos);   // on the right pos
  
    if (string[left_pos]!==string[right_pos]) return console.log(false);
    if (left_pos>=(str_len/2)) return console.log(true);
    
    noReverse(string, ++left_pos, --right_pos); //recursion 
  }
  
  noReverse('was it a cat i saw');
  noReverse('nurses run');
  noReverse("codennerd");
  