import React from 'react';
import LayoutPage from '@components/layouts/layout-page';
import HeaderContainer from '@containers/header-container';
import LayoutContent from '@components/layouts/layout-content';

function Main() {
  return (
    <LayoutPage header={<HeaderContainer />}>
      <LayoutContent>
        <h1>Добро пожаловать!</h1>
      </LayoutContent>
    </LayoutPage>
  );
}

export default React.memo(Main);
