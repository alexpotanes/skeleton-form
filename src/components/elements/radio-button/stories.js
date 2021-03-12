import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

import RadioButton from './index';

storiesOf('elements/RadioButton', module).add(
  'default',
  withState({ value: 'male' })(
    withInfo(`Радиокнопки`)(({ store }) => (
      <Fragment>
        <RadioButton
          type="radio"
          name="gender"
          value="male"
          theme="radio"
          title="Мужчина"
          onChange={() => store.set({ value: 'male' })}
          checked={store.state.value === 'male'}
        />
        <RadioButton
          type="radio"
          name="gender"
          value="female"
          theme="radio"
          title="Женщина"
          onChange={() => store.set({ value: 'female' })}
          checked={store.state.value === 'female'}
        />
      </Fragment>
    )),
  ),
);
