
//将Blob 对象转换成buffer
export function blobToArrayBuffer(blob) {
  var fileReader = new FileReader();
 
  return new Promise(function(resolve, reject) {
   fileReader.onload = resolve;
   fileReader.onerror = reject;
 
   fileReader.readAsArrayBuffer(blob);
  });
 };

 //将Blob 对象转换成字符串
export function blobToString(blob) {
      var fileReader = new FileReader();
      return new Promise(function(resolve, reject) {
      fileReader.onload = resolve;
      fileReader.onerror = reject;
      fileReader.readAsText(blob, 'utf-8');
     });
 };

 export function _fetch(fetch_promise, timeout) {
  var abort_fn = null;

  //这是一个可以被reject的promise
  var abort_promise = new Promise(function(resolve, reject) {
         abort_fn = function() {
            reject('Implementation timeout,please try again.');
         };
  });
  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
   var abortable_promise = Promise.race([
         fetch_promise,
         abort_promise
   ]);

   setTimeout(function() {
         abort_fn();
    }, timeout);

   return abortable_promise;
}
