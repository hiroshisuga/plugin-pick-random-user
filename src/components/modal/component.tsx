import * as React from 'react';
import * as ReactModal from 'react-modal';
import { PickUserModalProps } from './types';
import './style.css';
import { PickedUserViewComponent } from './picked-user-view/component';
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

  const title = (pickedUserWithEntryId?.pickedUser?.userId === currentUser?.userId)
    ? intl.formatMessage(intlMessages.youWerePicked)
    : intl.formatMessage(intlMessages.pickedUser);

  return (
    <ReactModal
      className="plugin-modal"
      overlayClassName="modal-overlay"
      isOpen={showModal}
      onRequestClose={handleCloseModal}
    >
      <div
        style={{
          width: '100%', alignItems: 'flex-end', display: 'flex', flexDirection: 'column',
        }}
      >
        <button
          type="button"
          className="clickable-close"
          onClick={() => {
            handleCloseModal();
          }}
          aria-label={intl.formatMessage(intlMessages.closeButton)}
        >
          <i
            className="icon-bbb-close"
          />
        </button>
      </div>
      <PickedUserViewComponent
        {...{
          currentUser,
          updatePickedRandomUser,
          pickedUserWithEntryId,
          title,
        }}
      />
    </ReactModal>
  );
}
