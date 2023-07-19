import {v4 as uuidv4} from 'uuid';

fixture`Authorization and account management`;

const baseUrl = 'https://api.spacetraders.io/v2'
const register = `${baseUrl}/register`

function randomSymbol() {
    return uuidv4().replaceAll("-", "").substring(0, 14);
}

test('where we successfully create account', async t => {
    const response = await t.request({
        url: register, method: 'post', body: {
            "faction": "COSMIC",
            "symbol": randomSymbol(),
            "email": process.env.DEV_EMAIL
        }
    });
    console.log(response.body)
    await t.expect(response.status).eql(201)
    await t.expect(response.body.data.token.length > 0).ok('body should have a token')
});

test('where we fail because the symbol is already in use', async t => {
    let symbol = randomSymbol();
    const response = await t.request({
        url: register, method: 'post', body: {
            "faction": "COSMIC",
            "symbol": symbol,
            "email": process.env.DEV_EMAIL
        }
    });
    await t.expect(response.status).eql(201)

    const response2 = await t.request({
        url: register, method: 'post', body: {
            "faction": "COSMIC",
            "symbol": symbol,
            "email": process.env.DEV_EMAIL
        }
    });

    await t.expect(response2.status).eql(422)
});
