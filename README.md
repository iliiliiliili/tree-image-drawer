# Tree image drawer

Node.js tree to png drawer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fb7e1f25982a434eba263ea7cb27d8b1)](https://www.codacy.com/app/iliiliiliili/tree-image-drawer?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=iliiliiliili/tree-image-drawer&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/tree-image-drawer.svg)](https://badge.fury.io/js/tree-image-drawer)


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
