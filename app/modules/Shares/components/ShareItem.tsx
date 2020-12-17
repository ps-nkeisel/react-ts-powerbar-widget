import Badge from '@vuukle/badge';
import SocialButton from '@vuukle/social-button';
import { kFormatter } from '@vuukle/utils';
import * as React from 'react';

interface IProps {
  /** Social Network Name */
  name: SocialName;
  /** Number of Shares */
  count: number;
  onClick: (name: SocialName) => void;
  className?: string;
}

const ShareItem: React.FC<IProps> = ({ name, count, onClick, ...props }) => {
  return (
    <Badge count={kFormatter(count)} showZero={false} {...props}>
      <SocialButton type={name} onClick={() => onClick(name)} />
    </Badge>
  );
};

export default ShareItem;
