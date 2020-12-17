import * as React from 'react';
import styled from 'styled-components';
import TranslationContext from '~/contexts/TranslationContext';

interface IProps {
  /**
   * If false will display 'Share' text and if true will display close icon
   */
  toggled: boolean;
  /** on click event */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

  className?: string;
}

/**
 * @render react
 * @name ExpandButton
 * @description This button is used as switcher which will show more or hide social icons
 */
const ExpandButton: React.FC<IProps> = ({ toggled, ...props }) => (
  <TranslationContext.Consumer>
    {({ share }) => <button {...props}>{toggled ? <span>X</span> : <span>{share}</span>}</button>}
  </TranslationContext.Consumer>
);

/** ExpandButton styles */
const StyledExpandButton = styled(ExpandButton)<IProps>`
  padding: 0;
  border: none;
  display: inline-block;
  background-color: #424444;
  color: #fff;
  max-width: 50px;
  max-height: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.2s;
  ${(props) =>
    props.toggled &&
    `max-width: 35px;
    max-height: 35px;
    width: 35px;
    height: 35px;`};
  span {
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export default StyledExpandButton;
