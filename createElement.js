var Element = require('./Element');
var Child = require('./Child');
var escape = require('lodash.escape');

module.exports = function(tagName, attributes) {
  var attributes = attributes || {};
  var flattenedChildArgs = [].slice.call(arguments, 2).reduce(function(a, b) {
    return a.concat(b);
  }, []);

  var hasRawChild = 'dangerouslySetInnerHTML' in attributes;
  var children = hasRawChild
    ? [new Child(attributes.dangerouslySetInnerHTML.__html, true)]
    : flattenedChildArgs.map(function(val) { return new Child(val); });

  if (hasRawChild)
    delete attributes.dangerouslySetInnerHTML;
  return new Element(tagName, attributes, children);
};
