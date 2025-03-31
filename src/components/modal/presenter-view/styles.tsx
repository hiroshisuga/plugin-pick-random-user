import styled from 'styled-components';

const PresenterViewContentWrapper = styled.div`
  width: '100%';
  height: '100%';
  align-items: 'flex-start';
  display: 'flex';
  flex-direction: 'column';
`;

const PresenterViewSectionWrapper = styled.div`
  align-items: flex-start;
  margin-top: 20px;
`;

const PresenterViewSectionTitle = styled.div`
  margin: 5px 0px;
  font-weight: 600;
  font-size: 20px;
`;

const PresenterViewSectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PresenterViewSectionList = styled.ul`
  font-size: 18px;
  list-style-type: none;
`;

const PresenterViewSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  padding-left: 40px;
`;

// Section Content related:

const CheckboxLabelWrapper = styled.label`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.span`
  margin-left: 5px;
`;

const PickUserButton = styled.button`
  border: 3px solid transparent;
  overflow: visible;
  display: inline-block;
  background-color: #0F70D7;
  color: #FFF;
  border-radius: 2px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  padding: 8px 15px;
  &:hover {
    background-color: #0C57A7;
  }
`;

export {
  PresenterViewContentWrapper,
  PresenterViewSectionWrapper,
  PresenterViewSectionTitle,
  PresenterViewSectionTitleWrapper,
  PresenterViewSectionList,
  PresenterViewSectionContent,
  CheckboxLabelWrapper,
  CheckboxLabel,
  PickUserButton,
};
