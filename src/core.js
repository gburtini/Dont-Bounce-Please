const techniques = require('./techniques');
const Cookie = require('js-cookie');

/*
 * options is either an object of options including an onBounce method, or it is a function to be run onBounce.
 * knownMobile, if specified, overrules our mobile check.
 */
function initialize(options, knownMobile = undefined) {
  const userOptions = (typeof options === 'function') ? { onBounce: options } : options;
  const isMobile = (knownMobile !== undefined) ? knownMobile : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  const state = {
    disabled: false,
    count: 0,
  };

  function getDefaultedOptions() {
    const defaultOptions = {
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

      onBounce: () => { console.log('bounce'); }, // The default onBounce handler
    };

    const variables = Object.assign({}, defaultOptions, userOptions);

    function wrapBounceFunction(bounceFunction) {
      function checkReferrer() {
        const anchorTag = document.createElement('a');
        anchorTag.href = document.referrer;
        return document.referrer && anchorTag.host === window.location.host;
      }

      function readUserCount() {
        return +Cookie.get(variables.cookieName);
      }
      function incrementUserCount() {
        Cookie.set(variables.cookieName, readUserCount() + 1);
      }


      return (...args) => {
        if (variables.onlySameReferrer && checkReferrer()) return;
        if (variables.notSameReferrer && !checkReferrer()) return;

        if (variables.showPerPage && state.count > variables.showPerPage) return;
        if (variables.showPerUser && readUserCount() > variables.showPerUser) return;

        if (state.disabled) return;

        bounceFunction(...args);
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

  const variables = getDefaultedOptions();
  const args = getCreationArguments(variables);

  let appliedTechniques = [];
  if (variables.method === 'auto') appliedTechniques = isMobile ? ['blur', 'history'] : ['mouseout'];
  else appliedTechniques = Array.isArray(variables.method) ? variables.method : [variables.method];

  appliedTechniques.forEach((technique => {
    techniques[technique].create(...args);
  }));

  return {
    disable: () => {
      state.disabled = true;
    },
    enable: () => {
      state.disabled = false;
    },
    count: () => {
      return state.count;
    },
  };
}

module.exports = initialize;
