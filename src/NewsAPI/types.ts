export enum UserRoleType {
    normal = 1, //普通用户
    qichangEditor = 5, //汽场编辑
    qichanghao = 10, //汽场号,
    column = 15, //栏目号,
    alias = 20, //马甲用户
}

type User = {
    name: string;
    id: number;
    face: string;
    role_type: UserRoleType;
};

export type ComplexType = {
    id: number;
    style: LayoutType;
    source_cat: Source_Cat;
    amount: {
        top: number;
        collect: number;
        comment: number;
        share: number;
        browse: number;
    };
    source_id: number;
    user: User;
    title: string;
    cover: string;
    ad: number; // 1显示广告标识 , 0 不显示
    dsc: string;

    //可选的
    url: string; //广告跳转
    start_time: string;
    duration: string;
    cur_number: number;
    status: 1 | 2 | 3;
};

//布局类型
export enum LayoutType {
    nothing = 0, //无
    news_little_image = 1, //文章小图
    news_large_image = 2, //文章大图
    event_large_image = 11, //活动大图
    ad_little_image = 21, //广告小图
    ad_large_image = 22, //广告大图
    live_large_image = 31, //直播大图
    video_little_image = 41, //视频小图
    video_large_image = 42, //视频大图

    //新增类型
    qichanghao_little_image = 51, // 汽场号小图
    qichanghao_large_image = 52, // 汽场号大图
    subject = 61, //专题
}

// 1	news	文章
// 2	event	活动
// 3	ad	广告
// 10	brand	品牌
// 12	series	车系
// 13	car_search	车系条件搜索

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
