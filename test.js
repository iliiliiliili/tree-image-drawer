
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

const a1 = {children: [], display: 'a'};
const b1 = {children: [], display: 'b'};
const c1 = {children: [], display: 'c'};

const d1 = {children: [], display: 'd'};
const eChildren = {children: [], display: 'eChildren'};
const e1 = {children: [eChildren], display: 'e'};

const aa1 = {children: [a1, b1, c1], display: 'aa1'};
const bb1 = {children: [a, d], display: 'bb-'};
const cc1 = {children: [a1, d1, e1], display: 'cc1'};

const aaaa1 = {children: [aa1, bb1, cc1], display: 'aaaa1'};

drawTree ([aaaa, aaaa1], './media/test1.png');
