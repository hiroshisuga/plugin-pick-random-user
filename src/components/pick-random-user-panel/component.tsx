import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataChannelTypes, RESET_DATA_CHANNEL } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';

import { USERS_MORE_INFORMATION } from './queries';
import { PickedUser, UsersMoreInformationGraphqlResponse } from '../pick-random-user/types';
import { PanelInformationFromPresenter, PickRandomUserPanelComponentProps } from './types';
import { Role } from '../pick-random-user/enums';
import { intlMessages } from '../../intlMessages';

const MAX_NAMES_TO_SHOW = 3;
const DATA_CHANNEL_LOADING_TOLERANCE_TIMEOUT = 3000;

const makeHorizontalListOfNames = (list?: PickedUser[]) => {
  const length = list?.length;
  const formattedList = list?.filter((_, index) => {
    if (length > MAX_NAMES_TO_SHOW) return index < MAX_NAMES_TO_SHOW;
    return true;
  }).reduce((accumulator, currentValue) => ((accumulator !== '') ? `${accumulator}, ${currentValue.name}` : currentValue.name), '');
  if (length > MAX_NAMES_TO_SHOW) return `${formattedList}...`;
  return formattedList;
};

const makeVerticalListOfNames = (
  list?: DataChannelEntryResponseType<PickedUser>[],
) => list?.filter((u) => !!u.payloadJson).map((u) => {
  const time = new Date(u.createdAt);
  return (
    <li key={`${u.entryId}-${u.createdAt}`}>
      {u.payloadJson.name}
      {' '}
      (
      {time.getHours().toString().padStart(2, '0')}
      :
      {time.getMinutes().toString().padStart(2, '0')}
      )
    </li>
  );
});

const hasChanged = (targetValue: boolean, baseValue: boolean) => (targetValue !== baseValue);

