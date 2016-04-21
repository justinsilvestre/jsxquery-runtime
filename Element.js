var renderAttributes = require('./renderAttributes');

module.exports = function(tagName, attributes, children) {
  this.__isElement__ = true;

  this.render = function() {
    var content = children.map(function(child) { return child.render(); }).join('')
    return '<' + tagName + renderAttributes(attributes) + '>'
      + content
      + '</' + tagName + '>';
  }
}