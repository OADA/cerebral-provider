import { Provider } from 'cerebral'
import oada from '@oada/oada-cache';

var connections = {};
var currentIndex = 0;

const connect = function connect(payload) {
  let conn = oada.connect(payload);
  conn.connection_id = currentIndex++;
  connections[conn.connection_id] = conn;
  return conn;
}

const get = function get(payload) {
  connections[payload.connection_id].get(payload);
}

const put = function put(payload) {
  connections[payload.connection_id].put(payload);
}

const post = function post(payload) {
  connections[payload.connection_id].post(payload);
}


const _delete = function _delete(payload) {
  connections[payload.connection_id].delete(payload);
}


const disconnect = function _disconnect(payload) {
  connections[payload.connection_id].disconnect();
}

const resetCache = function resetCache(payload) {
  connections[payload.connection_id].resetCache(payload);
}

export default Provider({
  connect,
  get,
  put,
  post,
  delete: _delete,
  resetCache,
  disconnect,
});
