import * as React from 'react';
import { PickUserModalProps } from './types';
import { PickedUserViewComponent } from './picked-user-view/component';
import Styled from './styles';
import './raw_styles.css';
import { intlMessages } from '../../intlMessages';

export function PickUserModal(props: PickUserModalProps) {
  const {
    intl,
    showModal,
    handleCloseModal,
    updatePickedRandomUser,
    pickedUserWithEntryId,
    currentUser,
  } = props;

  const isYou = (pickedUserWithEntryId?.pickedUser?.userId === currentUser?.userId);

  const title = isYou
    ? intl.formatMessage(intlMessages.youWerePicked)
    : intl.formatMessage(intlMessages.pickedUser);

  return (
    <Styled.PluginModal
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={handleCloseModal}
    >
      <Styled.ModalContainer>
        <Styled.ButtonClose
          type="button"
          onClick={() => {
            handleCloseModal();
          }}
          aria-label={intl.formatMessage(intlMessages.closeButton)}
        >
          <i
            className="icon-bbb-close"
          />
        </Styled.ButtonClose>
      </Styled.ModalContainer>
      <PickedUserViewComponent
        {...{
          currentUser,
          updatePickedRandomUser,
          pickedUserWithEntryId,
          title,
          isYou,
        }}
      />
    </Styled.PluginModal>
  );
}
