import * as React from 'react';
import { useEffect } from 'react';
import { PickedUserViewComponentProps } from './types';

export function PickedUserViewComponent(props: PickedUserViewComponentProps) {
  const {
    title,
    pickedUserWithEntryId,
    currentUser,
    updatePickedRandomUser,
  } = props;

  useEffect(() => {
    if (currentUser?.presenter && pickedUserWithEntryId) {
      updatePickedRandomUser(pickedUserWithEntryId.entryId, {
        ...pickedUserWithEntryId.pickedUser,
        isPresenterViewing: true,
      });
    }
    return () => {
      if (currentUser?.presenter && pickedUserWithEntryId) {
        updatePickedRandomUser(pickedUserWithEntryId.entryId, {
          ...pickedUserWithEntryId.pickedUser,
          isPresenterViewing: false,
        });
      }
    };
  }, []);

  return (
    <div
      style={{
        width: '100%', height: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column',
      }}
    >
      <h1 className="title">{title}</h1>
      {
        (pickedUserWithEntryId) ? (
          <>
            <div
              className="modal-avatar"
              style={{ backgroundColor: `${pickedUserWithEntryId.pickedUser?.color}` }}
            >
              {pickedUserWithEntryId.pickedUser?.name.slice(0, 2)}
            </div>
            <p className="user-name">{pickedUserWithEntryId.pickedUser?.name}</p>
          </>
        ) : null
      }
    </div>
  );
}
