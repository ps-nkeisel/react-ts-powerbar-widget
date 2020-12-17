import styled, { css, keyframes } from 'styled-components';
import articleConfig from '~/config/article.config';
import userConfig from '~/config/user.config';

/** We need different styles logic for pc because messenger and whatsapp item is hidden there */
const shareItemsPC = articleConfig.shareItems.filter((shareItem) => !shareItem.match(/messenger/));

/**
 * ▶️ Horizontal widget styles
 */
export const baseHorizontalStyles = css`
  flex-direction: row;
  align-items: center;
  > .shares-badge,
  .more-btn {
    margin-right: 5px;
  }

  > .shares-badge:nth-of-type(n + 3) {
    display: none;
  }

  ${(userConfig.isMobile && articleConfig.shareItems.length <= 2) || (!userConfig.isMobile && shareItemsPC.length <= 2)
    ? `.more-btn { display: none; }`
    : null};

  @media (min-width: 300px) {
    > .shares-badge:nth-of-type(3) {
      display: block;
    }

    ${(userConfig.isMobile && articleConfig.shareItems.length <= 4) ||
    (!userConfig.isMobile && shareItemsPC.length <= 4)
      ? `.more-btn { display: none; }`
      : null};
  }

  @media (min-width: 390px) {
    > .shares-badge:nth-of-type(4) {
      display: block;
    }

    ${(userConfig.isMobile && articleConfig.shareItems.length <= 4) ||
    (!userConfig.isMobile && shareItemsPC.length <= 4)
      ? `.more-btn { display: none; }`
      : null};
  }

  @media (min-width: 430px) {
    > .shares-badge:nth-of-type(5) {
      display: block;
    }

    ${(userConfig.isMobile && articleConfig.shareItems.length <= 5) ||
    (!userConfig.isMobile && shareItemsPC.length <= 5)
      ? `.more-btn { display: none; }`
      : null};
  }

  @media (min-width: 515px) {
    > .shares-badge:nth-of-type(n + 3) {
      display: block;
    }

    .more-btn {
      display: none;
    }
  }
`;

export const openedHorizontalStyles = css`
  > .shares-badge {
    display: block !important;
  }
`;

/**
 * 🔽 Vertical widget styles
 */
export const baseVerticalStyles = css`
  flex-direction: column;
  align-items: flex-start;
  > .shares-badge:nth-of-type(n + 4) {
    display: none;
  }
`;

export const openedVerticalStyles = css`
  > .shares-badge:nth-of-type(n + 3) {
    display: block;
  }
  > .shares-badge:nth-of-type(-n + 3) {
    display: none;
  }
`;

/**
 * We need to limit count of share button in landscape mode for mobile
 * devices to prevent overflowing outside of screen.
 * ❔ For example: publisher attached our vertical iframe with fixed position
 * user is checking site in landscape mode from iPhone and if we will show all social icons
 * iframe height will be bigger than height of screen and user will not can to scroll to see more icons
 * because iframe is fixed.
 */
export const verticalLandscapeStyles = css`
  .shares-badge:nth-of-type(n + 3) {
    display: none;
  }
  .more-btn {
    display: none;
  }
`;

const buttonAnimation = keyframes`
  50% {
    transform: scale(1.05);
  }
`;

interface IProps {
  /* Show more/less icons */
  toggled: boolean;

  className?: string;
  style?: React.CSSProperties;
}

const Wrapper = styled.div<IProps>`
  display: flex;
  flex-wrap: wrap;

  .shares-badge,
  > button {
    margin-bottom: 5px;
    svg {
      animation: ${buttonAnimation} 0.25s;
    }
  }

  .shares-badge sup {
    font-size: 10px;
    line-height: 16px;
    height: 18px;
  }

  ${() => (articleConfig.mode === 'vertical' ? baseVerticalStyles : baseHorizontalStyles)};

  ${(props) => {
    if (props.toggled) {
      return articleConfig.mode === 'vertical' ? openedVerticalStyles : openedHorizontalStyles;
    }
    return null;
  }};

  @media (max-width: 736px) and (orientation: landscape) {
    ${articleConfig.mode === 'vertical' && verticalLandscapeStyles};
  }
`;

export default Wrapper;
