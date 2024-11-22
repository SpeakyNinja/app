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
}