import * as HttpUtils from '../HttpUtils';
import { baseURL, baseSearchURL } from '../url';
import { objectToQueryStr } from '../utils';
import {
    ComplexType,
    LiveDetail,
    ArticleDetail,
    VideoDetail,
    Video,
} from './types';
import { Source_Cat } from '../types';

export type ComplexType1 = ComplexType;

/**
 * 获取正在直播的列表
 */
export async function getLivingList(): Promise<
    Array<{
        title: string;
        id: number;
        cover: string;
    }>
> {
    const url = baseURL + '/live/process/list';
    const result = await HttpUtils.get(url);
    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 获取栏目
 */
export async function getColumnListData(): Promise<Array<any>> {
    const url = baseURL + '/cp?code=app_news_index_menu';
    const result = await HttpUtils.get(url);
    return result.code === 200 ? result.data.entries : Promise.reject(result);
}

/**
 * 获取视频列表
 * @param page : 1 开始
 * @param page_size
 */
export async function getVideoList(
    page: number,
    page_size: number
): Promise<Array<Video>> {
    const url = baseURL + '/video/list' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : Promise.reject(result);
}

/**
 * 获取新闻列表
 * @param page
 * @param page_size
 * @param newsUrl : url,
 */
export async function getNewsList(
    page: number,
    page_size: number,
    newsUrl: string
): Promise<Array<any>> {
    const url = baseURL + newsUrl + `&page=${page}&page_size=${page_size}`;

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : Promise.reject(result);
}

// /**
//  * 获取首页推荐栏目列表
//  * @param page
//  * @param page_size
//  */
export async function getHomeRecommendList(
    page: number,
    page_size: number,
    newsUrl: string
): Promise<Array<ComplexType>> {
    const url = baseURL + newsUrl + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : Promise.reject(result);
}

/**
 * 获取轮播列表 (推荐栏目里面使用)
 */
export async function getCarouselListData() {
    const url = baseURL + '/cp?code=app_news_index_slide';

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : [];
}

/**
 * 获取首页精选栏目列表
 * @param page
 * @param page_size
 */
export async function getHomeSelectionList(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL +
        '/discovery/recommend' +
        objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 获取汽场号轮播列表 (汽场号栏目里面使用)
 */
export async function getQichanghaoCarouselListData() {
    const url = baseURL + '/cp?code=app_name_qichang_index_slide';

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : [];
}

/**
 * 获取汽场号列表
 * @param page
 * @param page_size
 */
export async function getQichanghaoList(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url = baseURL + '/media/list' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : Promise.reject(result);
}

/**
 * 获取汽场号列表
 * @param page
 * @param page_size
 */
export async function getQichanghaoList2(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL +
        '/media/recommend/list' +
        objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 *
 * 获取直播列表  status  -1删除 0编辑中 1未开始 2进行中 3结束
 * @param page
 * @param page_size
 */
export async function getLiveList(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url = baseURL + '/live/list' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : Promise.reject(result);
}

/**
 * 获取新闻详情
 * @param id 新闻id
 */
export async function getNewsDetailById(id: number): Promise<ArticleDetail> {
    const url = baseURL + '/news?id=' + id;
    const result = await HttpUtils.get(url);
    return result.code === 200 && result.data != null
        ? result.data
        : Promise.reject(result);
}

/**
 * 获取视频详情
 * @param id 视频id
 */
export async function getVideoDetailById(id: number): Promise<VideoDetail> {
    const url = baseURL + '/video?id=' + id;

    const result = await HttpUtils.get(url);

    return result.code === 200 && result.data != null
        ? result.data
        : Promise.reject({ url, result });
}

/**
 * 获取直播详情
 * @param id
 */
export async function getLiveDetailById(id: number): Promise<LiveDetail> {
    const url = baseURL + '/live?id=' + id;

    const result = await HttpUtils.get(url);

    return result.code === 200 && result.data != null
        ? result.data
        : Promise.reject(result);
}

/**
 * 获取点赞状态,和数量
 * @param source_type
 * @param source_id
 */
export async function getLikeStatus(
    source_type: Source_Cat,
    source_id: number
): Promise<{
    amount: number; //数量
    is_action: boolean; //是否点赞
}> {
    const url =
        baseURL +
        '/action/top_count' +
        objectToQueryStr({ source_type, source_id });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : Promise.reject(result);
}

/**
 * 获取收藏状态
 * @param source_type
 * @param source_id
 */
export async function getCollectStatus(
    source_type: Source_Cat,
    source_id: number
): Promise<boolean> {
    const url =
        baseURL +
        '/action/is_collect' +
        objectToQueryStr({ source_type, source_id });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : Promise.reject(result);
}

/**
 * 获取评论 总数
 * @param source_type
 * @param source_id
 */
export async function getCommentCount(
    source_type: Source_Cat,
    source_id: number
): Promise<number> {
    const url =
        baseURL +
        '/comment/count' +
        objectToQueryStr({ source_type, source_id });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : Promise.reject(result);
}

/**
 * 获取推荐新闻列表
 * @param source_id : 来源id
 * @param source_cat : 来源类型
 */
export async function getRecommendedNewsList(
    source_id: number,
    source_cat: number
): Promise<Array<News>> {
    const url =
        baseSearchURL + '/r' + objectToQueryStr({ source_cat, source_id });

    const result: any = await HttpUtils.get(url);

    return result.code === 200 ? result.data : [];
}

/**
 * 删除评论
 * @param comment_id
 */
export async function deleteComment(
    comment_id: number,
    source_type: Source_Cat,
    source_id: number
): Promise<Boolean> {
    const url = baseURL + '/comment/del';

    const result = await HttpUtils.post(url, {
        comment_id,
        source_type,
        source_id,
    });

    return result.code === 200 ? true : false;
}

/**
 * 删除 二级评论
 * @param reply_id
 * @param source_type: 评论所属类型(文章/视频)
 * @param source_id: 评论所属id
 */
export async function deleteReplyComment(
    reply_id: number,
    source_type: Source_Cat,
    source_id: number
): Promise<Boolean> {
    const url = baseURL + '/reply/del';

    const result = await HttpUtils.post(url, {
        reply_id,
        source_type,
        source_id,
    });

    return result.code === 200 ? true : false;
}

/**
 * 获取评论列表
 * @param source_type
 * @param source_id
 * @param page
 * @param page_size
 */
export async function getCommentsList(
    page: number,
    page_size: number,
    source_type: Source_Cat,
    source_id: number
): Promise<Array<Comment>> {
    const url =
        baseURL +
        '/comment/list' +
        objectToQueryStr({ source_type, source_id, page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : [];
}

/**
 * 发送评论 ()
 * @param source_type:
 * @param source_id
 * @param content
 *
 */
export async function postComment(
    source_type: Source_Cat,
    source_id: number,
    content: string
): Promise<Comment> {
    const url = baseURL + '/comment';

    const result = await HttpUtils.post(url, {
        source_type,
        source_id,
        content,
    });

    return result.code === 200 ? result.data : Promise.reject(result);
}

/**
 * 获取 评论 的 回复列表
 * @param page
 * @param page_size
 * @param comment_id
 */
export async function getCommentRelyList(
    page: number,
    page_size: number,
    comment_id: number
): Promise<Array<ReplyComment>> {
    const url =
        baseURL +
        '/reply/list' +
        objectToQueryStr({ comment_id, page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.entries : [];
}

/**
 * 收藏 / 取消收藏
 * @param source_type
 * @param source_id
 */
export async function postCollect(
    source_type: Source_Cat,
    source_id: number
): Promise<Boolean> {
    const url = baseURL + '/action/collect';

    const result = await HttpUtils.post(url, { source_type, source_id });

    return result.code === 200 ? result.data : false;
}
/**
 * 回复评论 ()
 * @param to_type 1,楼: 直接回复评论  2层: 回复评论中的评论  @用户
 * @param comment_id
 * @param to_user_id
 * @param content
 * @param source_type: 评论所属类型(文章/视频)
 * @param source_id: 评论所属id
 */
export async function replyComment(
    to_type: number,
    comment_id: number,
    to_user_id: number,
    content: string,
    source_type: Source_Cat,
    source_id: number
): Promise<ReplyComment> {
    const url = baseURL + '/reply';

    const result = await HttpUtils.post(url, {
        to_type,
        comment_id,
        to_user_id,
        content,
        source_type,
        source_id,
    });

    return result.code === 200 ? result.data : Promise.reject(result);
}

/**
 * 点赞
 * @param source_type : 来源
 * @param source_id : id
 */
export async function postLike(
    source_type: Source_Cat,
    source_id: number
): Promise<Boolean> {
    if (source_type === Source_Cat.comment) {
        return await postLikeComment(source_id);
    } else {
        const url = baseURL + '/action/top';

        const result = await HttpUtils.post(url, { source_type, source_id });

        return result.code === 200 ? true : false;
    }
}

/**
 * 点赞评论 (评论不使用通用的点赞接口)
 * @param comment_id
 */
export async function postLikeComment(comment_id: number): Promise<Boolean> {
    const url = baseURL + '/comment/top';

    const result = await HttpUtils.post(url, { comment_id });

    return result.code === 200 ? true : false;
}

/**
 * 用户 发布的所有,文章,视频列表数据
 * @param page : 当前页
 * @param page_size ：每页大小
 * @param userId : 用户ID
 * @param type : 类型  all 所有， news 新闻，video 视频
 * @returns
 */
export async function getUserDetailListData(
    page: number,
    page_size: number,
    userId: number,
    type: 'all' | 'news' | 'video' = 'all'
): Promise<
    Array<{
        cover: string; //图片
        title: string; //文章标题
        id: number; //
        amount: {
            comment: number;
            browse: number;
        };
        record_type: number; // 1:文章,6:视频
        duration: string;
    }>
> {
    let url: string;

    if (type === 'news' || type === 'video') {
        url = `${baseURL}/user/info/part${objectToQueryStr({
            user_id: userId,
            operate_type: type,
            page: page,
            page_size: page_size,
        })}`;
    } else {
        url =
            baseURL +
            '/user/info' +
            objectToQueryStr({
                user_id: userId,
                page: page,
                page_size: page_size,
            });
    }

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 用户 详情
 * @param userId
 */
export async function getUserDetail(
    userId: number
): Promise<{
    face: string; //头像
    summary: string; //简介
    name: string; //用户名
}> {
    const url =
        baseURL +
        '/user/info' +
        objectToQueryStr({ user_id: userId, page: 1, page_size: 1 });

    const result = await HttpUtils.get(url);

    return result.code === 200
        ? result.data.user || {}
        : Promise.reject(result);
}

export const Search = {
    /**
     * 热门车型
     * @returns {Promise<void>}
     */
    async getHotCarModals() {
        const url = baseURL + '/cars/hot_cars';

        let result = await HttpUtils.get(url);

        return result.code === 200 ? result.data : Promise.reject(result);
    },

    /**
     * 搜索 热门词汇
     */
    async getSearchHotWords(): Promise<
        Array<{
            id: number;
            title: string;
        }>
    > {
        const url = baseURL + '/keyword/hot';

        let result = await HttpUtils.get(url);

        return result.code === 200 ? result.data.list : Promise.reject(result);
    },

    /**
     * 获取搜索关键列表
     * @param key
     */
    async getSearchKeyList(key: string): Promise<Array<string>> {
        const url =
            baseURL + '/keyword/like' + objectToQueryStr({ query_value: key });

        const result = await HttpUtils.get(url);

        return result.code === 200 ? result.data.list : [];
    },
    /**
     * 搜索
     * @param page : 页
     * @param page_size : 每页大小
     * @param keywords :关键字
     * @param source_cat  : 类型
     */
    async search(
        page: number,
        page_size: number,
        keywords: string,
        source_cat: Source_Cat
    ): Promise<Array<any>> {
        const queryStr = objectToQueryStr({
            query_value: keywords,
            source_cat,
            page,
            page_size,
        });

        const url = baseSearchURL + '/search/list' + queryStr;

        const result = await HttpUtils.get(url);

        return result.code === 200 ? result.data.list : Promise.reject(result);
    },

    /**
     * 搜索全部
     * @param keywords :关键字
     * @param source_cat  : 类型
     */
    async searchAll(
        keywords: string,
        source_cat?: Source_Cat
    ): Promise<{
        news_list: Array<any>; //新闻
        video_list: Array<any>; //视频
        live_list: Array<any>;
        user_list: Array<any>;
        series_list: Array<any>;
    }> {
        const queryStr =
            source_cat === undefined
                ? objectToQueryStr({ query_value: keywords })
                : objectToQueryStr({ query_value: keywords, source_cat });

        const url = baseSearchURL + '/search/content' + queryStr;

        const result = await HttpUtils.get(url);

        return result.code === 200 ? result.data : Promise.reject(result);
    },
};

/**
 * 直播图片栏目
 * @param page
 * @param page_size
 * @param id
 */
export async function getLiveGallery(
    page: number,
    page_size: number,
    id: number
): Promise<{
    albums: any[];
    page: { count: number; page: number; page_size: number };
}> {
    const url = baseURL + '/album' + objectToQueryStr({ id, page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : Promise.reject(result);
}

export enum UserRoleType {
    normal = 1, //普通用户
    qichangEditor = 5, //汽场编辑
    qichanghao = 10, //汽场号,
    column = 15, //栏目号,
    alias = 20, //马甲用户
}

type News = {
    //新闻
    share_cover: string;
    source: string;
    user: User;
    id: number;
    show_time: string;
    short_title: string;
    summary: string;
    title: string;
    tags: string;
    cover: string;
};

type User = {
    name: string;
    id: number;
    face: string;
    role_type: UserRoleType;
};

export type ReplyComment = {
    //评论二级
    id: number;
    comment_id: number; // 父级id,
    content: string;
    to_type: 1 | 2; // 1,楼: 直接回复评论  2层: 回复评论中的评论  @用户
    show_time: string;
    user: {
        id: number;
        name: string;
    };
    to_user: {
        id: number;
        name: string;
    };
};
export type Comment = {
    //评论一级
    id: number;
    content: string; //评论内容
    user: User & {
        is_own: boolean;
    };
    show_time: string; //时间
    top_count: number; //点赞数
    is_top: boolean; //是否点赞
    status: number; //状态 ?
    reply_count: number; //回复数
};
