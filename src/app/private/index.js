import React from 'react';
import LayoutPage from '@components/layouts/layout-page';
import HeaderContainer from '@containers/header-container';
import LayoutContent from '@components/layouts/layout-content';

function Private() {
  return (
    <LayoutPage header={<HeaderContainer />}>
      <LayoutContent>
        <h1>Внутренняя страница для авторизованных</h1>
      </LayoutContent>
    </LayoutPage>
  );
}

export default React.memo(Private);
