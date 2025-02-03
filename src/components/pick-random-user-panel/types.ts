import { CurrentUserData, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { PickedUserWithEntryId } from '../pick-random-user/types';

export interface PickRandomUserPanelComponentProps {
    pluginApi: PluginApi;
    pickedUserWithEntryId: PickedUserWithEntryId;
    setShowModal: (value: boolean) => void;
    currentUser: CurrentUserData;
}

export interface PanelInformationFromPresenter {
    skipModerators: boolean;
    skipPresenter: boolean;
    includePickedUsers: boolean;
}
