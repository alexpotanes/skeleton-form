import params from '@utils/query-params';
import Common from '@api/common';

export default class Users extends Common {
  /**
   * @param api {AxiosInstance} Экземпляр библиотеки axios
   * @param path {String} Путь в url по умолчанию
   */
  constructor(api, path = 'users') {
    super(api, path);
  }

  /**
   * Выбор одного юзера по токену (текущего авторизованного)
   * @return {Promise}
   */
  current({ fields = '*', ...other }) {
    return this.http.get(`/api/v1/${this.path}/self`, { params: params({ fields, ...other }) });
  }

  /**
   * Авторизация
   * @param login
   * @param password
   * @param remember
   * @param fields
   * @param other
   * @returns {Promise}
   */
  login({ login, password, remember = false, fields = '*', ...other }) {
    // Mock request
    // return Promise.resolve({ data: { result: { user: { _id: 123 }, token: '123456' } } });
    return this.http.post(
      `/api/v1/users/sign`,
      { login, password, remember },
      { params: params({ fields, ...other }) },
    );
  }

  /**
   * Выход
   * @returns {Promise}
   */
  logout() {
    return this.http.delete(`/api/v1/users/sign`);
  }
}
