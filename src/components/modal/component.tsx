import * as React from 'react';
import * as ReactModal from 'react-modal';
import { PickUserModalProps } from './types';
import './style.css';
import { PickedUserViewComponent } from './picked-user-view/component';

export function PickUserModal(props: PickUserModalProps) {
  const {
    showModal,
    handleCloseModal,
    updatePickedRandomUser,
    pickedUserWithEntryId,
    currentUser,
  } = props;

  const title = (pickedUserWithEntryId?.pickedUser?.userId === currentUser?.userId)
    ? 'You have been randomly picked'
    : 'Randomly picked user';

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
          aria-label="Close button"
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
