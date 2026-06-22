export default class Brain {
    hexagons;
    baseColor;
    fillColors;
    radiusCoeffs;

    constructor(options = {}) {
        this.baseColor = '#525465';
        this.activeOutlineColor = '#525465';
        this.fillColors = {
            in_progress: '#272735',
            knows: '#e6e8fa',
            green: '#76fa3d',
            m0: '#ff1c00',
            m1: '#ff1c00',
            m2: '#ff1c00',
            m3: '#ff1c00',
            m4: '#faff00',
            m5: '#faff00',
            m6: '#faff00',
            m7: '#faff00',
            m8: '#87ff00',
            m9: '#87ff00',
            m10: '#87ff00',
            m11: '#87ff00',
            m12: '#87ff00',
            m13: '#88f1ff',
            m20: '#ffffff'
        };

        this.radiusCoeffs = {
            m0: 0,
            m1: 0.1,
            m2: 0.2,
            m3: 0.3,
            m4: 0.3,
            m5: 0.4,
            m6: 0.5,
            m7: 0.6,
            m8: 0.6,
            m9: 0.7,
            m10: 0.8,
            m11: 0.85
        };

        if (options.baseColor) {
            this.baseColor = options.baseColor;
        }
        if (options.activeOutlineColor) {
            this.activeOutlineColor = options.activeOutlineColor;
        }
        if (options.fillColors) {
            this.fillColors = { ...this.fillColors, ...options.fillColors };
        }

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
        if(hex.status == 'in_progress') {
            fillColor = this.fillColors.in_progress;
            outlineColor = this.activeOutlineColor;
        } else if(hex.status == 'knows') {
            fillColor = this.fillColors.knows;
            outlineColor = this.baseColor;
        } else if(hex.status == 'green') {
            fillColor = this.fillColors.green;
            outlineColor = this.baseColor;
        } else if(/^m\d+$/.test(hex.status)) {
            fillColor = this.fillColors[hex.status];
            outlineColor = this.baseColor;
        }

        const radiusCoeff = this.radiusCoeffs[hex.status] !== undefined ? this.radiusCoeffs[hex.status] : 1;

        return {
            fillColor: fillColor, 
            outlineColor: outlineColor, 
            sides: hex.sides || [],
            radiusCoeff: radiusCoeff
        };
    }

    addWord(status) {
        const pendingItems = [];

        for(let y in this.hexagons) {
            const row = this.hexagons[y];
            for (let x in row) {
                const item = row[x];
                if (item.status === 'pending') {
                    item.x = parseInt(x);
                    item.y = parseInt(y);
                    pendingItems.push(item);
                }
            }
        }

        if(pendingItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * pendingItems.length);
            const randomItem = pendingItems[randomIndex];
            randomItem.status = status;
            return randomItem;
        }

        return null;
    }

    fillAll(items) {
        let i = 0;
        this.hexagons.forEach(row => {
            row.forEach(item => {
                if(item.isEmpty) {
                    return false;
                }

                if(items[i] !== undefined) {
                    item.status = items[i];
                }

                i++;
            });
        });
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
                { status: 'pending', sides: [1,2] },
                { isEmpty: true },
                { status: 'pending', sides: [0,1] },
                { status: 'pending', sides: [0,4,5] },
                { isEmpty: true }
            ], [
                { status: 'pending' },
                { status: 'pending', sides: [0] },
                { status: 'pending', sides: [5] },
                { status: 'pending', sides: [3] },
                { status: 'pending', sides: [2] },
                { status: 'pending' },
            ], [
                { isEmpty: true },
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending' },
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
                { status: 'pending' },
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
                { status: 'pending' },
                { status: 'pending', sides: [0] },
                { status: 'pending', sides: [0,1,5] },
                { status: 'pending', sides: [0,5] }
            ], [
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending', sides: [0] },
                { status: 'pending', sides: [2] },
                { status: 'pending' },
                { status: 'pending' },
            ], [
                { status: 'pending', sides: [1,2,3] },
                { status: 'pending', sides: [1] },
                { status: 'pending', sides: [3,4] },
                { status: 'pending' },
                { status: 'pending', sides: [4,5] },
                { status: 'pending', sides: [1] },
                { status: 'pending', sides: [0,1,5] }
            ], [
                { status: 'pending', sides: [0,1] },
                { status: 'pending', sides: [2] },
                { status: 'pending', sides: [0,5] },
                { status: 'pending', sides: [2,3] },
                { status: 'pending', sides: [0] },
                { status: 'pending', sides: [1,2] },
            ], [
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending' },
                { status: 'pending' },
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
                { status: 'pending' },
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