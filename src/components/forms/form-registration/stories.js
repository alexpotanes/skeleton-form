import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';

import FormRegistration from './index';

const state = {
  data: {
    name: 'Test',
    login: 'test@example.com',
    password: '123456',
    gender: 'male',
  },
  errors: { login: 'Плохой логин' },
};

storiesOf('forms/FormLogin', module).add(
  'default',
  withState(state)(({ store }) => (
    <FormRegistration
      data={store.state.data}
      errors={store.state.errors}
      onChange={data => store.set({ data })}
      onSubmit={action('submit')}
    />
  )),
);
