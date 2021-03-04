import NewsAPI from '../NewsAPI';
describe('NewsAPI', () => {
    it('资讯栏目', async () => {
        let columns = await NewsAPI.getColumnListData();
        //console.log(columns);
        //console.log(columns.map((x: any) => x.title));
        expect(columns.length).toBe(9);
    });
});

describe('直播', () => {
    it('直播列表', async () => {
        let lives = await NewsAPI.getLiveList(0, 5);
        expect(lives.length).toBe(5);
    });
    it('直播详情', async () => {
        let live = await NewsAPI.getLiveDetailById(528);
        console.log(live);
    });
});
