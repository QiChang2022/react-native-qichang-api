export type SignInSuccess = {
    //登录成功
    summary: string;
    token: string;
    face: string;
    name: string;
    id: number;
    phone: string;
    is_bind_wx: boolean;
    is_bind_apple: boolean;
};

//数据源类型
export enum Source_Cat {
    news = 1, //文章  :  跳转 文章 页面, 取 source_id 作为 文章Id (articleId)
    event = 2, //活动  :
    ad = 3, //广告  :
    comment = 4, //评论 :
    live = 5, //直播
    video = 6, //视频
    brand = 10, //品牌 :  跳转 搜索 页面 ,取 title ,source_id 作为brandName,brandId
    series = 12, //车系 : 跳转 车系 页面, 取 source_id 作为 车系Id (seriesId)
    car_search = 13, //车系条件搜索 : 跳转 搜索 页面 ,取 extra 作为跳转参数 (min_price,max_price)

    subject = 14, //专题 跳转 专题 页面

    column = 20, //专栏
}
