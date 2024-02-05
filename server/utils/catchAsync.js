// This module will take async functions pass the req, res, next argument to it which will return promoise and it will handle its error using the catch method and pass it to the next middleware which will handle error and send 
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  }
}