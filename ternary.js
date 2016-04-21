module.exports = function(test, consequent, alternate) {
  return test ? consequent : alternate;
};
