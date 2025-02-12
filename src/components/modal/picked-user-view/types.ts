import { CurrentUserData } from 'bigbluebutton-html-plugin-sdk';
import { ReplaceEntryFunction } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { PickedUser, PickedUserWithEntryId } from '../../pick-random-user/types';

export interface PickedUserViewComponentProps {
    title: string;
    updatePickedRandomUser: ReplaceEntryFunction<PickedUser>;
    pickedUserWithEntryId: PickedUserWithEntryId;
    currentUser: CurrentUserData;
    isYou: boolean;
}
