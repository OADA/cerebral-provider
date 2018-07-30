import { Provider } from 'cerebral'
import oada from '@oada/oada-cache';
import uuid from 'uuid';
var connections = {};

const connect = function connect(args) {
  if (args.connection_id && connections[args.connection_id]) return Promise.resolve(connections[args.connection_id]);
  return oada.connect(args).then((conn) => {
    conn.connection_id = args.connection_id || uuid();
    connections[conn.connection_id] = conn;
    return conn;
  })
}

const get = function get(args) {
  if (args.watch && args.watch.signal) {
    args.watch.func = this.context.controller.getSignal(args.watch.signal);
  }
  return connections[args.connection_id].get(args);
}

const put = function put(args) {
  return connections[args.connection_id].put(args);
}

const post = function post(args) {
  return connections[args.connection_id].post(args);
}


const _delete = function _delete(args) {
  return connections[args.connection_id].delete(args);
}


const disconnect = function _disconnect(args) {
  return connections[args.connection_id].disconnect();
}

const resetCache = function resetCache(args) {
  return connections[args.connection_id].resetCache(args);
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
