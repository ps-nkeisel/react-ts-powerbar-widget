/**
 * @file contains HOC that wraps content into expand button
 */
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RootStore } from '~/store';

import Badge from '@vuukle/badge';
import { kFormatter } from '@vuukle/utils';
import articleConfig from '~/config/article.config';
import { isLandscapeOrientation } from '~/utils';
import ExpandButton from './components/ExpandButton';

const CustomBadge = styled((props) => <Badge {...props} />)`
  sup {
    top: 1px;
    right: -18px;
  }
`;

interface IState {
  /**
   * Show children or hide
   * @default false
   */
  sharesToggled: boolean;
  /** Determines if need to wrap layout within ExpandButton */
  showToggleButton: boolean;
}

interface IInjectedProps {
  /** Sum of shares from our state */
  actionsCount: number;
  styles: object;
}

/**
 * @render react
 * @name withExpandButton
 * @description HOC to wrap shares layout with toggle "SHARE" button. Used on mobile.
 */
function withExpandButton(WrappedComponent: React.ComponentType<any>) {
  class WithExpandButton extends React.Component<IInjectedProps, IState> {
    constructor(props: IInjectedProps) {
      super(props);
      const isLandscape = !isLandscapeOrientation();

      this.state = {
        sharesToggled: false,
        showToggleButton:
          articleConfig.mode === 'vertical' &&
          typeof screen === 'object' &&
          ((!isLandscape && screen.width <= 420) || (isLandscape && screen.width <= 736)),
      };
    }

    /**
     * @protected
     * @name toggleShares
     * @description toggle `sharesToggled` value in state
     */
    protected toggleShares = () => this.setState({ sharesToggled: !this.state.sharesToggled });

    /**
     * @protected
     * @name renderExpandButton
     * @description renders ExpandButton component with badge or without
     * @returns {JSX.Element} ExpandButton component wrapped in Badge or not wrapped
     */
    protected renderExpandButton = (): JSX.Element => {
      const { sharesToggled } = this.state;

      const expandBtnProps = {
        onClick: this.toggleShares,
        style: { marginTop: '5px' },
        toggled: this.state.sharesToggled,
      };

      if (sharesToggled) {
        return <ExpandButton {...expandBtnProps} />;
      } else {
        return (
          <CustomBadge count={this.props.actionsCount}>
            <ExpandButton {...expandBtnProps} />
          </CustomBadge>
        );
      }
    };

    public render() {
      const { showToggleButton } = this.state;

      if (showToggleButton) {
        return (
          <div>
            {this.renderExpandButton()}
            {this.state.sharesToggled && <WrappedComponent />}
          </div>
        );
      }

      return <WrappedComponent styles={this.props.styles} />;
    }
  }

  const mapStateToProps = ({ shares, comments, recommendations, global }: RootStore) => ({
    actionsCount: kFormatter(shares.totalShares + comments + recommendations.count),
    styles: global,
  });

  return connect(mapStateToProps)(WithExpandButton);
}

export default withExpandButton;
