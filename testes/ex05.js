import http from "k6/http";
import { sleep } from "k6";
import { SharedArray } from "k6/data";

const data = new SharedArray("dados", () => {
    return JSON.parse(open("../dados/ex05.json"));
});

export const options = {
    cloud: {
        name: "Exercicio 05",
        projectID: 3715742,
    },
    scenarios: {
        ddt: {
            executor: 'shared-iterations',
            vus: 2,
            // Iterations precisam ser maiores ou iguais que o número de vus, sempre refletindo a quantidade de itens no arquvo de dados
            iterations: data.length
        },
    },
};

export default function () {
    const route = "http://165.227.93.41/lojinha/v2";

    const body = JSON.stringify({
        usuarioLogin: "cgts",
        usuarioSenha: "123456",
    });

    const params = {
        headers: {
            "Content-Type": "application/x-ww-form-urlencoded",
        },
    };

    http.post(`${route}/login`, body, params);
    sleep(1);
};
