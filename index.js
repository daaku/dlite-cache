var prefix = ''
exports.setPrefix = function(newPrefix) {
  prefix = newPrefix
}

if (!window.localStorage) {
  exports.put = exports.get = exports.remove = exports.clear = function() {}
  return
}

function makeKey(key) {
  return prefix + ':' + key
}

function unixtime() {
  return Math.floor(Date.now() / 1000)
}

exports.put = function(key, value, expires_in) {
  localStorage[makeKey(key)] = JSON.stringify({
    value: value,
    expires: expires_in ? unixtime() + expires_in : null
  })
}

exports.get = function(key) {
  try {
    var value = JSON.parse(localStorage[makeKey(key)])
    if (!value.expires || value.expires > unixtime()) return value.value
  } catch(er) {}
  exports.remove(key)
}

exports.remove = function(key) {
  localStorage.removeItem(makeKey(key))
}

exports.clear = function() {
  localStorage.clear()
}
