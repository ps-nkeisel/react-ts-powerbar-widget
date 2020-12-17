import { openShareWindow } from '../utils';
import Communication from '~/services/Communication';

import { isMobile } from '@vuukle/utils';

beforeEach(() => (window.open = jest.fn()));

it('openShareWindow opens for twitter', () => {
  openShareWindow('twitter');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

it('openShareWindow opens for facebook', () => {
  openShareWindow('facebook');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

it('openShareWindow opens for linkedin', () => {
  openShareWindow('linkedin');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

it(`openShareWindow doesn't open for email`, () => {
  // TODO: check if `mailto:` was called.
  openShareWindow('email');
  expect(window.open).not.toHaveBeenCalled();
});

it(`openShareWindow opens either the window or the calls the protocol for whatsapp`, () => {
  Communication.sendOpenLink = jest.fn();
  openShareWindow('whatsapp');

  // Only open window if share is on PC.
  if(isMobile()) {
    expect(window.open).not.toHaveBeenCalled();
    expect(Communication.sendOpenLink).toHaveBeenCalled();
  } else {
    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
  }

});

it(`openShareWindow doesn't open for messenger`, () => {
  // Messenger shouldn't call `window.open` as it's a different protocol.
  // Calls to `fb-messenger://...`.
  Communication.sendOpenLink = jest.fn();
  openShareWindow('messenger');
  expect(window.open).not.toHaveBeenCalled();
  expect(Communication.sendOpenLink).toHaveBeenCalled();
});

it('openShareWindow opens for reddit', () => {
  openShareWindow('reddit');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

it('openShareWindow opens for pinterest', () => {
  openShareWindow('pinterest');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

it('openShareWindow opens for flipboard', () => {
  openShareWindow('flipboard');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

it('openShareWindow opens for telegram', () => {
  openShareWindow('telegram');
  expect(window.open).toHaveBeenCalled();
  expect(window.open).toHaveBeenCalledWith(...(window.open as jest.Mock).mock.calls[0]);
});

// TODO: check for default case (none of the valid social media tags).
