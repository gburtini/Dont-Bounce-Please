const logger = require('../logger');
// eslint-disable-next-line id-length
const $ = require('jquery');

// how frequently to check if something blurable has focus
const REFOCUS_INTERVAL = 1000;

// how long after click to wait to allow blur events again.
const REFOCUS_TIMEOUT = 150;

// how long to wait for the click event to fire.
const BLURRY_TIMEOUT = 10;

// the element to be created and pointed at when something non-blurrable is selected.
const BLURRABLE_ELEMENT = "<a href='#' style='position:fixed; top:20px; left: -1000px;' />";

function create(root, document, variables) {
  const blurHiddenField = $(BLURRABLE_ELEMENT).appendTo('body');
  let canBlur = false;

  function refocus() {
    if (!$(':focus').length) {
      blurHiddenField.focus();
    }
  }
  setInterval(refocus, REFOCUS_INTERVAL);
  refocus();

  let disallowBlurReference = null;
  let blurCheckReference = null;
  $(document).mousedown(() => {
    // any on page clicks, set a global state to false so we can't trigger the blur bounce.
    // after the click, if an input is selected, then we're good. if it isn't, select it again.
    logger(+new Date(), 'blur: allowing blur for', REFOCUS_TIMEOUT);
    canBlur = true;
    clearTimeout(disallowBlurReference);
    disallowBlurReference = setTimeout(() => {
      logger(+new Date(), 'blur: disallowing blur');
      canBlur = false;
      refocus();
    }, REFOCUS_TIMEOUT);
  });

  $('*').blur(() => {
    logger(+new Date(), 'blur: queuing a canBlur check in', BLURRY_TIMEOUT);
    clearTimeout(blurCheckReference);
    blurCheckReference = setTimeout(() => {
      logger(+new Date(), 'blur: canBlur check', canBlur);
      if (!canBlur) {
        variables.onBounce('blur');
      }
    }, BLURRY_TIMEOUT);
  });
}

module.exports = {
  create,
};
