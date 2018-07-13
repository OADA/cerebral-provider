import { Provider } from 'cerebral'
import oada from '@oada/oada-cache';

var connections = {};

const connect = function connect(payload) {
  let conn = oada.connect(payload);
  connections[conn.connection_id] = conn;
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

const resetCache = function resetCache(payload) {
  connections[payload.connection_id].clearCachee(payload);
}

export default Provider({
  connect,
  get,
  put,
  post,
  delete: _delete,
  resetCache
});
