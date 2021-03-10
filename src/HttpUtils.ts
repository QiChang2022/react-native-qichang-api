import { Platform, DeviceEventEmitter } from 'react-native';

let headers = {
    'User-Token': '',
    'User-Source': '',
    'app-version': '', //App版本号
    'device-type': '',
    'system-version': '', //系统版本
};

const TIMEOUT_CODE = 444;

const UserTokenInvalidNotification = 'UserTokenInvalidNotification';

export function setHeadersToken(token: string) {
    headers['User-Token'] = token;
}

export function setHeaders(
    appVersion: string,
    deviceType: string,
    systemVersion: string
) {
    headers = {
        ...headers,
        'app-version': appVersion, //App版本号
        'device-type': deviceType, //设备类型
        'system-version': `${Platform.OS}-${systemVersion}`, //系统版本
    };
}

/**
 * fetch 工具, 增加超时功能, 对非 200的status做失败处理
 * @param input
 * @param init
 * @param timeout
 */
function myFetch(
    input: RequestInfo,
    init?: RequestInit,
    timeout: number = 10000
) {
    return new Promise((resolve, reject) => {
        let status = 0; //0 等待, 1 完成 ,2 超时

        let timer = setTimeout(() => {
            if (status === 0) {
                status = 2;

                clearTimeout(timer);

                reject({
                    code: TIMEOUT_CODE,
                    timeout: timeout,
                    message: '请求超时',
                });
            }
        }, timeout);

        fetch(input, init)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    clearTimeout(timer);
                    status = 1;
                    reject(response);
                }
            })
            .then((result) => {
                if (status !== 2) {
                    resolve(result);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export { myFetch as fetch };

export async function get(url: string): Promise<any> {
    console.debug(`GET:${url}`, headers);
    const startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        myFetch(url, { method: 'GET', headers })
            .then((data) => {
                const endTime = new Date().getTime();
                console.debug(
                    `GET(${endTime - startTime}ms):${url}\n${JSON.stringify(
                        data,
                        null,
                        4
                    )}`
                );
                resolve(data);
            })
            .catch((error) => {
                if (error.status && error.status === 401) {
                    DeviceEventEmitter.emit(UserTokenInvalidNotification);
                }

                reject(error);
            });
    });
}

export async function post(url: string, params: object): Promise<any> {
    return new Promise((resolve, reject) => {
        const startTime = new Date().getTime();
        console.debug(
            `POST:${url},`,
            headers,
            `:${JSON.stringify(params, null, 4)}`
        );
        myFetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: headers,
        })
            .then((data) => {
                const endTime = new Date().getTime();
                console.debug(
                    `POST(${endTime - startTime}ms):${url}\n${JSON.stringify(
                        data,
                        null,
                        4
                    )}`
                );
                resolve(data);
            })
            .catch((error) => {
                if (error.status && error.status === 401) {
                    DeviceEventEmitter.emit(UserTokenInvalidNotification);
                }

                reject(error);
            });
    });
}

export async function uploadFile(
    url: string,
    filePath: string
    //params: object
): Promise<any> {
    let formData = new FormData();
    let file = {
        uri: filePath,
        type: 'application/octet-stream',
        name: 'file.jpg',
    };

    formData.append('file_data', file);

    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: headers,
        })
            .then((response) => {
                console.log(response);

                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status === 401) {
                        //Toast.info('没有权限')
                    }

                    reject();
                }
            })
            .then((result) => {
                console.debug(
                    `POST:${url}\n${JSON.stringify(result, null, 4)}`
                );
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
