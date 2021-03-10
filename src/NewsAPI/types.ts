import { Source_Cat } from '../types';

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

type FloatConfig =
    | {
          source_id: number;
          source_type: number;
          status: number;
          float_url: string; //图片地址
          start_time: string;
          end_time: string;
          target: {
              target_id: number; //id
              target_type: number; //跳转类型 广告类型
              target_url: string; //跳转url
              start_time: string;
              end_time: string;
          };
      }
    | {};

//直播详情
export type LiveDetail = {
    title: string;
    summary: string;
    tags: Array<string>;

    start_time: string;
    live_url: {
        m3u8: string;
    };
    series_list: Array<any>;
    cover: string;
    record_url: string;
    status: any;
    record_status: any;

    chat_room_id: string;
    chat_room_url: string;
    chat_room_web_url: string;

    float_config: FloatConfig; //控制是否显示活动悬浮框
};

//文章详情
export type ArticleDetail = {
    id: number;
    title: string;
    summary: string;
    cover: string;
    tags: Array<string>;
} & { float_config: FloatConfig };

//视频详情
export type VideoDetail = any & { float_config: FloatConfig };
