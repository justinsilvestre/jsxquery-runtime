function attributeName(jsxName) {
  return {
    htmlFor: 'for',
    className: 'class'
  }[jsxName] || jsxName;
}

function attributeValue(jsxName, jsxValue) {
  return jsxValue === true
    ? attributeName(jsxName)
    : jsxValue;
}

function attributeIsToBeRendered(name, rawValue) {
  return rawValue === false || name.match(/on[A-Z][a-z]+/)
    ? false
    : true;
}

module.exports = function(obj) {
  var renderedAttributes = [];
  var stringValue;
  var attributeRawValue;

  for (name in obj) {
    attributeRawValue = attributeValue(name, obj[name]);
    if (attributeIsToBeRendered(name, attributeRawValue)) {
      stringValue = typeof attributeRawValue === 'string' ? attributeRawValue : JSON.stringify(attributeRawValue);
      renderedAttributes.push(attributeName(name) + '="' + stringValue + '"');
    }
  }

  return renderedAttributes.length
    ?  (' ' + renderedAttributes.join (' '))
    : '';
};
