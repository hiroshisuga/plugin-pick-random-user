import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BbbPluginSdk, GenericContentSidekickArea, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import {
  PickRandomUserPluginProps,
  PickedUser,
  PickedUserWithEntryId,
} from './types';
import { PickUserModal } from '../modal/component';
import { Role } from './enums';
import { PickRandomUserPanelComponent } from '../pick-random-user-panel/component';

const NAVIGATION_SIDEBAR_BUTTON_ICON = 'random';

function PickRandomUserPlugin({ pluginUuid: uuid }: PickRandomUserPluginProps) {
  BbbPluginSdk.initialize(uuid);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [
    pickedUserWithEntryId,
    setPickedUserWithEntryId] = useState<PickedUserWithEntryId | undefined>();
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const currentUserInfo = pluginApi.useCurrentUser();
  const { data: currentUser } = currentUserInfo;

  const {
    data: pickedUserFromDataChannelResponse,
    replaceEntry: updatePickedRandomUser,
  } = pluginApi.useDataChannel<PickedUser>('pickRandomUser');

  const pickedUserFromDataChannel = {
    data: pickedUserFromDataChannelResponse?.data,
    loading: false,
  };
  const genericContentId = useRef<string | undefined>('');

  useEffect(() => {
    if (pickedUserFromDataChannel.data
      && pickedUserFromDataChannel.data?.length > 0) {
      const pickedUserToUpdate = pickedUserFromDataChannel
        .data[0];
      if (pickedUserToUpdate?.entryId !== pickedUserWithEntryId?.entryId) {
        setPickedUserWithEntryId({
          pickedUser: pickedUserToUpdate?.payloadJson,
          entryId: pickedUserToUpdate.entryId,
        });
      }
      if (pickedUserToUpdate?.payloadJson && pickedUserToUpdate?.payloadJson.isPresenterViewing) {
        setShowModal(true);
      }
    } else if (pickedUserFromDataChannel.data
        && pickedUserFromDataChannel.data?.length === 0) {
      setPickedUserWithEntryId(null);
      if (currentUser && !currentUser.presenter) setShowModal(false);
    }
  }, [pickedUserFromDataChannelResponse]);

  useEffect(() => {
    if (!pickedUserWithEntryId && !currentUser?.presenter) setShowModal(false);
  }, [pickedUserWithEntryId]);

  const genericContentSidekickArea = {
    contentFunction: (element: HTMLElement) => {
      const root = ReactDOM.createRoot(element);
      root.render(
        <React.StrictMode>
          <PickRandomUserPanelComponent
            pluginApi={pluginApi}
            currentUser={currentUser}
            setShowModal={setShowModal}
            pickedUserWithEntryId={pickedUserWithEntryId}
          />
        </React.StrictMode>,
      );
      return root;
    },
    name: 'Pick Random User',
    section: '',
    open: false,
    buttonIcon: NAVIGATION_SIDEBAR_BUTTON_ICON,
    ...(genericContentId.current && { id: genericContentId.current }),
  };

  useEffect(() => {
    if (currentUser?.role !== Role.VIEWER) {
      const generatedIds = pluginApi.setGenericContentItems([
        new GenericContentSidekickArea(genericContentSidekickArea),
      ]);
      genericContentId.current = generatedIds.pop();
    }
  }, [
    genericContentSidekickArea.name,
    genericContentSidekickArea.section,
    genericContentSidekickArea.buttonIcon,
    setShowModal,
    currentUser,
  ]);
  if (!pickedUserWithEntryId) return null;
  return (
    <PickUserModal
      {...{
        showModal,
        handleCloseModal: () => { setShowModal(false); },
        pickedUserWithEntryId,
        currentUser,
        updatePickedRandomUser,
      }}
    />
  );
}

export default PickRandomUserPlugin;
