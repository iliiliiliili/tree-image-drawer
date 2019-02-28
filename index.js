
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
 *      colors: {block: string, line: string},
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
    },
    font: '30px Impact',
};

/** @type {Array<{node: TreeNode, position: Position}>} */
let positions = [];
const bounds = {x: 0, y: 0};
let xOffset;

/**
 * @param {TreeNode} root
 * @param {Options} options
 */
const getPositions = (root, options) => {

    /**
     * @param {TreeNode} node
     * @param {number} y
     * @returns {boolean} true if position was computed if first time
     */
    const setNodePosition = (node, y) => {
        
        if (positions.find (val => val.node === node) !== undefined) {

            return false;
        }

        bounds.y = Math.max (bounds.y, y + options.block.height);

        const lastXOffset = xOffset;
        let computedChildren = 0;

        node.children.forEach (child => {

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
    bounds.x += options.offset.x;
    bounds.y += options.offset.y;
};

/**
 * @param {TreeNode} root
 * @param {Context2d} context
 * @param {Options} options
 */
const drawNodes = (root, context, options) => {

    /** @type {TreeNode} */
    const drawn = [];

    /**
     * @param {TreeNode} node
     */
    const drawNode = (node) => {

        if (drawn.includes (node)) {

            return;
        }

        drawn.push (node);

        const {position} = positions.find (val => val.node === node);
        
        context.font = options.font;
        context.textAlign = 'center';
        context.fillText (node.display, position.x + options.block.width / 2
            , position.y + options.block.height * 3 / 4);
            
        context.strokeStyle = options.colors.block;
        context.strokeRect (position.x, position.y, options.block.width, options.block.height);

        node.children.forEach (child => {

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
 * @param {Array <TreeNode>} root
 * @param {string} savePath
 * @param {Options} options
 * @returns {Promise} on file saved
 */
const drawTree = (roots, savePath, options = defaultOptions) => {

    positions = [];
    bounds.x = 0;
    bounds.y = 0;
    xOffset = options.offset.x;
    
    roots.forEach ((root) => getPositions (root, options));

    const canvas = createCanvas (bounds.x, bounds.y);
    const context = canvas.getContext ('2d');

    roots.forEach ((root) => drawNodes (root, context, options));

    return saveCanvas (canvas, savePath);
};

module.exports = {

    drawTree,
};
