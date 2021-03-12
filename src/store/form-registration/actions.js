import store from '@store';
import { types } from './state.js';

export default {
  /**
   * Изменение полей формы
   * @param data
   */
  change: data => {
    store.dispatch({
      type: types.SET,
      payload: { data },
    });
  },
};
