import React, { Fragment, useCallback } from 'react';
import LayoutPage from '@components/layouts/layout-page';
import HeaderContainer from '@containers/header-container';
import LayoutContent from '@components/layouts/layout-content';
import FormLogin from '@components/forms/form-login';
import useSelectorMap from '@utils/hooks/use-selector-map';
import formLogin from '@store/form-login/actions';
import navigation from '@app/navigation';

function Login(props) {
  const select = useSelectorMap(state => ({
    formLogin: state.formLogin,
  }));

  const callbacks = {
    onChangeForm: useCallback(async data => {
      await formLogin.change(data);
    }, []),
    onSubmitForm: useCallback(async data => {
      await formLogin.submit(data);
      // @todo перейти на страницу, с которой был редирект или по умочланию в приватный раздел
      navigation.goPrivate();
    }, []),
  };

  return (
    <LayoutPage header={<HeaderContainer />}>
      <LayoutContent>
        <Fragment>
          <h1>Авторизация</h1>
          <FormLogin
            data={select.formLogin.data}
            errors={select.formLogin.errors}
            wait={select.formLogin.wait}
            onChange={callbacks.onChangeForm}
            onSubmit={callbacks.onSubmitForm}
          />
        </Fragment>
      </LayoutContent>
    </LayoutPage>
  );
}

export default React.memo(Login);
