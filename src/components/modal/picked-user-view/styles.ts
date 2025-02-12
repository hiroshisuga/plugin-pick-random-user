import styled from 'styled-components';
import { colorUserModerator, colorUserViewer, colorUserYou } from '../../../styles/pallete';

const AvatarContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ModalAvatar = styled.div<{isYou: boolean, viewer: boolean, moderator: boolean}>`
  height: 6rem;
  width: 6rem;
  ${({ moderator }) => moderator && `
    border-radius: 6px;
  `}

  ${({ moderator }) => !moderator && `
    border-radius: 50%;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.75rem;
  font-weight: 400;
  margin-top: 0.5rem;
  margin-bottom: .25rem;
  text-transform: capitalize;
  ${({ viewer }) => viewer && `background-color: ${colorUserViewer};`}
  ${({ moderator }) => moderator && `background-color: ${colorUserModerator};`}
  ${({ isYou }) => isYou && `background-color: ${colorUserYou};`}
`;

const UserName = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

const Title = styled.h1`
 font-weight: 600;
  font-size: 20px;
`;

export default {
  AvatarContainer,
  ModalAvatar,
  UserName,
  Title,
};
