const sessionIdtouserMap = new Map();

function setUser(id, user) {
  sessionIdtouserMap.set(id, user);
}

function getUser(id) {
  return sessionIdtouserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
