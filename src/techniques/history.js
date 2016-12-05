const logger = require('../logger');
const $ = require('jquery');

const HASH_SUFFIX = 'bht';
function create(root, document, variables) {
  function contaminatePriorState(object = { bouncing: true }) {
    logger(+new Date(), 'contaminating state with', object);
    root.history.replaceState(object, root.title);
    root.history.pushState(null, root.title);
  }

  if ('replaceState' in root.history) {
    // Populate a 'bouncing' state in the queue and immediately move us away from that state.
    logger(+new Date(), 'history: replaceState mode');
    contaminatePriorState();

    // Handle popstate events
    $(root).bind('popstate', () => {
      logger(+new Date(), 'history: popState event caught with state', root.history.state);
      if (root.history.state && root.history.state.bouncing) {
        variables.onBounce('history');
      }
    });
  } else if ('onhashchange' in root) {
    // We don't support pushState, so instead use the hash in the URL.
    logger(+new Date(), 'history: onhashchange mode');
    root.location.replace(`#${HASH_SUFFIX}`);
    root.location.hash = '';
    $(root).hashchange(() => {
      logger(+new Date(), 'history: hashChange event caught with state', root.location.hash);
      if (root.location.hash.substr(HASH_SUFFIX.length * -1) === HASH_SUFFIX) {
        variables.onBounce('history');
      }
    });
  }
}

module.exports = {
  create,
};
