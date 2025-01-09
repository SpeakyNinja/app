export default class ToolsService {
    shuffle(items) { 
        for(let i = items.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [items[i], items[j]] = [items[j], items[i]]; 
        }

        return items;
    }

    playAudio(voice) {
        if(voice) {
            try {
                this.audio?.pause();
                this.audio = new Audio(`data:audio/mpeg;base64,${voice}`);
                this.audio.play();
            } catch(e) {
            }
        }
    }

    getNextItem(items) {
        if(this.nextItemIndex === undefined || this.nextItemIndex == items.length - 1) {
            this.nextItemIndex = 0;
        } else {
            this.nextItemIndex++;
        }

        return items[this.nextItemIndex];
    }

    getAccuracyClass(accuracy) {
        let level = 5;
        if(accuracy == 100) {
            level = 1;
        } else if(accuracy >= 95) {
            level = 2;
        } else if(accuracy >= 90) {
            level = 3;
        } else if(accuracy >= 85) {
            level = 4;
        }

        return `accuracy-${level}`;
    }

    plural(n, forms) { // forms = ['минута', 'минуты', 'минут']
        n = Math.abs(n) % 100;
        const n1 = n % 10;
        let i = 2;

        if(n > 9 && n < 21) {
            return forms[i];
        }
        
        if (n1 > 1 && n1 < 5) {
            i = 1;
        }

        if (n1 == 1) {
            i = 0;
        }
        
        return forms[i];
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
}