import NewsAPI from '../NewsAPI';
describe('NewsAPI', () => {
    it('栏目', async () => {
        let columns = await NewsAPI.getColumnListData();
        console.log(columns);
    });
});
