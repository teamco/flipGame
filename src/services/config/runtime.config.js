/**
 * @export
 * @return {{
 *  SERVER_URL,
 *  ADMIN_URL,
 *  ADMIN_NS,
 *  UI_URL,
 *  SERVER_PORT,
 *  ADMIN_PORT,
 *  PORT,
 *  METHODS,
 *  API_NS
 * }}
 * @constant
 */
const RUNTIME_CONFIG = () => {

  /**
   * API definition
   * @type {{
   *  SERVER_URL,
   *  ADMIN_URL,
   *  ADMIN_NS,
   *  UI_URL,
   *  SERVER_PORT,
   *  ADMIN_PORT,
   *  PORT,
   *  API_NS
   * }}
   */
  const {
    SERVER_URL = 'http://localhost',
    ADMIN_URL = 'http://localhost',
    ADMIN_NS = '/admin',
    UI_URL = 'http://localhost',
    SERVER_PORT = '',
    ADMIN_PORT = 8005,
    PORT = 8006,
    API_NS = '/api/v1'
  } = process.env;

  return {
    SERVER_URL,
    ADMIN_URL,
    ADMIN_NS,
    UI_URL,
    SERVER_PORT,
    ADMIN_PORT,
    PORT,
    API_NS
  };
};

module.exports = { RUNTIME_CONFIG };