import * as React from 'react';
import ShareItem from './ShareItem';

interface IProps {
  items: Array<{ name: SocialName; count: number }>;
  onClick: (socialName: SocialName) => void;
}

const ShareItemsList: React.FC<IProps> = ({ items, onClick }) => (
  <>
    {items.map(({ name, count }) => (
      <ShareItem count={count} name={name} className="shares-badge" onClick={onClick} key={name} />
    ))}
  </>
);

export default ShareItemsList;
