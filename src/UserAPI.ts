import * as HttpUtils from './HttpUtils';
import { baseURL } from './url';
import { SignInSuccess, Source_Cat } from './types';
import { objectToQueryStr } from './utils';
import { ReplyComment } from './NewsAPI/NewsAPI';

type SignInResponse = { msg: string; code: number; data: SignInSuccess | null };

/**
 * 登录 使用手机号,验证码
 * @param phone
 * @param code
 */
export async function loginWithPhone(
    phone: string,
    code: string
): Promise<SignInResponse> {
    const url = baseURL + '/login';

    return await HttpUtils.post(url, { phone, code });
}

/**
 * 使用第三方苹果的登录
 * // code: 530,未绑定手机号, 接着调用 bindPhoneWithApple， 这个状态去掉了，苹果要求不能强制绑定手机号
 * code: 200,登录成功
 * @param appleId : 苹果登录返回的id
 * @param identityToken : 苹果登录返回的token
 */
export async function loginWithThirdPlatformApple(
    appleId: string,
    identityToken: string | null
): Promise<SignInResponse> {
    const url = baseURL + '/apple_login';

    const res = await HttpUtils.post(url, {
        apple_id: appleId,
        token: identityToken,
    });

    return res;
}

/**
 * 使用第三方微信的登录
 * code: 530,未绑定手机号, 接着调用 bindPhoneWithWechat
 * code: 200,登录成功
 * @param openid
 * @param unionid
 */
export async function loginWithThirdPlatformWechat(
    openid: string,
    unionid: string
): Promise<SignInResponse> {
    const url = baseURL + '/third_login';
    return await HttpUtils.post(url, { openid, unionid });
}

/**
 * 微信第一次登录 绑定手机号
 * @param openid
 * @param unionid
 * @param phone
 * @param code
 * @param name
 * @param face
 * @param gender
 */
export async function bindPhoneWithWechat(
    openid: string,
    unionid: string,
    phone: string,
    code: string,
    name: string,
    face: string,
    gender: string
): Promise<SignInResponse> {
    const params = { openid, unionid, phone, code, name, face, gender };

    const url = baseURL + '/third_reg';

    const res = await HttpUtils.post(url, params);

    if (res.code === 200 && res.data) {
        res.data.is_bind_wx = true; //fix 结果没有is_bind_wx字段的问题
    }

    return res;
}

/**
 * 苹果第一次登录 绑定手机号
 * @param phone
 * @param code
 * @param appleId
 * @param token
 */
export async function bindPhoneWithApple(
    phone: string,
    code: string,
    appleId: string,
    token: string | null
): Promise<SignInResponse> {
    const params = { phone, code, apple_id: appleId, token };

    const url = baseURL + '/apple/register';

    const res = await HttpUtils.post(url, params);

    if (res.code === 200) {
        return res;
    } else {
        return Promise.reject(res);
    }
}

/**
 * 解绑微信
 */
export async function unbindWechat(): Promise<Boolean> {
    const url = baseURL + '/user/un_bind/wechat';

    const result = await HttpUtils.get(url);

    return result.code === 200 ? true : false;
}

/**
 * 绑定微信
 * @param openid : 微信openid
 * @param unionid : 微信unionid
 */
export async function bindWechat(openid: string, unionid: string) {
    const url = baseURL + '/user/bind/wechat';

    const result = await HttpUtils.post(url, { openid, unionid });

    return result.code === 200 ? true : Promise.reject(result);
}

/**
 * 账号绑定Apple
 * @param appleId
 * @param token
 */
export async function bindApple(appleId: string, token: string | null) {
    const url = baseURL + '/apple_bind';

    const res = await HttpUtils.post(url, { apple_id: appleId, token: token });

    return res.code === 200 ? true : Promise.reject(res);
}

/**
 * 账号解绑苹果
 */
export async function unbindApple() {
    const url = baseURL + '/apple_unbind';

    const res = await HttpUtils.get(url);

    return res.code === 200 ? true : Promise.reject(res);
}

/**
 * 绑定手机号
 * @param phone : 手机号
 * @param code : 验证码
 */
export async function bindPhone(
    phone: string,
    code: string
): Promise<SignInResponse> {
    const url = baseURL + '/user/bind/phone';

    const result = await HttpUtils.post(url, { phone, code });

    return result.code === 200 ? result : Promise.reject(result);
}

/**
 * 更新用户信息
 * @param face 头像
 * @param name 名称
 * @param summary 签名
 */
