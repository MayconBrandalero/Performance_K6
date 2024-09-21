import http from "k6/http";
import { sleep, check, group } from "k6";
//import { faker } from '@faker-js/faker';

export const options = {
    //vus: 1,
    //duration: "10s",
    //iterations: 1,
    cloud: {
        name: "Exercicio 03", // Qualquer nome
        projectID: 3715742, // Pego do site do Grafana K6
    },
    stages: [
        {target: 50, duration: "1s",},
        {target: 0, duration: "1s",},
        //{target: 0, duration: "3s",},
    ]
};

export default function realizeLogin(){
    const route = "http://165.227.93.41/lojinha/v2";
    let tokenUser;

    group("Realize login", () => {
        const body = JSON.stringify({
            usuarioLogin: "cgts",
            usuarioSenha: "123456",
        });

        const params = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responseLogin = http.post(`${route}/login`, body, params);

        check(responseLogin, {
            "Status é 200": r => r.status === 200,
            "A mensagem de sucesso ao realizar login foi apresentada": r => r.json().message === "Sucesso ao realizar o login",
        });

        tokenUser = responseLogin.json("data.token");
    });

    group("Register a New Product", () => {
        const body = JSON.stringify({
            produtoNome: "PlayStation Pro",
            produtoValor: "6000",
            produtoCores: [
                "preto",
                "branco",
            ],
        });
    
        const params = {
            headers: {
                "Content-Type": "application/json",
                token: tokenUser,
            },
        }
    
        const responseNewProduct = http.post(`${route}/produtos`, body, params);
    
        check(responseNewProduct, {
            "Status é 200": r => r.status === 201,
            "A mensagem de sucesso foi apresentada": r => r.json().message === "Produto adicionado com sucesso",
            "A segunda cor do produto está correta, sem GJSON": r => r.json().data.produtoCores[1] === "branco",
            "A segunda cor do produto está correta, com GJSON": r => r.json("data.produtoCores.1") === "branco",
        });
    });
        
    group("Waiting for User Think Time", () => {
        sleep(1); //Entenda o comportamento e quem é o usuário, para definir o User Think Time
    }); 
};