export const types = {
  SET: Symbol('SET'),
};

export default {
  data: {
    name: '',
    login: '',
    password: '',
    gender: 'male',
  },
  wait: false,
  errors: null,
};
