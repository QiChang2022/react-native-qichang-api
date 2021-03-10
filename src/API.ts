import * as HttpUtils from './HttpUtils';
import { baseURL } from './url';
import { objectToQueryStr } from './utils';

/**
 * 获取开屏图片
 * @param screenWidth : 屏幕宽度
 * @param screenHeight  : 屏幕高度
 */
export async function getStartScreenImage(
    screenWidth: number,
    screenHeight: number
): Promise<{
    cover: string; //图片,
    duration: number; //倒计时时间s,
    source_id: number; //id,
    source_cat: number; //跳转类型
}> {
    const url =
        baseURL +
        '/cp/os_ad' +
        objectToQueryStr({ w: screenWidth, h: screenHeight });

    const result = await HttpUtils.get(url);

    return result.code === 200 && result.data != null
        ? result.data
        : Promise.reject(result);
}

/**
 * 开屏广告
 */
export async function getStartAd(): Promise<{
    ad: {
        id: number; //
        cover: string; //图片地址
        url: string; //跳转链接
        source_cat: number;
        source_id: number;
    };
    ios_version?: {
        is_force: number; // 11强制更新
    };
    chat_room_index: string; //直播聊天室文明用语
    android_version?: {
        is_force: number;
    };
    default_search: string; //默认搜索关键字
    share_host: string; //用户分享
    official_host: string; // 用于 关于我们,用户协议
}> {
    const url = baseURL + '/index/sync';

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : Promise.reject(result);
}
