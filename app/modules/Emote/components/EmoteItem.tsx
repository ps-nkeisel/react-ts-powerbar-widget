import Badge from '@vuukle/badge';
import EmoteImage, { emoteNum, IEmotes } from '@vuukle/emote-image';
import * as React from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  /** Emote number (we get image/name by indexed key not name) */
  keyName: emoteNum;
  /** Percent of votes */
  percentage: number;
  /** Click handler */
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Custom EmoteImage config */
  customConfig: IEmotes;
  displayMode: 'horizontal' | 'vertical';

  className?: string;
  style?: any;
}

const Wrapper = styled(({ displayName, ...props }) => <Badge {...props} />)<{
  displayMode: IProps['displayMode'];
}>`
  sup {
    font-size: 10px;
    line-height: 16px;
    height: 18px;
  }
  a {
    &:focus {
      box-shadow: none;
    }
  }
  ${/** We need some space between amote and moved badge to prevent overflowing in horizontal mode */
  (props) =>
    props.displayMode === 'horizontal' &&
    css`
      margin-right: 5px;
      sup {
        transform: translateX(-70%);
      }
    `};
`;

const EmoteItem: React.FC<IProps> = ({ percentage, keyName, onClick, customConfig, ...props }) => {
  // Use percentage only if value is positive, otherwise just send 0 so badge will not be displayed, as we don't show 0s
  const votesPercentage = percentage > 0 ? `${percentage}%` : 0;

  return (
    <Wrapper count={votesPercentage} showZero={false} {...props}>
      <a href="#no" onClick={onClick}>
        <EmoteImage emoteKey={keyName || 1} size="32px" customConfig={customConfig} />
      </a>
    </Wrapper>
  );
};

export default EmoteItem;
