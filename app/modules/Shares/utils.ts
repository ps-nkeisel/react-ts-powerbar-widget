import articleConfig from '~/config/article.config';
import Communication from '~/services/Communication';
import store from '~/store';

import { isMobile } from '@vuukle/utils';

/**
 * Open social share modal
 *
 * @param {string} social - type of social media
 * @param {string} modifiedUrl - If an interceptor is used, the article url included in share can be changed
 * @param {string} modifiedTitle - If an interceptor is used, the article title included in share can be changed
 * @returns modal window with social share url
 */
export function openShareWindow(social: SocialName, modifiedUrl?: string, modifiedTitle?: string) {
  const openShare = (url: string) =>
    window.open(
      url,
      '' /* name is not provided because of IE9 support */,
      'status = 1, height = 500, width = 420, resizable = 0, top=200, left=400, screenX=400, screenY=200'
    );

  const articleTitle = encodeURIComponent(modifiedTitle || articleConfig.title || '');
  const articleUrl = encodeURIComponent(modifiedUrl || articleConfig.url || '');
  const articleImg = encodeURIComponent(articleConfig.img || '');
  const {
    shares: { customLinks },
  } = store.getState();

  // encodeURIComponent doesn't work well with links that don't specify the protocol (http or https)
  // %2F%2F is the encoded form of '//'
  const useRawUrl = articleUrl.startsWith('%2F%2F');
  // In case it does start with 2 slashes we ignore them for sharing purpose
  const finalArticleUrl: string = useRawUrl ? articleUrl.substring(6) : articleUrl;
  // Twitter doesn't auto-insert the share link if the protocol is not provided so we'll assume it's on https
  const twitterUrl: string = useRawUrl ? `https://${articleUrl.substring(6)}` : articleUrl;

  switch (social.toLowerCase()) {
    case 'twitter':
      return openShare(
        (customLinks && customLinks.twitter) || `https://twitter.com/share?url=${twitterUrl}&text=${articleTitle}`
      );
    case 'facebook':
      return openShare(
        (customLinks && customLinks.facebook) ||
          `https://www.facebook.com/sharer/sharer.php?u=${finalArticleUrl}`
      );
    case 'linkedin':
      return openShare(
        (customLinks && customLinks.linkedin) ||
          `https://www.linkedin.com/shareArticle?mini=true&url=${finalArticleUrl}&title=${articleTitle}&summary=&source=`
      );
    case 'email':
      return Communication.sendOpenLink(`mailto:?subject=${articleTitle}&body=${articleTitle} - ${finalArticleUrl}`);
    case 'whatsapp':
      if (isMobile()) {
        return Communication.sendOpenLink(
          (customLinks && customLinks.whatsapp) || `whatsapp://send?text=${articleTitle} - ${finalArticleUrl}`
        );
      } else {
        return openShare(
          (customLinks && customLinks.whatsapp) || `https://web.whatsapp.com/send?text=${articleTitle} - ${finalArticleUrl}`
        );
      }
    case 'messenger':
      return Communication.sendOpenLink(
        (customLinks && customLinks.messenger) || `fb-messenger://share/?link=${finalArticleUrl}`
      );
    case 'reddit':
      return openShare((customLinks && customLinks.reddit) || `//www.reddit.com/submit?url=${finalArticleUrl}`);
    case 'pinterest':
      return openShare(
        (customLinks && customLinks.pinterest) ||
          `https://pinterest.com/pin/create/button/?url=${finalArticleUrl}&media=${articleImg}&description=${articleTitle}`
      );
    case 'flipboard':
      return openShare(
        (customLinks && customLinks.flipboard) ||
          `https://share.flipboard.com/bookmarklet/popout?v=2&title=${articleTitle}&url=${finalArticleUrl}`
      );
    case 'telegram':
      return openShare(
        (customLinks && customLinks.telegram) || `https://telegram.me/share/url?url=${finalArticleUrl}&text=${articleTitle}`
      );
    default:
      return false;
  }
}
