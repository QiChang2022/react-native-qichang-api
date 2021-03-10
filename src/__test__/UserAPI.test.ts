import * as UserAPI from '../UserAPI';
import NewsAPI from '../NewsAPI';
import * as HttpUtils from '../HttpUtils';
import { Source_Cat } from '../types';

const openid = 'oxVNwwHeuhxNVHCwjYbWpl9OJNR8';
const unionid = 'oapajw8utcTAFwIYp5jMCNMAMWSE';

describe('用户授权', () => {
    beforeAll(async () => {
        let result = await UserAPI.loginWithThirdPlatformWechat(
            openid,
            unionid
        );
        expect(result.code).toBe(200);
        expect(result.data).toBeDefined();

        let token = result.data!.token;
        HttpUtils.setHeadersToken(token);
    });

    test('获取用户浏览记录', async () => {
        let data = await UserAPI.getMyNewsFootprintScreen(1, 10);
        expect(data.length).toBe(10);
    });

    test('发送评论', async () => {
        let videoList = await NewsAPI.getVideoList(1, 5);
        expect(videoList.length).toBe(5);

        let firstVideo = videoList.shift()!;
        //console.log(firstVideo);
        await NewsAPI.postComment(Source_Cat.video, firstVideo.id, '相当喜欢');
    });
});
