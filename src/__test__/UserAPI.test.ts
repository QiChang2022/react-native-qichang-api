import * as UserAPI from '../UserAPI';
import * as HttpUtils from '../HttpUtils';

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
        console.log(data);
        expect(data.length).toBe(10);
    });
});
