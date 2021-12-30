import * as AsyncStorage from '../utils/AsyncStorage';
import Axios from "axios";

export async function callApiAxios(methodType, apiUrl, requestBody, isMultipartRequest = false) {
    return await Axios({
        apiUrl,
        methodType,
        requestBody
    });
}

export async function callApi(methodType, apiUrl, requestBody, isMultipartRequest = false) {
    const userData = await AsyncStorage.getItem(AsyncStorage.KEY_USERDATA);
    let requestHeaders;
    let userInfo;
    if (userData) {
        userInfo = JSON.parse(userData);
    }
    console.log('userInfo', userInfo);
    let body = JSON.stringify(requestBody)
    requestHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    // if (userInfo && userInfo.data && userInfo.data.token) {
    //    requestHeaders.Authorization = `Bearer ${userInfo.data.token}`;
    //   // requestHeaders.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyM2NhYzYwMC05ZWE3LTExZWEtYjdkZi0zMzhkNGJjMzZhZDQiLCJpYXQiOjE1OTk3MzY0MDMsImV4cCI6MTU5OTgyMjgwM30.cuCQaqdcNtTEENgd3XNVw5f3mlbi8y0mgv44MIzpOfw`;
    // }
    if (isMultipartRequest) {
        requestHeaders["Content-Type"] = 'multipart/form-data';
        body = requestBody;
    }
    console.log('requestHeaders', requestHeaders);
    console.log('body', body);
    console.log('apiUrl', apiUrl);
    return await fetch(apiUrl, {
        method: methodType,
        headers: requestHeaders,
        body: body,
    })
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then(([statusCode, data]) => {
            console.log('statusCode', statusCode);
            console.log('data', data);
            let responseObj = null;
            if (statusCode === 200 || statusCode === 201 || statusCode === 403) {
                responseObj = {
                    data: data,
                    statusCode: statusCode,
                };
            }
            return responseObj;
        })
        .catch(error => {
            console.log(error);
        });

}