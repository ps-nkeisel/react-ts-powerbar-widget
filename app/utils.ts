/**
 * Detect if orientation of the screen is 'landscape'
 * want to use window.matchMedia? 🤔 Seems it's not working within iframe
 */
export const isLandscapeOrientation = () =>
  window.orientation === 90 || window.orientation === -90 || screen.height < screen.width;
