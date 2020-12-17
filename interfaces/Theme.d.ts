declare interface Theme {
  primaryColor: string;
  errorColor: string;
  fontFamily: string;
  mutedColor: string;
  textColor: string;
  isDark: boolean;
  isArabic: boolean;
  isMobile: boolean;
  // Buttons
  buttons: {
    [key in 'primary' | 'link' | 'subtle']: {
      color: string;
      background: string;
      hoverBackground: string;
      hoverColor: string;
      active: string;
    }
  };
  // Alerts
  alerts: {
    [key in 'success' | 'info' | 'warning' | 'error']: {
      color: string;
      background: string;
    }
  };
  // Tags
  tags: { [key in 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info']: string };
  // Inputs
  input: {
    background: string;
    color: string;
    border: string;
    active: {
      border: string;
    };
  };
}
