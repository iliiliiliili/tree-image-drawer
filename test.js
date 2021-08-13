
const {drawTree, drawAsTree} = require ('./index');

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


drawTree ([a, b, c, d, e], './media/test3.png');

const x1 = {};
const x2 = {};
const x3 = {1: [x1, x2]};
const x4 = {};
const x = {'0': [x3, x4]};
const y = {'0': [x]};
const z = {1: [x]};
const w = {1: [z]};

drawAsTree ([y, w]
    , (node) => node ['0'] || node [1] || []
    , () => 'a'
    , './media/test4.png');

    drawAsTree ([y, w]
        , (node) => node ['0'] || node [1] || []
        , () => 'a'
        , './media/test-arrow-both.png',
        {
    
            block: {width: 140, height: 40},
            delta: {width: 100, height: 80},
            offset: {x: 20, y: 40},
            displayType: 'text',
            colors: {
                block: 'rgba(0, 0, 0, 255)',
                line: 'rgba(0, 0, 0, 255)',
                font: 'rgba(0, 0, 0, 255)',
                background: 'rgba(0, 0, 0, 0)'
            },
            arrow: {
                bottom: true,
                top: true,
                open: 3,
                size: 10
            },
            font: '30px Impact',
        });

drawAsTree ([y, w]
    , (node) => node ['0'] || node [1] || []
    , () => 'a'
    , './media/test-arrow-bottom.png',
    {

        block: {width: 140, height: 40},
        delta: {width: 100, height: 80},
        offset: {x: 20, y: 40},
        displayType: 'text',
        colors: {
            block: 'rgba(0, 0, 0, 255)',
            line: 'rgba(0, 0, 0, 255)',
            font: 'rgba(0, 0, 0, 255)',
            background: 'rgba(0, 0, 0, 0)'
        },
        arrow: {
            bottom: true,
            top: false,
            open: 3,
            size: 10
        },
        font: '30px Impact',
    });

    drawAsTree ([y, w]
    , (node) => node ['0'] || node [1] || []
    , () => 'a'
    , './media/test-arrow-top.png',
    {
    
        block: {width: 140, height: 40},
        delta: {width: 100, height: 80},
        offset: {x: 20, y: 40},
        displayType: 'text',
        colors: {
            block: 'rgba(0, 0, 0, 255)',
            line: 'rgba(0, 0, 0, 255)',
            font: 'rgba(0, 0, 0, 255)',
            background: 'rgba(0, 0, 0, 0)'
        },
        arrow: {
            bottom: false,
            top: true,
            open: 3,
            size: 10
        },
        font: '30px Impact',
    });

drawAsTree ([y, w]
, (node) => node ['0'] || node [1] || []
, () => 'a'
, './media/test-no-arrow.png',
{

    block: {width: 140, height: 40},
    delta: {width: 100, height: 80},
    offset: {x: 20, y: 40},
    displayType: 'text',
    colors: {
        block: 'rgba(0, 0, 0, 255)',
        line: 'rgba(0, 0, 0, 255)',
        font: 'rgba(0, 0, 0, 255)',
        background: 'rgba(0, 0, 0, 0)'
    },
    font: '30px Impact',
});
