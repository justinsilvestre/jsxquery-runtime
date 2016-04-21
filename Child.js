var escape = require('lodash.escape');

module.exports = function(val, isRaw) {
  this.render = function() {
    if (val && typeof val === 'object' && '__isElement__' in val)
      return val.render();

    return isRaw ? val : escape(val);
  };
};
