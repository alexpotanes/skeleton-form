import React, { useCallback } from 'react';
import modal from '@store/modal/actions';
import LayoutModal from '@components/layouts/layout-modal';
import useSelectorMap from '@utils/hooks/use-selector-map';
import formRegistration from '@store/form-registration/actions';
import FormRegistration from '@components/forms/form-registration';
import navigation from '@app/navigation';

function Info(props) {
  const select = useSelectorMap(state => ({
    formRegistration: state.formRegistration,
  }));
  const callbacks = {
    onCancel: useCallback(async () => {
      await modal.close('Cancel value');
    }, []),
    onChangeForm: useCallback(async data => {
      await formRegistration.change(data);
    }, []),
    onSubmitForm: useCallback(async data => {
      console.log(data);
      await navigation.goLogin();
      await modal.close('Cancel value');
    }, []),
  };

  return (
    <LayoutModal
      onClose={callbacks.onCancel}
      overflowTransparent={props.overflowTransparent}
      overflowClose={props.overflowClose}
    >
      <FormRegistration
        data={select.formRegistration.data}
        errors={select.formRegistration.errors}
        wait={select.formRegistration.wait}
        onChange={callbacks.onChangeForm}
        onSubmit={callbacks.onSubmitForm}
      />
    </LayoutModal>
  );
}

export default React.memo(Info);
