import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import {
    getVersion,
    getSystemVersion,
    getDeviceId,
} from 'react-native-device-info';
import { API, setURL, HttpUtils } from 'react-native-qichang-api';
HttpUtils.setHeaders(getVersion(), getDeviceId(), getSystemVersion());

//setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com'); //生产
setURL('http://app-api.bxmauto.com', 'http://search.bxmauto.com'); //测试

export default function App() {
    return (
        <View style={styles.container}>
            <Text
                onPress={async () => {
                    API.getStartAd({
                        longitude: 116.4,
                        latitude: 39.9,
                    });
                }}
            >
                API 测试
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
