export const isArray = (par) => Object.prototype.toString.call(par) == "[object Array]";
export const isObject = (par) => Object.prototype.toString.call(par) == "[object Object]";
export const isElement = (par) => Object.prototype.toString.call(par).slice(8, 12) == "HTML";
export const isFunction = (par) => Object.prototype.toString.call(par) == "[object Function]";
export const isString = (par) => Object.prototype.toString.call(par) == "[object String]";
export const isNumber = (par) => Object.prototype.toString.call(par) == "[object Number]";
export const isUndefined = (data) => Object.prototype.toString.call(data) == "[object Undefined]";
export const isNull = (data) => Object.prototype.toString.call(data) == "[object Null]";
export const stringify = (data) => JSON.parse(JSON.stringify(data));
export const emailReg = (email) => /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/.test(email)
export const UUID = (len = 6) => Math.random().toString(36).slice(2, len + 6);

export const numberWithCommas = (x) => { // 添加千分位
  if (x == undefined || isNaN(x)) {
    return x
  }
  if (!isString(x)) {
    x = x.toString()
  }
  if (x && /\./.test(x)) {
    return `${x.toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${x.toString().split('.')[1]}`
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const isEmpty = (val) => {
  // null or undefined
  if (val == null) return true;

  if (val == undefined) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
}

 // 转成rgba 的颜色
 export const hexToRgb =(hex, opacity) => {
  if(hex.indexOf('rgba') > -1) {
      const arr = hex.slice(5, -1).split(",")
      return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${opacity})`;
  }
  if(hex.indexOf('rgb') > -1) {
      const arr = hex.slice(4, -1).split(",")
      return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${opacity})`;
  }
  var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
  const rgb = { r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF) }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}
// 是否是page页
export const isHomePage = () => {
  const { pathname } = location
  return pathname.indexOf("/measurelibApp/homepage/") != -1 || pathname.indexOf("/measurelibApp/newDetail/") != -1 || pathname.indexOf("/measurelibApp/newDrillDetail/") != -1
}

export const deepClone =(data)=>{
  var obj;
  if(isArray(data)){
      obj = [];
  } else if(isObject(data)){
      obj = {};
  } else {
      //不再具有下一层次
      return data;
  }
  if(isArray(data)){
      for(var i = 0, len = data.length; i < len; i++){
          obj.push(deepClone(data[i]));
      }
  } else if(isObject(data)){
      for(var key in data){
          obj[key] = deepClone(data[key]);
      }
  }
  return obj;
}

// 去重
export const ArrayDeduplication = (arr) => {
  const new_arr = []
  arr.forEach(e => {
    if(!new_arr.includes(e)){
      new_arr.push(e)
    }
  });
  return new_arr
}