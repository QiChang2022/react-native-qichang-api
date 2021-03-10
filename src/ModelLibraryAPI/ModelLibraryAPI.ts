import * as HttpUtils from '../HttpUtils';
import { baseURL } from '../url';
import { objectToQueryStr } from '../utils';
import { Source_Cat } from '../types';

export type IndexEntryExtra = {
    min_price?: string;
    max_price?: string;

    brand_id?: string;
    brand_name?: string;

    level_id?: string;
    level_name?: string;
};

export type IndexEntry = {
    //首页 接口返回的数据结构
    url: string;
    source_id: number;
    extra: string;
    id: number;
    dsc: string;
    short_title: string;
    cover: string;
    title: string;
    source_cat: Source_Cat;
    ad: number;
};

interface NavigationParams {
    [key: string]: any;
}

export type JumpItem = {
    //跳转类型
    routeName: string;
    params?: NavigationParams;
};

export type HandledIndexEntry = {
    //首页接口处理后的类型
    originIndexEntry: IndexEntry;
    title: string;
    imageUrl: string;
    jumpItem: JumpItem;
};

const requestURL = async (url: string) => await HttpUtils.get(url);

const index_url_code = {
    swiper: 'qcv_app_index_slide', //首页轮播图
    kingkong: 'qcv_app_index_kingkong', //首页金刚区
    brand: 'qcv_app_index_brand', //首页品牌区
    hotSeries: 'qcv_app_index_hot_series', //首页热门车系
    carSearch: 'qcv_app_index_car_search', //首页车系条件区
    brandHotRankings: 'qcv_app_hot_search_rank', //热门榜单
};

function handleIndexEntries(
    entries: Array<IndexEntry>
): Array<HandledIndexEntry> {
    return entries.map((entry) => {
        let jumpItem: JumpItem;

        switch (entry.source_cat) {
            case Source_Cat.brand: {
                jumpItem = {
                    routeName: 'FindCarScreen',
                    params: {
                        brand: {
                            brandId: entry.source_id,
                            brandName: entry.title,
                        },
                    },
                };

                break;
            }
            case Source_Cat.series: {
                jumpItem = {
                    routeName: 'CarSeriesDetailScreen',
                    params: {
                        seriesId: entry.source_id,
                    },
                };

                break;
            }
            case Source_Cat.car_search: {
                jumpItem = {
                    routeName: 'FindCarScreen',
                };

                if (entry.extra) {
                    const extra = JSON.parse(entry.extra) as IndexEntryExtra;

                    let params: any = {};

                    if (extra.level_id && extra.level_name) {
                        params.level = {
                            levelId: extra.level_id,
                            levelName: extra.level_name,
                        };
                    }
                    if (extra.brand_id && extra.brand_name) {
                        params.brand = {
                            brandId: extra.brand_id,
                            brandName: extra.brand_name,
                        };
                    }
                    if (extra.min_price && extra.max_price) {
                        params.priceRange = {
                            minPrice: parseFloat(extra.min_price),
                            maxPrice: parseFloat(extra.max_price),
                        };
                    }
                    jumpItem.params = params;
                }

                break;
            }
            default: {
                jumpItem = {
                    routeName: 'null',
                    params: {
                        id: entry.source_id,
                    },
                };
                break;
            }
        }
        return {
            originIndexEntry: entry,
            title: entry.title,
            imageUrl: entry.cover,
            source_cat: entry.source_cat,
            source_id: entry.source_id,
            ad: entry.ad,
            url: entry.url,
            jumpItem: jumpItem,
        };
    });
}

const request_Index_Common = async (
    url: string
): Promise<Array<HandledIndexEntry>> => {
    let res = await requestURL(url);
    if (res.data && res.data.entries) {
        const data = handleIndexEntries(res.data.entries);
        return data;
    } else {
        return Promise.reject(res);
    }
};

//首页轮播
export async function fetchIndexSlideList(): Promise<Array<HandledIndexEntry>> {
    const url = baseURL + '/cp?code=' + index_url_code.swiper;
    return await request_Index_Common(url);
}

//首页金刚区
export async function request_Index_Kingkong(): Promise<
    Array<HandledIndexEntry>
> {
    const url = baseURL + '/cp?code=' + index_url_code.kingkong;

    return await request_Index_Common(url);
}

