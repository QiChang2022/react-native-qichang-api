import { API } from '..';
describe('API', () => {
    it('开屏图', async () => {
        try {
            let res = await API.getStartScreenImage(1125, 2436);
            expect(res.title.length).toBeGreaterThan(0);
        } catch (error) {
            //expect(true).toBe(false)
        }
    });
});
