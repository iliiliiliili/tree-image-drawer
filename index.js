
// eslint-disable-next-line no-unused-vars
const {createCanvas, loadImage, Context2d} = require ('canvas');
const fs = require ('fs');


const saveCanvas = (canvas, fileName) => new Promise (resolve => {

    const out = fs.createWriteStream (fileName);
    const stream = canvas.createPNGStream ();
    stream.pipe (out);

    out.on ('finish', resolve);
});

/**
 * @typedef {{x: number, y: number}} Position
 * @typedef {{children: Array<TreeNode>, display: string}} TreeNode
 *
 * @typedef {{block: {width: number, height: number},
 *      delta: {width: number, height: number},
 *      offset: {x: number, y: number},
 *      displayType: 'text' | 'image',
 *      colors: {block: string, line: string, font: string, background: string},
 *      font: string}} Options
 */

/** @type {Options} */
const defaultOptions = {

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
};

/** @type {Array<{node: TreeNode, position: Position}>} */
let positions = [];
const bounds = {x: 0, y: 0};
let xOffset;

/**
 * @template T
 * @param {T} root
 * @param {function (T): Array<T>} getChildren
 * @param {Options} options
 */
const getPositions = (root, getChildren, options) => {

    /**
     * @param {T} node
     * @param {number} y
     * @returns {boolean} true if position was computed if first time
     */
    const setNodePosition = (node, y) => {
        
        const savedPosition = positions.find (val => val.node === node);

        if (savedPosition !== undefined) {

            if (y > savedPosition.position.y) {

                savedPosition.position.y = y;
                bounds.y = Math.max (bounds.y, y + options.block.height);

                getChildren (node).forEach (child =>
                    setNodePosition (child, y + options.delta.height + options.block.height));
                
                return true;
            }

            return false;
        }

        bounds.y = Math.max (bounds.y, y + options.block.height);

        const lastXOffset = xOffset;
        let computedChildren = 0;

        getChildren (node).forEach (child => {

            const isComputed = setNodePosition (child, y + options.delta.height + options.block.height);

            if (isComputed) {
          
                xOffset += options.delta.width + options.block.width;
                computedChildren ++;
            }
        });

        if (computedChildren > 0) {

            xOffset -= options.delta.width + options.block.width;
        }

        bounds.x = Math.max (bounds.x, xOffset + options.block.width);

        const resultPosition = {x: (lastXOffset + xOffset) / 2, y};

        positions.push ({node, position: resultPosition});

        return true;
    };

    setNodePosition (root, options.offset.y);

    xOffset += options.delta.width + options.block.width;
};

/**
 * @template T
 * @param {T} root
 * @param {function (T): Array<T>} getChildren
 * @param {function (T): string} getDisplay
 * @param {Context2d} context
 * @param {Options} options
 */
const drawNodes = (root, getChildren, getDisplay, context, options) => {

    /** @type {Array<T>} */
    const drawed = [];

    /**
     * @param {T} node
     */
    const drawNode = (node) => {

        if (drawed.includes (node)) {

            return;
        }

        drawed.push (node);

        const {position} = positions.find (val => val.node === node);
        
        context.font = options.font;
        context.textAlign = 'center';
        context.fillStyle = options.colors.font;
        context.fillText (getDisplay (node), position.x + options.block.width / 2
            , position.y + options.block.height * 3 / 4);
            
        context.strokeStyle = options.colors.block;
        context.strokeRect (position.x, position.y, options.block.width, options.block.height);

        getChildren (node).forEach (child => {

            const {position: childPosition} = positions.find (val => val.node === child);

            context.strokeStyle = options.colors.line;
            context.beginPath ();
            context.moveTo (position.x + options.block.width / 2, position.y + options.block.height);
            context.lineTo (childPosition.x + options.block.width / 2, childPosition.y);
            context.stroke ();

            drawNode (child);
        });
        
    };

    drawNode (root);
};

/**
 * @template T
 * @param {Array<T>} roots
 * @param {function (T): Array<T>} getChildren
 * @param {function (T): string} getDisplay
 * @param {string} savePath
 * @param {Options} options
 * @returns {Promise}
 */
const drawAsTree = (roots, getChildren, getDisplay, savePath, options = defaultOptions) => {

    positions = [];
    bounds.x = 0;
    bounds.y = 0;
    xOffset = options.offset.x;

    roots.forEach ((root) => getPositions (root, getChildren, options));

    bounds.x += options.offset.x;
    bounds.y += options.offset.y;

    const canvas = createCanvas (bounds.x, bounds.y);
    const context = canvas.getContext ('2d');

    context.fillStyle = options.colors.background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    roots.forEach ((root) => drawNodes (root, getChildren, getDisplay, context, options));

    return saveCanvas (canvas, savePath);
};

/**
 * @param {Array <TreeNode>} roots
 * @param {string} savePath
 * @param {Options} options
 * @returns {Promise} on file saved
 */
const drawTree = (roots, savePath, options = defaultOptions) =>
    drawAsTree (roots, (node) => node.children
        , (node) => node.display, savePath, options);

module.exports = {

    drawTree,
    drawAsTree,
};
