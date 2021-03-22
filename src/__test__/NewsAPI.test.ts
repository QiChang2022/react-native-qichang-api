import { Source_Cat } from '../types';
import NewsAPI from '../NewsAPI';

describe('资讯栏目', () => {
    let columns: any[] = [];

    beforeAll(async () => {
        columns = await NewsAPI.getColumnListData();
    });

    afterAll(() => {
        columns = [];
    });

    test('9个栏目', async () => {
        expect(columns.length).toBe(9);
    });

    test('包含 推荐', async () => {
        let columnTitles = columns.map((x) => x.title);
        expect(columnTitles).toContain('推荐');
    });
});

describe('直播', () => {
    test('直播列表', async () => {
        let lives = await NewsAPI.getLiveList(0, 5);
        expect(lives.length).toBe(5);
    });
    test('直播详情', async () => {
        let live = await NewsAPI.getLiveDetailById(532);
        expect(live.title).toBeDefined();
    });
});

describe('文章', () => {
    test('精选文章列表', (done) => {
        NewsAPI.getHomeSelectionList(1, 5).then((data) => {
            try {
                expect(data.length).toBe(5);
                done();
            } catch (error) {
                done('error');
            }
        });
    });

    test('the fetch fails with an error', async () => {
        expect.assertions(1);
        try {
            await NewsAPI.getNewsDetailById(-111);
        } catch (e) {
            expect(e).toMatchObject({ data: null });
        }
    });
});

describe('详情 活动悬浮框', () => {
    function testFloatConfig(data: any) {
        if ('target' in data.float_config) {
            expect(data.float_config.target).not.toBeNull();
            expect(data.float_config.target.target_type).toBe(Source_Cat.ad);
        } else {
            expect(data.float_config).toEqual({});
        }
    }

    test('文章详情 活动悬浮框', async () => {
        let articleDetail = await NewsAPI.getNewsDetailById(48707);
        testFloatConfig(articleDetail);
    });

    test('直播详情 活动悬浮框', async () => {
        let live = await NewsAPI.getLiveDetailById(534);
        testFloatConfig(live);
    });

    test('视频详情 活动悬浮框', async () => {
        let videoDetail = await NewsAPI.getVideoDetailById(1383);
        testFloatConfig(videoDetail);
    });
});

describe('搜索', () => {
    test('搜索 所有', async () => {
        let result = await NewsAPI.Search.searchAll('11');
        //console.log(result);
        expect('user_list' in result).toBeTruthy();
        expect('video_list' in result).toBeTruthy();
        expect('live_list' in result).toBeTruthy();
        expect('series_list' in result).toBeTruthy();
        expect('news_list' in result).toBeTruthy();
    });

    test('搜索 用户', async () => {
        let result = await NewsAPI.Search.search(1, 10, '刘', Source_Cat.user);
        //console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });
});

describe('用户详情数据', () => {
    let userId = 85; //刘宠的ID

    test('所有数据', async () => {
        let data = await NewsAPI.getUserDetailListData(1, 10, userId, 'all');
        expect(data.length).toBe(10);
    });
    test('所有数据都是文章数据', async () => {
        let data = await NewsAPI.getUserDetailListData(1, 10, userId, 'news');
        expect(data.length).toBe(10);
        data.forEach((x) => {
            expect(x.record_type).toBe(1);
        });
    });
    test('所有数据都是视频数据 ', async () => {
        let data = await NewsAPI.getUserDetailListData(1, 10, userId, 'video');
        expect(data.length).toBe(10);
        data.forEach((x) => {
            expect(x.record_type).toBe(6);
        });
    });
});
