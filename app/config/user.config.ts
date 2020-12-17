/**
 * @file contains user/browser configuration detection
 */
import { detectDevice, isMobile } from '@vuukle/utils';

export default {
  device: detectDevice(),
  isMobile: isMobile(),
};
