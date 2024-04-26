const _host = process.env.HOST || 'localhost';
const _port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const config = {
  port: _port,
  host: process.env.NODE_ENV !== 'production' ? `http://${_host}:${_port}` : `${_host}`,
};