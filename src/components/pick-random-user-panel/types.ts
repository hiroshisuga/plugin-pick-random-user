import { IntlShape } from 'react-intl';
import { CurrentUserData, PluginApi } from 'bigbluebutton-html-plugin-sdk';

export interface PickRandomUserPanelComponentProps {
    pluginApi: PluginApi;
    intl: IntlShape;
    setShowModal: (value: boolean) => void;
    currentUser: CurrentUserData;
}

export interface PanelInformationFromPresenter {
    includeModerators: boolean;
    includePresenter: boolean;
    includePickedUsers: boolean;
}