export async function updateUserInfo(userInfo: {
    face?: string;
    name?: string;
    summary?: string;
}): Promise<boolean> {
    const url = baseURL + '/user/complete';

    const result = await HttpUtils.post(url, { ...userInfo });

    return result.code === 200 ? true : Promise.reject(result);
}

/**
 * 上传用户头像
 * @param imagePath
 */
export async function uploadUserAvatar(imagePath: string) {
    const url = baseURL + '/public/image/upload';

    const result = await HttpUtils.uploadFile(url, imagePath);

    if (result.code === 200) {
        return result.data;
    } else {
        return Promise.reject(result);
    }
}

/**
 * 获取验证码图片地址
 * @param phone
 */
export function getVerificationImageUrl(phone: string): string {
    return `${baseURL}/public/vc?phone=${phone}&temp=${Math.random()}`;
}

/**
 * 获取短信验证码
 * @param phone:手机号
 * @param code :验证图片结果
 * @param cat : 短信类型,login 登录 reg注册 bind绑定
 */
export async function getPhoneCode(
    phone: string,
    code: string,
    cat: 'login' | 'reg' | 'bind'
): Promise<any> {
    const query = { phone, code, cat };
    const url = baseURL + '/public/sms';
    return await HttpUtils.post(url, query);
}

/**
 * 用户更换绑定手机号 , 第一步验证旧手机
 * @param phone
 * @param code
 */
export async function changePhone_VerifyOldPhone(phone: string, code: string) {
    const url = baseURL + '/user/exchange/phone';

    const result = await HttpUtils.post(url, { phone, code, step: '1' });

    console.log(result);

    return result.code === 200 ? true : false;
}

/**
 * 用户更换绑定手机号 , 第二步验证新手机
 * @param pre_phone : 原手机
 * @param pre_code  : 原验证码
 * @param phone : 新手机号
 * @param code  : 新验证码
 */
export async function changePhone_VerifyNewPhone(
    pre_phone: string,
    pre_code: string,
    phone: string,
    code: string
) {
    const url = baseURL + '/user/exchange/phone';

    const result = await HttpUtils.post(url, {
        phone,
        code,
        pre_phone,
        pre_code,
        step: '2',
    });

    return result.code === 200 ? true : Promise.reject(result);
}

/**
 * 获取用户 收藏 的新闻列表
 * @param page
 * @param page_size
 */
export async function getMyNewsCollection(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL + '/news/collect' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 获取用户 收藏 的视频列表
 * @param page
 * @param page_size
 */
export async function getMyVideoCollection(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL + '/video/collect' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 获取用户 足迹中的新闻列表
 * @param page
 * @param page_size
 */
export async function getMyNewsFootprintScreen(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL + '/news/browse' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 获取用户 足迹中的视频列表
 * @param page
 * @param page_size
 */
export async function getMyVideoFootprintScreen(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL + '/video/browse' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 意见反馈
 * @param content
 */
export async function postFeedback(content: string): Promise<Boolean> {
    const url = baseURL + '/public/feedback';

    const result = await HttpUtils.post(url, { content });

    return result.code === 200 ? true : false;
}

export enum ReportType {
    ad = 1, //广告
    vulgar = 2, //低俗
    abuse = 3, //恶意攻击谩骂
    politicalSensitive = 4, //政治敏感
    rumor = 5, //造谣信息
    fraud = 6, //诈骗
}

/**
 * 举报
 * @param reportType :举报类型
 * @param source_type : 来源类型
 * @param source_id  :来源id
 * @param content :用户举报提交的内容
 */
export async function postReport(
    reportType: ReportType,
    source_type: Source_Cat,
    source_id: number,
    content: string = ''
): Promise<Boolean> {
    const url = baseURL + '/public/report';

    const result = await HttpUtils.post(url, {
        report_cat_id: reportType,
        source_type,
        source_id,
        content,
    });

    return result.code === 200 ? true : false;
}

/**
 * 获取用户 评论 回复列表
 * @param page
 * @param page_size
 */
export async function getMyCommentsReplyList(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL + '/user/reply/list' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 获取用户 通知消息
 * @param page
 * @param page_size
 */
export async function getSystemNotificationList(
    page: number,
    page_size: number
): Promise<Array<any>> {
    const url =
        baseURL + '/user/message/list' + objectToQueryStr({ page, page_size });

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : Promise.reject(result);
}

/**
 * 回复评论
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
