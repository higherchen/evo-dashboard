var global = {};
module.exports = {
  setItem: function(key, value) {
    global[key] = value;
  },
  getItem: function(key) {
    return global[key];
  },
  removeItem: function(key) {
    delete global[key];
  },
  hasItem: function(key) {
    return global.hasOwnProperty(key);
  }
};