//首页品牌区
export async function fetchIndexBrandList(): Promise<Array<HandledIndexEntry>> {
    const url = baseURL + '/cp?code=' + index_url_code.brand;
    return await request_Index_Common(url);
}

//首页热门车系
export async function fetchIndexHotSeries(): Promise<Array<HandledIndexEntry>> {
    const url = baseURL + '/cp?code=' + index_url_code.hotSeries;
    return await request_Index_Common(url);
}

//首页车系条件区
export async function fetchIndexCarSearch(): Promise<Array<HandledIndexEntry>> {
    const url = baseURL + '/cp?code=' + index_url_code.carSearch;
    return await request_Index_Common(url);
}

//热门榜单栏目
export async function request_brandHotRankingsColumn(): Promise<
    Array<IndexEntry>
> {
    const url = baseURL + '/cp?code=' + index_url_code.brandHotRankings;

    return (await requestURL(url)).data.entries;
}

export async function request_brandHotRankings(url: string) {
    return (await requestURL(baseURL + url)).data.entries;
}

/**
 * 新车上市
 */
export async function request_newCarList() {
    const url = baseURL + '/cars/new_launch';

    const result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : Promise.reject();
}

/**
 * 新车上市
 */
export async function request_newCarComingList() {
    const url = baseURL + '/cars/new_publish';

    const result = await HttpUtils.get(url);

    return result.code === 200 && result.data && result.data.length > 0
        ? result.data
        : Promise.reject();
}

/**
 * 所有品牌
 * @returns {Promise<void>}
 */
export async function fetchAllBrands() {
    const url = baseURL + '/cars/brands';
    let result = await HttpUtils.get(url);
    return result.code === 200 ? result.data : [];
}

/**
 * 根据车型ID，获取该车型所有图片
 * https://qichangv.coding.net/p/qcv_app_api/attachment/434900/preview/626828
 * @param model_id
 * @returns {Promise<*>}
 */
export async function request_carModelImages(model_id?: number) {
    const url = baseURL + `/cars/model_pic?model_id=${model_id}`;

    let data = await HttpUtils.get(url);

    return data.code === 200 ? data.data : Promise.reject(data);
}

/**
 * 根据车系ID，获取该车系所有图片
 * https://qichangv.coding.net/p/qcv_app_api/attachment/434900/preview/626828
 * @param series_id
 * @returns {Promise<*>}
 */
export async function request_carSeriesImages(series_id?: number) {
    const url = baseURL + `/cars/model_pic?series_id=${series_id}`;

    let data = await HttpUtils.get(url);

    return data.code === 200 ? data.data : Promise.reject(data);
}

/**
 * 获取筛选结果，传入品牌id、价格区间、级别id即可
 * 返回结果已 厂商级别 为组显示内容
 * https://qichangv.coding.net/p/qcv_app_api/attachment/434900/preview/449710
 * @param brand_id 品牌id
 * @param price_min 价格下限
 * @param price_max 价格上限
 * @param level_id 级别id
 * @returns {Promise<void>}
 */
export async function v3request_carModelFilter(
    page: number,
    page_size: number,
    brand_id = '',
    level_id = '',
    price_min = 0,
    price_max = 9999
) {
    const url =
        baseURL +
        `/cars/list/filter` +
        objectToQueryStr({
            page,
            page_size,
            brand_id,
            level_id,
            price_min,
            price_max,
        });

    let result = await HttpUtils.get(url);

    return result.code === 200 ? result.data.list : [];
}

/**
 * 根据经纬度车系ID和城市获取经销商列表
 * https://qichangv.coding.net/p/qcv_app_api/attachment/434901/preview/626880
 * @param series_id : 车型
 * @param area_id : 城市 区域 id
 * @param lon : 纬度
 * @param lat : 经度
 * @returns {Promise<*>}
 */
export async function v3request_carDealers(
    series_id: number,
    area_id: string,
    lon: string,
    lat: string
): Promise<Array<any>> {
    const url =
        baseURL +
        `/cars/dealer?series_id=${series_id}&area_id=${area_id}&lon=${lon}&lat=${lat}`;

    let result = await HttpUtils.get(url);

    return result.code === 200 ? result.data : [];
}
