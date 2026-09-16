(()=>{
'use strict';
if(window.__ANDINA_GAME_TIME_EXTENSION__)return;
const nativeSetInterval=window.setInterval.bind(window);
window.setInterval=(fn,ms,...args)=>{
  const source=Function.prototype.toString.call(fn);
  const isAndinaGameTimer=ms===1000&&source.includes('left--')&&source.includes('finish(');
  return nativeSetInterval(fn,isAndinaGameTimer?1200:ms,...args);
};
window.__ANDINA_GAME_TIME_EXTENSION__=true;
})();
