/**
 * @file contains needed API requests for that widget
 */
import { makeRequest } from '@vuukle/utils';
import articleConfig from '~/config/article.config';
import { getToken } from './session';

/**
 * Recommend Article API
 * @see {@link https://api.vuukle.com/swagger/}
 */
export const recommendAPI = (recommend: boolean) =>
  makeRequest(
    recommend ? 'POST' : 'DELETE',
    `${process.env.API_URL}/api/v1/recommend_ratings/ratings`,
    {
      apiKey: articleConfig.apiKey,
      articleAvatar: articleConfig.img,
      articleId: articleConfig.id,
      host: articleConfig.host,
      tag: articleConfig.tags,
      title: articleConfig.title,
      uri: articleConfig.url,
    },
    'application/json',
    getToken(),
    true
  );
