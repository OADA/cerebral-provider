import { Provider } from 'cerebral'
import oada from '@oada/oada-cache';
import uuid from 'uuid';
var connections = {};

const connect = function connect(payload) {
  if (payload.connection_id && connections[payload.connection_id]) return Promise.resolve(connections[payload.domain]);
  return oada.connect(payload).then((conn) => {
    conn.connection_id = payload.connection_id || uuid();
    connections[conn.connection_id] = conn;
    return conn;
  })
}

const get = function get(payload) {
  return connections[payload.connection_id].get(payload);
}

const put = function put(payload) {
  return connections[payload.connection_id].put(payload);
}

const post = function post(payload) {
  return connections[payload.connection_id].post(payload);
}


const _delete = function _delete(payload) {
  return connections[payload.connection_id].delete(payload);
}


const disconnect = function _disconnect(payload) {
  return connections[payload.connection_id].disconnect();
}

const resetCache = function resetCache(payload) {
  return connections[payload.connection_id].resetCache(payload);
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
