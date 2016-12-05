(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define("DBP", ["jquery"], factory);
	else if(typeof exports === 'object')
		exports["DBP"] = factory(require("jquery"));
	else
		root["DBP"] = factory(root["$"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var techniques = __webpack_require__(1);
	var Cookie = __webpack_require__(7);
	
	/*
	 * options is either an object of options including an onBounce method, or it is a function to be run onBounce.
	 * knownMobile, if specified, overrules our mobile check.
	 */
	function initialize(options) {
	  var knownMobile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
	
	  var userOptions = typeof options === 'function' ? { onBounce: options } : options;
	  var isMobile = knownMobile !== undefined ? knownMobile : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
	  var state = {
	    disabled: false,
	    count: 0
	  };
	
	  function getDefaultedOptions() {
	    var defaultOptions = {
	      method: 'auto', // the method used "auto", "mouseout", "history" or "blur".
	      showPerPage: 1, // the maximum number of times to trigger per page
	      showPerUser: undefined, // the maximum number of times to trigger per user (cookie based)
	      cookieName: 'dbp',
	
	      // mouseout detector settings
	      distance: 100, // minimum distance from the top the user must have exited the window to trigger.
	      sensitivity: 10, // minimum distance the mouse must have moved lately to trigger.
	      scrollDelay: 500, // ms to wait after scrolling before mouseout will register.
	
	      onlySameReferrer: false, // only show if the referrer is the same domain (user has been on site)
	      notSameReferrer: false, // only show if the referrer is not the same domain (user just came in)
	
	      onBounce: function onBounce() {
	        console.log('bounce');
	      } };
	
	    var variables = Object.assign({}, defaultOptions, userOptions);
	
	    function wrapBounceFunction(bounceFunction) {
	      function checkReferrer() {
	        var anchorTag = document.createElement('a');
	        anchorTag.href = document.referrer;
	        return document.referrer && anchorTag.host === window.location.host;
	      }
	
	      function readUserCount() {
	        return +Cookie.get(variables.cookieName);
	      }
	      function incrementUserCount() {
	        Cookie.set(variables.cookieName, readUserCount() + 1);
	      }
	
	      return function () {
	        if (variables.onlySameReferrer && checkReferrer()) return;
	        if (variables.notSameReferrer && !checkReferrer()) return;
	
	        if (variables.showPerPage && state.count > variables.showPerPage) return;
	        if (variables.showPerUser && readUserCount() > variables.showPerUser) return;
	
	        if (state.disabled) return;
	
	        bounceFunction.apply(undefined, arguments);
	        state.count++;
	        incrementUserCount();
	      };
	    }
	
	    variables.onBounce = wrapBounceFunction(variables.onBounce.bind({}));
	    return variables;
	  }
	
	  function getCreationArguments(variables) {
	    return [window, document, variables];
	  }
	
	  var variables = getDefaultedOptions();
	  var args = getCreationArguments(variables);
	
	  var appliedTechniques = [];
	  if (variables.method === 'auto') appliedTechniques = isMobile ? ['blur', 'history'] : ['mouseout'];else appliedTechniques = Array.isArray(variables.method) ? variables.method : [variables.method];
	
	  appliedTechniques.forEach(function (technique) {
	    var _techniques$technique;
	
	    (_techniques$technique = techniques[technique]).create.apply(_techniques$technique, _toConsumableArray(args));
	  });
	
	  return {
	    disable: function disable() {
	      state.disabled = true;
	    },
	    enable: function enable() {
	      state.disabled = false;
	    },
	    count: function count() {
	      return state.count;
	    }
	  };
	}
	
	module.exports = initialize;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  blur: __webpack_require__(2),
	  history: __webpack_require__(5),
	  mouseout: __webpack_require__(6)
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var logger = __webpack_require__(3);
	// eslint-disable-next-line id-length
	var $ = __webpack_require__(4);
	
	// how freqeutly to check if something blurrable has focus
	var REFOCUS_INTERVAL = 1000;
	
	// how long after click to wait to allow blur events again.
	var REFOCUS_TIMEOUT = 150;
	
	// how long to wait for the click event to fire.
	var BLURRY_TIMEOUT = 10;
	
	// the element to be created and pointed at when something non-blurrable is selected.
	var BLURRABLE_ELEMENT = "<a href='#' style='position:fixed; top:20px; left: -1000px;' />";
	
	function create(root, document, variables) {
	  var blurHiddenField = $(BLURRABLE_ELEMENT).appendTo('body');
	  var canBlur = false;
	
	  function refocus() {
	    if (!$(':focus').length) {
	      blurHiddenField.focus();
	    }
	  }
	  setInterval(refocus, REFOCUS_INTERVAL);
	  refocus();
	
	  var disallowBlurReference = null;
	  var blurCheckReference = null;
	  $(document).mousedown(function () {
	    // any on page clicks, set a global state to false so we can't trigger the blur bounce.
	    // after the click, if an input is selected, then we're good. if it isn't, select it again.
	    logger(+new Date(), 'blur: allowing blur for', REFOCUS_TIMEOUT);
	    canBlur = true;
	    clearTimeout(disallowBlurReference);
	    disallowBlurReference = setTimeout(function () {
	      logger(+new Date(), 'blur: disallowing blur');
	      canBlur = false;
	      refocus();
	    }, REFOCUS_TIMEOUT);
	  });
	
	  $('*').blur(function () {
	    logger(+new Date(), 'blur: queuing a canBlur check in', BLURRY_TIMEOUT);
	    clearTimeout(blurCheckReference);
	    blurCheckReference = setTimeout(function () {
	      logger(+new Date(), 'blur: canBlur check', canBlur);
	      if (!canBlur) {
	        variables.onBounce('blur');
	      }
	    }, BLURRY_TIMEOUT);
	  });
	}
	
	module.exports = {
	  create: create
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {
	  for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
	    messages[_key] = arguments[_key];
	  }
	
	  // console.log(...messages);
	  return messages;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var logger = __webpack_require__(3);
	var $ = __webpack_require__(4);
	
	var HASH_SUFFIX = 'bht';
	function create(root, document, variables) {
	  function contaminatePriorState() {
	    var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { bouncing: true };
	
	    logger(+new Date(), 'contaminating state with', object);
	    root.history.replaceState(object, root.title);
	    root.history.pushState(null, root.title);
	  }
	
	  if ('replaceState' in root.history) {
	    // Populate a 'bouncing' state in the queue and immediately move us away from that state.
	    logger(+new Date(), 'history: replaceState mode');
	    contaminatePriorState();
	
	    // Handle popstate events
	    $(root).bind('popstate', function () {
	      logger(+new Date(), 'history: popState event caught with state', root.history.state);
	      if (root.history.state && root.history.state.bouncing) {
	        variables.onBounce('history');
	      }
	    });
	  } else if ('onhashchange' in root) {
	    // We don't support pushState, so instead use the hash in the URL.
	    logger(+new Date(), 'history: onhashchange mode');
	    root.location.replace('#' + HASH_SUFFIX);
	    root.location.hash = '';
	    $(root).hashchange(function () {
	      logger(+new Date(), 'history: hashChange event caught with state', root.location.hash);
	      if (root.location.hash.substr(HASH_SUFFIX.length * -1) === HASH_SUFFIX) {
	        variables.onBounce('history');
	      }
	    });
	  }
	}
	
	module.exports = {
	  create: create
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var logger = __webpack_require__(3);
	var $ = __webpack_require__(4);
	
	// the number of movements to track to measure sensitivity.
	var NUMBER_OF_MOVEMENTS = 10;
	
	function create(root, document, variables) {
	  var timerReference = null;
	  var movements = Array(NUMBER_OF_MOVEMENTS).fill({ x: 0, y: 0 });
	  var scrolling = false;
	
	  $(document).mousemove(function (event) {
	    // track the movements.
	    movements.unshift({
	      x: event.clientX,
	      y: event.clientY
	    });
	
	    movements = movements.slice(0, NUMBER_OF_MOVEMENTS);
	  });
	
	  $(document).mouseout(function (event) {
	    logger(+new Date(), 'mouseout: mouseout event fired, scrolling:', scrolling);
	
	    if (!scrolling) {
	      var from = event.relatedTarget || event.toElement;
	      logger(+new Date(), 'mouseout: client Y: ', event.clientY);
	
	      if (from && from.nodeName !== 'HTML') return; // not the root element
	      if (event.clientY <= variables.distance && movements[NUMBER_OF_MOVEMENTS - 1].y - movements[0].y > variables.sensitivity) {
	        variables.onBounce('mouseout');
	      }
	    }
	  });
	
	  if (variables.scrollDelay) {
	    $(root).scroll(function () {
	      scrolling = true;
	      logger(+new Date(), 'mouseout: scroll delay activated');
	
	      clearTimeout(timerReference);
	      timerReference = setTimeout(function () {
	        logger(+new Date(), 'mouseout: scroll delay deactivated');
	        scrolling = false;
	      }, variables.scrollDelay);
	    });
	  }
	}
	
	module.exports = {
	  create: create
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.3
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
	
		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
	
				// Write
	
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
	
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
	
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
	
					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
	
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
	
					return (document.cookie = [
						key, '=', value,
						attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						attributes.path ? '; path=' + attributes.path : '',
						attributes.domain ? '; domain=' + attributes.domain : '',
						attributes.secure ? '; secure' : ''
					].join(''));
				}
	
				// Read
	
				if (!key) {
					result = {};
				}
	
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
	
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');
	
					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
	
					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);
	
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
	
						if (key === name) {
							result = cookie;
							break;
						}
	
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
	
				return result;
			}
	
			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
	
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
	
			api.withConverter = init;
	
			return api;
		}
	
		return init(function () {});
	}));


/***/ }
/******/ ])
});
;
//# sourceMappingURL=DBP-1.0.0.js.map