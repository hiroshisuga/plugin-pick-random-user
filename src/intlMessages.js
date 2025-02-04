import { defineMessages } from 'react-intl';

export const intlMessages = defineMessages({
  title: {
    id: 'app.pickRandomUser.title',
    description: 'Title for pick random user panel',
  },
  options: {
    id: 'app.pickRandomUser.options',
    description: 'Subtitle for panel options',
  },
  includeModerators: {
    id: 'app.pickRandomUser.includeModerators',
    description: 'Option to include moderators in the random user pick',
  },
  includePresenter: {
    id: 'app.pickRandomUser.includePresenter',
    description: 'Option to include the presenter in the random user pick',
  },
  includePickedUsers: {
    id: 'app.pickRandomUser.includePickedUsers',
    description: 'Option to include previously picked users in the selection',
  },
  availableForSelection: {
    id: 'app.pickRandomUser.availableForSelection',
    description: 'Label indicating how many users are available for selection',
  },
  previouslyPicked: {
    id: 'app.pickRandomUser.previouslyPicked',
    description: 'Label for previously picked users',
  },
  clearAll: {
    id: 'app.pickRandomUser.clearAll',
    description: 'Button label to clear all selected users',
  },
  noUsersAvailableWarning: {
    id: 'app.pickRandomUser.noUsersAvailableWarning',
    description: 'Warning message when no users are available for selection',
  },
  pickRandomUserButtonLabelAgain: {
    id: 'app.pickRandomUser.pickRandomUserButtonLabelAgain',
    description: 'Button label to pick a random user again',
  },
  pickRandomUserButtonLabelRole: {
    id: 'app.pickRandomUser.pickRandomUserButtonLabelRole',
    description: 'Button label to pick a random user by their role',
  },
  viewer: {
    id: 'app.pickRandomUser.viewer',
    description: 'Singular term for a viewer in the panel',
  },
  viewers: {
    id: 'app.pickRandomUser.viewers',
    description: 'Plural term for viewers in the panel',
  },
  user: {
    id: 'app.pickRandomUser.user',
    description: 'Singular term for a user in the panel',
  },
  users: {
    id: 'app.pickRandomUser.users',
    description: 'Plural term for users in the panel',
  },
  youWerePicked: {
    id: 'app.pickRandomUser.youWerePicked',
    description: 'Message indicating you have been randomly picked',
  },
  pickedUser: {
    id: 'app.pickRandomUser.pickedUser',
    description: 'Message indicating the user who has been randomly picked',
  },
  closeButton: {
    id: 'app.pickRandomUser.modal.closeButton',
    description: 'Label for the colse button in the picked user modal',
  },
});
