# Tree image drawer

Node.js tree to png drawer

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fb7e1f25982a434eba263ea7cb27d8b1)](https://www.codacy.com/app/iliiliiliili/tree-image-drawer?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=iliiliiliili/tree-image-drawer&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/tree-image-drawer.svg)](https://badge.fury.io/js/tree-image-drawer)

## Usage

![example](media/test.png)

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

![example](media/test2.png)

```js

const {drawAsTree} = require ('./index');

const a2 = {outside: []};
const b2 = {outside: []};
const c2 = {outside: []};

const d2 = {outside: []};
const e2Children = {outside: []};
const e2 = {outside: [e2Children]};

const aa2 = {outside: [a2, b2, c2]};
const bb2 = {outside: [a2, d2]};
const cc2 = {outside: [a2, d2, e2]};

const aaaa2 = {outside: [aa2, bb2, cc2]};

drawAsTree ([aaaa2]
    , (node) => node.outside
    , () => (Math.random () > 0.5 ? 'a' : 'bb')
    , './media/test2.png');

```

## Methods

- ```async drawTree (roots, savePath, options = defaultOptions)```

- ```async drawAsTree (root, getChildren, getDisplay, context, options = defaultOptions)```
