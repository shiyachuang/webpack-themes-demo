
//子元素为对象的数组去重
export function uniqueArr(arr){            
  for(var i=0; i<arr.length; i++){
      for(var j=i+1; j<arr.length; j++){
          if(arr[i].id==arr[j].id){         
              arr.splice(j,1);
              j--;
          }
      }
  }
  return arr;
}

//子元素为值的数组去重
export function unique(arr){            
  for(var i=0; i<arr.length; i++){
      for(var j=i+1; j<arr.length; j++){
          if(arr[i]==arr[j]){         
              arr.splice(j,1);
              j--;
          }
      }
  }
  return arr;
}
