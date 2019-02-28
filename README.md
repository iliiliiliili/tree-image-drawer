# Tree image drawer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/62f45147e98f44da877f100784172ed1)](https://app.codacy.com/app/iliiliiliili/tree-image-drawer?utm_source=github.com&utm_medium=referral&utm_content=iliiliiliili/tree-image-drawer&utm_campaign=Badge_Grade_Dashboard)

Node.js tree to png drawer

![example](media/test.png)

## Usage

```js

const {drawTree} = require ('./index');

const a = {children: [], display: 'a'};
const b = {children: [], display: 'b'};
const c = {children: [], display: 'c'};

const d = {children: [], display: 'd'};
const e = {children: [], display: 'e'};

const aa = {children: [a, b, c], display: 'aa'};
const bb = {children: [a, d], display: 'bb'};
const cc = {children: [a, d, e], display: 'cc'};

const aaaa = {children: [aa, bb, cc], display: 'aaaa'};

drawTree ([aaaa], './media/test.png');

```

## Methods

   - ```async drawTree (roots, savePath, options = defaultOptions)```
