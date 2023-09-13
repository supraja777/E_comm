module.exports = (ProductFunction) => (req, res, next) => {
  Promise.resolve(ProductFunction(req, res, next)).catch(next);
};
