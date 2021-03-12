import { createBrowserHistory, createMemoryHistory } from 'history';
import qs from 'qs';
import mc from 'merge-change';

class Navigation {
  constructor() {
    this._options = {};
    this._history = {};
    this._configured = false;
  }

  configure(options) {
    this._options = mc.merge(options, {});
    switch (options.type) {
      case 'memory':
        this._history = createMemoryHistory(options);
        this._configured = true;
        break;
      case 'browser':
      default:
        this._history = createBrowserHistory(options);
        this._configured = true;
        break;
    }
  }

  get history() {
    return this._history;
  }

  get location() {
    return this._history.location;
  }

  // get length() {
  //   return this._history.length;
  // }
  //
  // get action() {
  //   return this._history.action;
  // }

  // createHref(location) {
  //   return this._history.createHref(location);
  // }

  push(path, state) {
    return this._history.push(path, state);
  }

  replace(path, state) {
    return this._history.replace(path, state);
  }

  go(n) {
    return this._history.go(n);
  }

  goBack() {
    return this._history.goBack();
  }

  goForward() {
    return this._history.goForward();
  }

  block(prompt) {
    return this._history.block(prompt);
  }

  listen(listener) {
    return this._history.listen(listener);
  }

  /**
   * Создание ссылки с учётом текущего пути и search (query) параметров
   * @param path Новый путь. Если не указан, то используется текущий
   * @param searchParams Объект с search параметарами. Обрабтываются также операторы $set, $unset, $leave, $pull, $push при слиянии новых параметров с текущими
   * @param clearSearch Удалить все текущие search параметры
   * @returns {string} Итоговая строка для href ссылки
   */
  makeHref(path, searchParams = {}, clearSearch = false) {
    const currentParams = this.getSearchParams();
    const newParams = clearSearch ? searchParams : mc.update(currentParams, searchParams);
    let search = qs.stringify(newParams, {
      addQueryPrefix: true,
      arrayFormat: 'comma',
      encode: false,
    });
    if (!path) {
      path = this.getPath();
    }
    return path + search;
  }

  /**
   * Текуший путь в адресе
   * @returns {*}
   */
  getPath() {
    return this._history.location.pathname;
  }

  /**
   * Текущие search параметры, распарсенные из строки
   * @returns {*}
   */
  getSearchParams() {
    return qs.parse(this._history.location.search, { ignoreQueryPrefix: true, comma: true }) || {};
  }

  /**
   * Установка search параметров
   * @param params Новые параметры
   * @param push Способ обновления Location.search. Если false, то используется history.replace()
   * @param clear Удалить текущие параметры
   * @param path Новый путь. Если не указан, то используется текущий
   */
  setSearchParams(params, push = true, clear = false, path) {
    const currentParams = this.getSearchParams();
    const newParams = clear ? params : mc.update(currentParams, params);
    let newSearch = qs.stringify(newParams, {
      addQueryPrefix: true,
      arrayFormat: 'comma',
      encode: false,
    });
    const url = (path || window.location.pathname) + newSearch + window.location.hash;
    if (push) {
      window.history.pushState({}, '', url);
    } else {
      window.history.replaceState({}, '', url);
    }
  }

  /**
   * Удаление всех search параметров
   * @param push Способ обновления Location.search. Если false, то используется window.history.replaceState()
   */
  clearSearchParams(push = true) {
    const url = window.location.pathname + window.location.hash;
    if (push) {
      window.history.pushState({}, '', url);
    } else {
      window.history.replaceState({}, '', url);
    }
  }

  /**
   * Custom navigations
   * @param push Способ обновления истории роутера. Если false, то используется history.replace()
   */
  goPrivate(push = true) {
    push ? this._history.push('/private') : this._history.replace('/private');
  }

  /**
   * Custom navigations
   * @param push Способ обновления истории роутера. Если false, то используется history.replace()
   */
  goLogin(push = true) {
    push ? this._history.push('/login') : this._history.replace('/login');
  }
}

export default new Navigation();
