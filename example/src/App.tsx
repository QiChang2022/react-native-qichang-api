import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { API, setURL, HttpUtils2 } from 'react-native-qichang-api';

import {
    getVersion,
    getSystemVersion,
    getDeviceId,
} from 'react-native-device-info';

HttpUtils2.setHeaders(getVersion(), getDeviceId(), getSystemVersion());

setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');

export default function App() {
    return (
        <View style={styles.container}>
            <Text
                onPress={() => {
                    API.getStartAd();
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
