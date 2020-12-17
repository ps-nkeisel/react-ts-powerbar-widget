import styled from 'styled-components';
import articleConfig from '~/config/article.config';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
}

const Wrapper = styled.div<IProps>`
  white-space: nowrap;
  margin-right: 5px;
  ${() =>
    articleConfig.mode === 'vertical' &&
    `
    display: flex;
    flex-direction: column;
    > span {
      margin-bottom: 5px;
    }
  `};
`;

export default Wrapper;
