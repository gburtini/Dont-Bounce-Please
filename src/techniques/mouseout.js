const logger = require('../logger');
const $ = require('jquery');

// the number of movements to track to measure sensitivity.
const NUMBER_OF_MOVEMENTS = 10;

function create(root, document, variables) {
  let timerReference = null;
  let movements = Array(NUMBER_OF_MOVEMENTS).fill({ x: 0, y: 0 });
  let scrolling = false;

  $(document).mousemove(event => {
    // track the movements.
    movements.unshift({
      x: event.clientX,
      y: event.clientY,
    });

    movements = movements.slice(0, NUMBER_OF_MOVEMENTS);
  });

  $(document).mouseout(event => {
    logger(+new Date(), 'mouseout: mouseout event fired, scrolling:', scrolling);

    if (!scrolling) {
      const from = event.relatedTarget || event.toElement;
      logger(+new Date(), 'mouseout: client Y: ', event.clientY);

      if (from && from.nodeName !== 'HTML') return; // not the root element
      if (
        event.clientY <= variables.distance &&
        movements[NUMBER_OF_MOVEMENTS - 1].y - movements[0].y > variables.sensitivity
      ) {
        variables.onBounce('mouseout');
      }
    }
  });

  if (variables.scrollDelay) {
    $(root).scroll(() => {
      scrolling = true;
      logger(+new Date(), 'mouseout: scroll delay activated');

      clearTimeout(timerReference);
      timerReference = setTimeout(() => {
        logger(+new Date(), 'mouseout: scroll delay deactivated');
        scrolling = false;
      }, variables.scrollDelay);
    });
  }
}

module.exports = {
  create,
};
