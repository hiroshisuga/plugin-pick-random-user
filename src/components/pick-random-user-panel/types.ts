import { IntlShape } from 'react-intl';
import { CurrentUserData, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { PickedUserWithEntryId } from '../pick-random-user/types';

export interface PickRandomUserPanelComponentProps {
    pluginApi: PluginApi;
    intl: IntlShape;
    pickedUserWithEntryId: PickedUserWithEntryId;
    setShowModal: (value: boolean) => void;
    currentUser: CurrentUserData;
}

export interface PanelInformationFromPresenter {
    includeModerators: boolean;
    includePresenter: boolean;
    includePickedUsers: boolean;
}
