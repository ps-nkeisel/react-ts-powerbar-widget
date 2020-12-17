/**
 * @file Widget configuration received from the URL's query string
 */
import urlSearchParams from '~/services/urlSearchParams';

// ⚠️ NOTE: 'Article' word used later means article under which widget is loaded.
export interface IArticleConfig {
  // 🔽 MAIN Configuration 🔽

  /** [REQUIRED] Unique article ID */
  id: string | null;
  /** [REQUIRED] Site domain where Article exists */
  host: string | null;
  /** [REQUIRED] Article URL */
  url: string | null;
  /** [REQUIRED] Domain/Site/Account API key */
  apiKey: string | null;
  /** [REQUIRED] Article Title */
  title: string | null;
  /** Article Image */
  img: string | null;
  /** Article Tags */
  tags: string | null;

  // 🔽 SECONDARY Configuration 🔽
  /** Powerbar display mode */
  mode: 'vertical' | 'horizontal';

  /**
   * With this property it's possible to change order in which elements appear or to disable items.
   * We display only elements that appear in this array if configured, items that are not there are hidden/not rendered.
   *
   * @default [] - display all in default order
   */
  shareItems: SocialName[];

  theme: {
    /** Determines if widget is loaded on dark theme */
    darkMode: boolean;
    /** Primary widget color */
    color: string | null;
    /** Custom font-family */
    font: string | null;
  };

  // 🔽 EMOTES Configuration 🔽

  /** Custom emote names */
  names: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  };
  /** Custom Emotes images */
  images: {
    1: string | null;
    2: string | null;
    3: string | null;
    4: string | null;
    5: string | null;
    6: string | null;
  };
  /** Default emote to show if votes is 0% under emotes */
  defaultEmote: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Standalone modes
   * 0 - widget is on page with comments and emotes widget
   * 1 - when powerbar is alone on page (without comments widget and emotes widget)
   * 2 - when powerbar is without comments widget (we need to hide comments button then)
   * 3 - when powerbar is without emotes widget (we need to hide emote button then)
   */
  standalone: number;
  // Allow publishers to intercept share method events to modify url and title
  enableInterceptor: boolean;
}

/**
 * Helper to detect enabled social sharing items (based on passed items in URL)
 * If passed items in URL is empty then we show whole list by default
 *
 * @return {Array} array of enabled social items.
 */
function getShareItemsFromUrl(): SocialName[] {
  const defaultShareItems: SocialName[] = [
    'facebook',
    'twitter',
    'whatsapp',
    'telegram',
    'linkedin',
    'reddit',
    'messenger',
    'pinterest',
    'flipboard',
    'email',
  ];

  const passedShareItems = (urlSearchParams.get('items') || '') // get URL param or make empty string if it's missing
    .split(',') // make array from the string
    .filter((shareName: SocialName) => defaultShareItems.indexOf(shareName) !== -1); // filter array so only allowed options appear

  // Return passed share items through URL if any, otherwise return default set of share items
  return passedShareItems.length > 0 ? (passedShareItems as SocialName[]) : defaultShareItems;
}

const config: IArticleConfig = {
  apiKey: urlSearchParams.get('apiKey'),
  host: urlSearchParams.get('host'),
  id: urlSearchParams.get('articleId'),
  img: urlSearchParams.get('img'),
  tags: urlSearchParams.get('tags'),
  title: urlSearchParams.get('title'),
  url: urlSearchParams.get('url'),

  mode: urlSearchParams.get('mode') === 'vertical' ? 'vertical' : 'horizontal',
  shareItems: getShareItemsFromUrl(),
  theme: {
    color: urlSearchParams.get('color'),
    darkMode: urlSearchParams.get('darkMode') === 'true',
    font: urlSearchParams.get('font'),
  },

  defaultEmote: (() => {
    const defaultEmoteVal = urlSearchParams.get('defaultEmote')
      ? parseInt(urlSearchParams.get('defaultEmote') as string, 10)
      : 1;
    if (defaultEmoteVal > 0 && defaultEmoteVal < 7) {
      return defaultEmoteVal as 1 | 2 | 3 | 4 | 5 | 6;
    }
    return 1;
  })(),
  images: {
    1: urlSearchParams.get('firstImg'),
    2: urlSearchParams.get('secondImg'),
    3: urlSearchParams.get('thirdImg'),
    4: urlSearchParams.get('fourthImg'),
    5: urlSearchParams.get('fifthImg'),
    6: urlSearchParams.get('sixthImg'),
  },
  names: {
    1: urlSearchParams.get('first') || 'Happy',
    2: urlSearchParams.get('second') || 'Unmoved',
    3: urlSearchParams.get('third') || 'Amused',
    4: urlSearchParams.get('fourth') || 'Excited',
    5: urlSearchParams.get('fifth') || 'Angry',
    6: urlSearchParams.get('sixth') || 'Sad',
  },
  standalone: parseInt(urlSearchParams.get('standalone') || '0', 0) || 0,
  enableInterceptor: urlSearchParams.get('enableInterceptor') === 'true',
};

export default config;
