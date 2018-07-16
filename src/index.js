import { Provider } from 'cerebral'
import oada from '@oada/oada-cache';
import uuid from 'uuid';
var connections = {};

const connect = function connect(payload) {
  return oada.connect(payload).then((conn) => {
    conn.connection_id = uuid();
    connections[conn.connection_id] = conn;
    return conn;
  })
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
});
