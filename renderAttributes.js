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

module.exports = function(obj) {
  var renderedAttributes = [];
  var stringValue;
  var attributeRawValue;

  for (name in obj) {
    attributeRawValue = attributeValue(name, obj[name]);
    if (attributeRawValue !== false) {
      stringValue = typeof attributeRawValue === 'string' ? attributeRawValue : JSON.stringify(attributeRawValue);
      renderedAttributes.push(attributeName(name) + '="' + stringValue + '"');
    }
  }

  return renderedAttributes.length
    ?  (' ' + renderedAttributes.join (' '))
    : '';
};
