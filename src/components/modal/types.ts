import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';
import { ReplaceEntryFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { PickedUser, PickedUserWithEntryId } from '../pick-random-user/types';

export interface PickUserModalProps {
  showModal: boolean;
  updatePickedRandomUser: ReplaceEntryFunction<PickedUser>;
  handleCloseModal: () => void;
  pickedUserWithEntryId: PickedUserWithEntryId;
  currentUser: CurrentUserData;
}
