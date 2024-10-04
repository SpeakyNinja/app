export default class Brain {
    hexagons;
    baseColor;
    fillColors;

    constructor() {
        this.baseColor = '#525465';
        this.fillColors = {
            active: '#e6e8fa',
            ready: '#385ad7'
        };
        this.makeHexagons();
    }

    getHexagons() {
        const items = [];

        this.hexagons.forEach(row => {
            const rowItems = [];
            row.forEach(hex => {
                const item = this.mapHexData(hex);
                rowItems.push(item);
            });

            items.push(rowItems);
        });

        return items;
    }

    mapHexData(hex) {
        let fillColor = 'transparent';
        let outlineColor = 'transparent';
        if(hex.status == 'active') {
            fillColor = this.fillColors.active;
            outlineColor = this.baseColor;
        } else if(hex.status == 'ready') {
            fillColor = this.fillColors.ready;
            outlineColor = this.baseColor;
        }

        return {fillColor: fillColor, outlineColor: outlineColor, sides: hex.sides || []};
    }

    makeHexagons() {
    	this.hexagons = [
            [
                { isEmpty: true },
                { isEmpty: true },
                { status: 'pending', sides: [3,4,5] },
                { isEmpty: true},
                { status: 'pending', sides: [3,4,5] },
                { isEmpty: true },
                { isEmpty: true }
            ], [
                { isEmpty: true },
                { status: 'pending', sides: [3,4] },
                { status: 'pending', sides: [0,4,5] },
                { status: 'pending', sides: [2,3,4] },
                { status: 'pending', sides: [4,5] },
                { isEmpty: true },
            ], [
                { isEmpty: true },
                { status: 'pending', sides: [2,3,4] },
                { status: 'active', sides: [1,2] },
                { isEmpty: true },
                { status: 'pending', sides: [0,1] },
                { status: 'pending', sides: [0,4,5] },
                { isEmpty: true }
            ], [
                { isEmpty: true },
                { status: 'pending', sides: [0] },
                { status: 'pending', sides: [5] },
                { status: 'pending', sides: [3] },
                { status: 'pending', sides: [2] },
                { isEmpty: true },
            ], [
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending' },
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending' },
                { isEmpty: true }
            ], [
                { status: 'pending', sides: [3,4,5] },
                { status: 'pending' },
                { status: 'pending', sides: [0,1,2] },
                { status: 'pending', sides: [0,1,2] },
                { status: 'pending' },
                { status: 'pending', sides: [3,4,5] },
            ], [
                { status: 'pending', sides: [2,3,4] },
                { status: 'pending', sides: [0,4,5] },
                { status: 'pending' },
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending', sides: [2,3,4] },
                { status: 'pending', sides: [0,4,5] }
            ], [
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending', sides: [0,5] },
                { status: 'pending', sides: [2,3] },
                { status: 'pending' },
                { status: 'pending' },
            ], [
                { status: 'pending', sides: [2,3] },
                { status: 'pending', sides: [1,2,3] },
                { status: 'pending', sides: [2] },
                { isEmpty: true },
                { status: 'pending', sides: [0] },
                { status: 'pending', sides: [0,1,5] },
                { status: 'pending', sides: [0,5] }
            ], [
                { status: 'ready' },
                { status: 'pending' },
                { status: 'active', sides: [0] },
                { status: 'pending', sides: [2] },
                { status: 'pending' },
                { status: 'pending' },
            ], [
                { status: 'pending', sides: [1,2,3] },
                { status: 'pending', sides: [1] },
                { status: 'pending', sides: [3,4] },
                { isEmpty: true },
                { status: 'pending', sides: [4,5] },
                { status: 'pending', sides: [1] },
                { status: 'pending', sides: [0,1,5] }
            ], [
                { status: 'pending', sides: [0,1] },
                { status: 'pending', sides: [2] },
                { status: 'pending', sides: [0,5] },
                { status: 'pending', sides: [2,3] },
                { status: 'active', sides: [0] },
                { status: 'pending', sides: [1,2] },
            ], [
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending' },
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending' },
                { isEmpty: true }
            ], [
                { status: 'pending', sides: [2,3] },
                { status: 'pending' },
                { status: 'pending', sides: [5] },
                { status: 'pending', sides: [3] },
                { status: 'pending' },
                { status: 'pending', sides: [0,5] },
            ], [
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending', sides: [3,4] },
                { isEmpty: true },
                { status: 'pending', sides: [4,5] },
                { status: 'pending' },
                { isEmpty: true }
            ], [
                { status: 'pending', sides: [1,2,3] },
                { status: 'pending', sides: [1,2] },
                { status: 'pending', sides: [0,5] },
                { status: 'pending', sides: [2,3] },
                { status: 'pending', sides: [0,1] },
                { status: 'pending', sides: [0,1,5] },
            ], [
                { isEmpty: true },
                { status: 'pending', sides: [0,2] },
                { status: 'pending' },
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending', sides: [0,2] },
                { isEmpty: true }
            ], [
                { isEmpty: true },
                { status: 'pending', sides: [1,2] },
                { status: 'pending', sides: [0,1,5] },
                { status: 'pending', sides: [1,2,3] },
                { status: 'pending', sides: [0,1] },
                { isEmpty: true },
            ], [
                { isEmpty: true },
                { isEmpty: true },
                { status: 'pending', sides: [0,1,2] },
                { isEmpty: true },
                { status: 'pending', sides: [0,1,2] },
                { isEmpty: true },
                { isEmpty: true }
            ]
        ];
    }
}