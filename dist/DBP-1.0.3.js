!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define("DBP",["jquery"],t):"object"==typeof exports?exports.DBP=t(require("jquery")):e.DBP=t(e.$)}(window,function(e){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=7)}([function(t,o){t.exports=e},function(e,t){e.exports=((...e)=>e)},function(e,t,o){var n,r;
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */!function(i){if(void 0===(r="function"==typeof(n=i)?n.call(t,o,t,e):n)||(e.exports=r),!0,e.exports=i(),!!0){var c=window.Cookies,u=window.Cookies=i();u.noConflict=function(){return window.Cookies=c,u}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var o=arguments[e];for(var n in o)t[n]=o[n]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function o(n){function r(){}function i(t,o,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},r.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var c=JSON.stringify(o);/^[\{\[]/.test(c)&&(o=c)}catch(e){}o=n.write?n.write(o,t):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var u="";for(var a in i)i[a]&&(u+="; "+a,!0!==i[a]&&(u+="="+i[a].split(";")[0]));return document.cookie=t+"="+o+u}}function c(e,o){if("undefined"!=typeof document){for(var r={},i=document.cookie?document.cookie.split("; "):[],c=0;c<i.length;c++){var u=i[c].split("="),a=u.slice(1).join("=");o||'"'!==a.charAt(0)||(a=a.slice(1,-1));try{var s=t(u[0]);if(a=(n.read||n)(a,s)||t(a),o)try{a=JSON.parse(a)}catch(e){}if(r[s]=a,e===s)break}catch(e){}}return e?r[e]:r}}return r.set=i,r.get=function(e){return c(e,!1)},r.getJSON=function(e){return c(e,!0)},r.remove=function(t,o){i(t,"",e(o,{expires:-1}))},r.defaults={},r.withConverter=o,r}(function(){})})},function(e,t,o){const n=o(1),r=o(0),i=10;e.exports={create:function(e,t,o){let c=null,u=Array(i).fill({x:0,y:0}),a=!1;r(t).mousemove(e=>{u.unshift({x:e.clientX,y:e.clientY}),u=u.slice(0,i)}),r(t).mouseout(e=>{if(n(+new Date,"mouseout: mouseout event fired, scrolling:",a),!a){const t=e.relatedTarget||e.toElement;if(n(+new Date,"mouseout: client Y: ",e.clientY),t&&"HTML"!==t.nodeName)return;e.clientY<=o.distance&&u[i-1].y-u[0].y>o.sensitivity&&o.onBounce("mouseout")}}),o.scrollDelay&&r(e).scroll(()=>{a=!0,n(+new Date,"mouseout: scroll delay activated"),clearTimeout(c),c=setTimeout(()=>{n(+new Date,"mouseout: scroll delay deactivated"),a=!1},o.scrollDelay)})}}},function(e,t,o){const n=o(1),r=o(0),i="bht";e.exports={create:function(e,t,o){"replaceState"in e.history?(n(+new Date,"history: replaceState mode"),function(t={bouncing:!0}){n(+new Date,"contaminating state with",t),e.history.replaceState(t,e.title),e.history.pushState(null,e.title)}(),r(e).bind("popstate",()=>{n(+new Date,"history: popState event caught with state",e.history.state),e.history.state&&e.history.state.bouncing&&o.onBounce("history")})):"onhashchange"in e&&(n(+new Date,"history: onhashchange mode"),e.location.replace(`#${i}`),e.location.hash="",r(e).hashchange(()=>{n(+new Date,"history: hashChange event caught with state",e.location.hash),e.location.hash.substr(-1*i.length)===i&&o.onBounce("history")}))}}},function(e,t,o){const n=o(1),r=o(0),i=1e3,c=150,u=10,a="<a href='#' style='position:fixed; top:20px; left: -1000px;' />";e.exports={create:function(e,t,o){const s=r(a).appendTo("body");let l=!1;function f(){r(":focus").length||s.focus()}setInterval(f,i),f();let d=null,p=null;r(t).mousedown(()=>{n(+new Date,"blur: allowing blur for",c),l=!0,clearTimeout(d),d=setTimeout(()=>{n(+new Date,"blur: disallowing blur"),l=!1,f()},c)}),r("*").blur(()=>{n(+new Date,"blur: queuing a canBlur check in",u),clearTimeout(p),p=setTimeout(()=>{n(+new Date,"blur: canBlur check",l),l||o.onBounce("blur")},u)})}}},function(e,t,o){e.exports={blur:o(5),history:o(4),mouseout:o(3)}},function(e,t,o){const n=o(6),r=o(2);e.exports=function(e,t){const o="function"==typeof e?{onBounce:e}:e,i=void 0!==t?t:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),c={disabled:!1,count:0},u=function(){const e={method:"auto",showPerPage:1,showPerUser:void 0,cookieName:"dbp",distance:100,sensitivity:10,scrollDelay:500,onlySameReferrer:!1,notSameReferrer:!1,onBounce:()=>{console.log("bounce")}},t=Object.assign({},e,o);return t.onBounce=function(e){function o(){const e=document.createElement("a");return e.href=document.referrer,document.referrer&&e.host===window.location.host}function n(){return+r.get(t.cookieName)}return(...i)=>{t.onlySameReferrer&&o()||t.notSameReferrer&&!o()||t.showPerPage&&c.count>=t.showPerPage||t.showPerUser&&n()>=t.showPerUser||c.disabled||(e(...i),c.count++,r.set(t.cookieName,n()+1))}}(t.onBounce.bind({})),t}(),a=function(e){return[window,document,e]}(u);let s=[];return(s="auto"===u.method?i?["blur","history"]:["mouseout"]:Array.isArray(u.method)?u.method:[u.method]).forEach(e=>{n[e].create(...a)}),{disable:()=>{c.disabled=!0},enable:()=>{c.disabled=!1},count:()=>c.count}}}])});
//# sourceMappingURL=DBP-1.0.3.js.map