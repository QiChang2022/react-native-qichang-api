import HttpUtils2 from '../HttpUtils2';
import { baseURL } from '../url';
import { objectToQueryStr } from '../utils';

/**
 * 汽场号
 * @param record_type : 1 周榜 2 月榜
 * @param rank_type : 1 综合 2 行业 3 用车
 */
export async function getQichanghaoRankingList(
    record_type: number,
    rank_type: number
) {
    const url =
        baseURL +
        `/user/rank/cat/list` +
        objectToQueryStr({ record_type, rank_type });

    let result = await HttpUtils2.get(url);

    return result.code === 200 ? result.data.list : [];
}

/**
 * 汽场号排名数据
 * @param record_type
 * @param rank_type
 * @param rank_cat_id
 */
export async function getQichanghaoRankingData(
    record_type: number,
    rank_type: number,
    rank_cat_id?: number
): Promise<Array<any>> {
    let params =
        rank_cat_id === undefined
            ? objectToQueryStr({ record_type, rank_type })
            : objectToQueryStr({ record_type, rank_type, rank_cat_id });

    const url = baseURL + `/user/rank/list` + params;

    let result = await HttpUtils2.get(url);

    return result.code === 200 &&
        result.data.list &&
        result.data.list.length >= 3
        ? result.data.list
        : Promise.reject(result);
}

/**
 * 获取汽场号榜单详情
 * @param rank_cat_id
 */
export async function getQichanghaoRankingDetail(rank_cat_id: number) {
    const url =
        baseURL + `/user/rank/detail` + objectToQueryStr({ rank_cat_id });

    let result = await HttpUtils2.get(url);

    return result.code === 200 && result.data
        ? result.data
        : Promise.reject(result);
}

/**
 * 获取发现首页数据
 */
export async function getDiscoverData() {
    const url = baseURL + '/discovery/index';

    const result = await HttpUtils2.get(url);

    return result.code === 200 ? result.data : Promise.reject(result);
}

/**
 * 获取汽场号榜单
 */
export async function getQichanghaoRanking(): Promise<
    Array<{
        title: string;
        summary: string;
        url: string;
        source_id: number;
    }>
> {
    const url = baseURL + '/cp?code=qcv_app_discovery_media';

    const result = await HttpUtils2.get(url);

    return result.code === 200
        ? result.data.entries.map((item: any) => ({
              title: item.title,
              summary: item.dsc,
              url: item.cover,
              source_id: item.source_id,
          }))
        : Promise.reject(result);
}

/**
 *
 * 文章栏目 列表数据
 */
export async function getArticleColumnListData(
    page: number,
    page_size: number,
    articleColumnId: number
): Promise<
    Array<{
        cover: string; //图片
        title: string; //文章标题
        id: number; //
        amount: {
            comment: number;
            browse: number;
        };
    }>
> {
    const url =
        baseURL +
        '/discovery/column' +
        objectToQueryStr({
            id: articleColumnId,
            page,
            page_size,
            code: 'qcv_app_discovery_news_cat',
        });

    const result = await HttpUtils2.get(url);

    return result.code === 200
        ? result.data.entry.data
        : Promise.reject(result);
}

/**
 * 文章栏目 详情
 * @param articleColumnId
 */
export async function getArticleColumnDetail(
    articleColumnId: number
): Promise<{
    face: string; //头像
    summary: string; //简介
    name: string; //用户名
}> {
    const url =
        baseURL +
        '/discovery/column' +
        objectToQueryStr({
            id: articleColumnId,
            page: 1,
            page_size: 1,
            code: 'qcv_app_discovery_news_cat',
        });

    const result = await HttpUtils2.get(url);

    return result.code === 200
        ? result.data.entry.user || {}
        : Promise.reject(result);
}

/**
 * 视频栏目 详情
 * @param articleColumnId
 */
export async function getVideoColumnDetail(
    videoColumnId: number
): Promise<{
    face: string; //头像
    summary: string; //简介
    name: string; //用户名
}> {
    const url =
        baseURL +
        '/discovery/column' +
        objectToQueryStr({
            id: videoColumnId,
            page: 1,
            page_size: 1,
            code: 'qcv_app_discovery_video_cat',
        });

    const result = await HttpUtils2.get(url);

    return result.code === 200
        ? result.data.entry.user || {}
        : Promise.reject(result);
}

/**
 * 视频栏目 列表数据
 */
export async function getVideoColumnListData(
    page: number,
    page_size: number,
    videoColumnId: number
): Promise<
    Array<{
        cover: string; //图片
        title: string; //文章标题
        id: number; //
        duration: string; //视频时长
        amount: {
            comment: number;
            browse: number;
        };
    }>
> {
    const url =
        baseURL +
        '/discovery/column' +
        objectToQueryStr({
            id: videoColumnId,
            page,
            page_size,
            code: 'qcv_app_discovery_video_cat',
        });

    const result = await HttpUtils2.get(url);

    return result.code === 200
        ? result.data.entry.data
        : Promise.reject(result);
}
