# testcafe-starter

```shell
npx create-testcafe
```

```shell
git add package.json package-lock.json .testcaferc.js .github/** tests/**
```

```shell
cat <<EOF > package.json
{
  "scripts": {
    "test": "testcafe chrome"
  },
  "devDependencies": {
    "testcafe": "^3.0.1"
  }
}
EOF
```

```shell
npm run test
```

```shell
git commit -m "bootstrap" && git push origin main
```

```shell
git commit -m "bootstrap" && git push origin main
```

```shell
mkdir tests-api
```

```shell
cat <<EOF > package.json
{
  "scripts": {
    "test": "testcafe chrome",
    "test-api": "testcafe chrome tests-api"
  },
  "devDependencies": {
    "testcafe": "^3.0.1"
  }
}
EOF
```

```shell
npm install uuid
```

```shell
cat <<EOF > package.json
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
EOF
```

```shell
export DEV_EMAIL=....; npm run test-api 
```

 ```shell
git add package.json package-lock.json tests-api/**
```

 ```shell
git commit -m "auth test" && git push origin main
```
