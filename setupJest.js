import fetch from 'node-fetch';

import { setURL, HttpUtils2 } from './src';

if (!global.fetch) {
    global.fetch = fetch;
}

HttpUtils2.setHeaders('3.8.2', 'getDeviceId()', 'getSystemVersion()');

setURL('http://app-api.bxmauto.com', 'http://search.bxmauto.com'); //测试
//setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com'); //生产

console.debug = () => {};