export function PickRandomUserPanelComponent(props: PickRandomUserPanelComponentProps) {
  const {
    pluginApi,
    intl,
    pickedUserWithEntryId,
    setShowModal,
    currentUser,
  } = props;
  const allUsersInfo = pluginApi
    .useCustomSubscription<UsersMoreInformationGraphqlResponse>(USERS_MORE_INFORMATION);
  const [includeModerators, setincludeModerators] = useState<boolean>(false);
  const [includePresenter, setincludePresenter] = useState<boolean>(false);
  const [includePickedUsers, setIncludePickedUsers] = useState<boolean>(true);
  const [
    initialPanelInformationAlreadySynced,
    setInitialPanelInformationAlreadySynced,
  ] = useState<boolean>(false);
  const { data: allUsers } = allUsersInfo;
  const {
    data: pickedUserFromDataChannelResponse,
    pushEntry: pushPickedUser,
    deleteEntry: deletePickedUser,
  } = pluginApi.useDataChannel<PickedUser>('pickRandomUser');
  const pickedUserFromDataChannel = {
    data: pickedUserFromDataChannelResponse?.data,
    loading: false,
  };
  const {
    data: panelInformationFromPresenter,
    pushEntry: dispatchPanelInformationFromPresenter,
  } = pluginApi.useDataChannel<PanelInformationFromPresenter>('panelInformationFromPresenter', DataChannelTypes.LATEST_ITEM);

  useEffect(() => {
    const panelInformationList = panelInformationFromPresenter
      .data;
    if (!panelInformationList || panelInformationFromPresenter.loading) {
      if (!initialPanelInformationAlreadySynced) {
        // This timeout is used to handle a special case when the panel is being opened for the
        // first time. In this scenario, there is no prior panel state in the data channel, causing
        // the data to be undefined while the loading state is still true. This creates ambiguity,
        // as it’s difficult to distinguish this situation from when the data channel is still
        // actively fetching data. To resolve this, we use a timeout of 3 seconds to update the
        // state and trigger a forced dispatch to send the current state to the data channel.
        setTimeout(
          () => setInitialPanelInformationAlreadySynced(true),
          DATA_CHANNEL_LOADING_TOLERANCE_TIMEOUT,
        );
      }
      return;
    }
    const panelInformation = panelInformationList
      ? panelInformationList[0]?.payloadJson : null;
    const {
      includeModerators: dChannelIncludeModerators = null,
      includePresenter: dChannelIncludePresenter = null,
      includePickedUsers: dChannelIncludePickedUsers = null,
    } = panelInformation || {};

    if (dChannelIncludeModerators !== null
      && hasChanged(dChannelIncludeModerators, includeModerators)) {
      setincludeModerators(dChannelIncludeModerators);
    }
    if (dChannelIncludePresenter !== null
      && hasChanged(dChannelIncludePresenter, includePresenter)) {
      setincludePresenter(dChannelIncludePresenter);
    }
    if (dChannelIncludePickedUsers !== null
      && hasChanged(dChannelIncludePickedUsers, includePickedUsers)) {
      setIncludePickedUsers(dChannelIncludePickedUsers);
    }
    if (!initialPanelInformationAlreadySynced) setInitialPanelInformationAlreadySynced(true);
  }, [panelInformationFromPresenter]);

  useEffect(() => {
    const panelInformationList = panelInformationFromPresenter
      .data;
    const panelInformation = panelInformationList
      ? panelInformationList[0]?.payloadJson : null;
    const {
      includeModerators: dChannelIncludeModerators = null,
      includePresenter: dChannelIncludePresenter = null,
      includePickedUsers: dChannelIncludePickedUsers = null,
    } = panelInformation || {};

    if (currentUser?.presenter
      && dispatchPanelInformationFromPresenter
      && initialPanelInformationAlreadySynced) {
      if (hasChanged(dChannelIncludeModerators, includeModerators)
        || hasChanged(dChannelIncludePresenter, includePresenter)
        || hasChanged(dChannelIncludePickedUsers, includePickedUsers)) {
        dispatchPanelInformationFromPresenter({
          includeModerators,
          includePresenter,
          includePickedUsers,
        });
      }
    }
  }, [
    dispatchPanelInformationFromPresenter,
    includeModerators,
    includePresenter,
    includePickedUsers,
  ]);

  const usersToBePicked: PickedUser[] = allUsers?.user
    .filter((user) => {
      let roleFilter = true;
      if (!includeModerators) roleFilter = user.role === Role.VIEWER;
      if (!includePickedUsers && pickedUserFromDataChannel.data) {
        return roleFilter && pickedUserFromDataChannel
          .data.findIndex(
            (u) => u?.payloadJson?.userId === user?.userId,
          ) === -1;
      }
      return roleFilter;
    }).filter((user) => {
      if (!includePresenter) return !user.presenter;
      return true;
    });

  const handlePickRandomUser = () => {
    if (usersToBePicked && usersToBePicked.length > 0 && currentUser?.presenter) {
      const randomIndex = Math.floor(Math.random() * usersToBePicked.length);
      const randomlyPickedUser = usersToBePicked[randomIndex];
      pushPickedUser(randomlyPickedUser);
    }
    setShowModal(true);
  };

  const renderButton = (userRole: string) => {
    if (currentUser?.presenter) {
      if (usersToBePicked?.length > 0) {
        return (
          <button
            type="button"
            className="button-style"
            onClick={() => {
              handlePickRandomUser();
            }}
          >
            {
            (pickedUserWithEntryId)
              ? intl.formatMessage(intlMessages.pickRandomUserButtonLabelAgain)
              : intl.formatMessage(intlMessages.pickRandomUserButtonLabelRole, { 0: userRole })
            }
          </button>
        );
      }
      return (
        <p>
          {intl.formatMessage(intlMessages.noUsersAvailableWarning, { 0: userRole })}
        </p>
      );
    }
    return null;
  };

  let userRole: string;
  if (!includeModerators) {
    userRole = (usersToBePicked?.length !== 1)
      ? intl.formatMessage(intlMessages.viewers)
      : intl.formatMessage(intlMessages.viewer);
  } else {
    userRole = (usersToBePicked?.length !== 1)
      ? intl.formatMessage(intlMessages.users)
      : intl.formatMessage(intlMessages.user);
  }
  const hasPermissionToSeePanel = currentUser?.presenter || currentUser?.role === Role.MODERATOR;
  if (!hasPermissionToSeePanel) return null;

  return (
    <div
      style={{
        width: '100%', height: '100%', alignItems: 'flex-start', display: 'flex', flexDirection: 'column',
      }}
    >
      <div className="moderator-view-wrapper">
        <p className="moderator-view-label">{intl.formatMessage(intlMessages.options)}</p>
        <p className="moderator-view-value">
          <label className="check-box-label-container" htmlFor="includeModerators">
            <input
              type="checkbox"
              id="includeModerators"
              disabled={!currentUser?.presenter}
              checked={includeModerators}
              onChange={() => {
                setincludeModerators((value) => !value);
              }}
              name="options"
              value="includeModerators"
            />
            <span className="check-box-label">{intl.formatMessage(intlMessages.includeModerators)}</span>
          </label>
          <label className="check-box-label-container" htmlFor="includePresenter">
            <input
              type="checkbox"
              id="includePresenter"
              disabled={!currentUser?.presenter}
              checked={includePresenter}
              onChange={() => {
                setincludePresenter((value) => !value);
              }}
              name="options"
              value="includePresenter"
            />
            <span className="check-box-label">{intl.formatMessage(intlMessages.includePresenter)}</span>
          </label>
          <label className="check-box-label-container" htmlFor="includePickedUsers">
            <input
              type="checkbox"
              id="includePickedUsers"
              disabled={!currentUser?.presenter}
              checked={includePickedUsers}
              onChange={() => {
                setIncludePickedUsers((value) => !value);
              }}
              name="options"
              value="includePickedUsers"
            />
            <span className="check-box-label">{intl.formatMessage(intlMessages.includePickedUsers)}</span>
          </label>
        </p>
      </div>
      <div className="moderator-view-wrapper">
        <p className="moderator-view-label">{intl.formatMessage(intlMessages.availableForSelection)}</p>
        <p className="moderator-view-value">
          {usersToBePicked?.length}
          {' '}
          {userRole}
          :
          {' '}
          {makeHorizontalListOfNames(usersToBePicked)}
        </p>
      </div>
      <div className="moderator-view-wrapper">
        <div className="moderator-view-wrapper-title">
          <p className="moderator-view-label">{intl.formatMessage(intlMessages.previouslyPicked)}</p>
          {currentUser?.presenter && (
            <button
              type="button"
              className="clickable"
              onClick={() => {
                deletePickedUser([RESET_DATA_CHANNEL]);
              }}
            >
              {intl.formatMessage(intlMessages.clearAll)}
            </button>
          )}
        </div>
        <ul className="moderator-view-list">
          {
            makeVerticalListOfNames(pickedUserFromDataChannel?.data)
          }
        </ul>
      </div>
      {renderButton(userRole)}
    </div>
  );
}
