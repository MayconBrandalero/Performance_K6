import { sleep } from "k6";
import { browser } from "k6/browser";

export const options = {
    scenarios: {
        browserConfig: {
            executor: "per-vu-iterations",
            vus: 1,
            iterations: 1,
            options: {
                browser: {
                    type: "chromium",
                    healdless: false,
                },
            },
        },
    },
};

const url = "http://165.227.93.41/lojinha-web/v2";

export default async function () {
    const _browser = await browser.newPage();

    await _browser.goto(url);
    await _browser.fill("#usuario", "cgts");
    await _browser.fill("#senha", "123456");
    await _browser.screenshot({path: "evidences/1.png"});
    await _browser.click("#entrar");

    sleep(10);
};
