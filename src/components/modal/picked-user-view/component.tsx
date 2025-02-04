import * as React from 'react';
import { useEffect } from 'react';
import { PickedUserViewComponentProps } from './types';
import Styled from './styles';
import { Role } from '../../pick-random-user/enums';

export function PickedUserViewComponent(props: PickedUserViewComponentProps) {
  const {
    title,
    pickedUserWithEntryId,
    currentUser,
    updatePickedRandomUser,
    isYou,
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
    <Styled.AvatarContainer>
      <Styled.Title>{title}</Styled.Title>
      {
        (pickedUserWithEntryId) ? (
          <>
            <Styled.ModalAvatar
              viewer={pickedUserWithEntryId?.pickedUser.presenter}
              isYou={isYou}
              moderator={pickedUserWithEntryId?.pickedUser.role === Role.MODERATOR}
              style={{ backgroundColor: `${pickedUserWithEntryId.pickedUser?.color}` }}
            >
              {pickedUserWithEntryId.pickedUser?.name.slice(0, 2)}
            </Styled.ModalAvatar>
            <Styled.UserName>{pickedUserWithEntryId.pickedUser?.name}</Styled.UserName>
          </>
        ) : null
      }
    </Styled.AvatarContainer>
  );
}
