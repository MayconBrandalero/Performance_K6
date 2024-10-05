import http from 'k6/http';
import { sleep } from 'k6';
import { numeroAleatorioAte } from '../utils/numero.js';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function(){
    http.get('http://test.k6.io');
    sleep(numeroAleatorioAte(5)); // Usuarios tem um Think Time de até 5s // O floor vai arrendondar pra baixo
};
