import styled, { css } from 'styled-components';

const COLOR_PALETTE = {
  bittersweet: '#f05d5eff',
  caribbeanCurrent: '#0f7173ff',
  antiflashWhite: '#e7ecefff',
  raisinBlack: '#272932ff',
  buff: '#d8a47fff',
};

const BORDER_RADIUS = '4px';
const MAX_RESULTS_POPOVER_HEIGHT = 500;

export const SROnly = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  background-color: ${COLOR_PALETTE.antiflashWhite};
  border: 1px solid ${COLOR_PALETTE.raisinBlack};
  border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
  padding: 10px 16px 10px 8px;

  &:focus {
    border-color: ${COLOR_PALETTE.caribbeanCurrent};
  }
  &:active {
    border-color: ${COLOR_PALETTE.buff};
  }
  &:hover {
    border-color: ${COLOR_PALETTE.buff};
  }
`;

export const OpenButton = styled.button`
  background-color: ${COLOR_PALETTE.caribbeanCurrent};
  border: 1px solid ${COLOR_PALETTE.raisinBlack};
  border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
  padding: 8px;

  &:hover {
    border-color: ${COLOR_PALETTE.buff};
  }
  &:active {
    background-color: ${COLOR_PALETTE.bittersweet};
  }
`;

export const ComboBoxWrapper = styled.div`
  position: relative;
`;

export const Listbox = styled.ul<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    css`
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: ${COLOR_PALETTE.antiflashWhite};
      border: 1px solid ${COLOR_PALETTE.raisinBlack};
      border-radius: 0 0 ${BORDER_RADIUS} ${BORDER_RADIUS};
      display: ${isOpen ? 'block' : 'none'};
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      width: 100%;
      max-height: ${MAX_RESULTS_POPOVER_HEIGHT}px;
      overflow-y: scroll;
    `}
`;

export const ListboxOption = styled.li`
  cursor: pointer;
  padding: 8px 16px;

  &[aria-selected='true'] {
    background-color: ${COLOR_PALETTE.buff};
  }
  &: hover {
    background-color: ${COLOR_PALETTE.buff};
  }
`;
