import http from "k6/http";
import { sleep } from "k6";

export const options = {
    cloud: {
        name: "Exercicio 04",
        projectID: 3715742,
    },
    scenarios: {
        userAccess: {
            executor: "ramping-vus",
            stages: [
                {target: 3, duration: "5s",},
                {target: 3, duration: "30s",},
                {target: 0, duration: "5s",},
            ],
            exec: "accessHomePage",
        },
        userLogin: {
            executor: "ramping-vus",
            stages: [
                {target: 5, duration: "1s",},
                {target: 0, duration: "1s",},
            ],
            exec: "realizeLogin",
            startTime: "10s",
        },
    },
};

export function accessHomePage() {
    const route = "http://165.227.93.41/lojinha/v2";

    http.get(route);
    sleep(1);
};

export function realizeLogin() {
    const route = "http://165.227.93.41/lojinha/v2";
    
    const body = JSON.stringify({
        usuarioLogin: "cgts",
        usuarioSenha: "123456",
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    http.post(`${route}/login`, body, params);
    http.get(`${route}/produto`);

    sleep(1);
};
