import moment from 'moment-timezone';

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

    days(seconds) {
        const days = Math.floor(seconds / 86400);
        return days > 0 ? days : 0;
    }

    hours(seconds) {
        const hours = Math.floor((seconds % 86400) / 3600);
        return hours > 0 ? hours : 0;
    }

    minutes(seconds) {
        const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
        return minutes > 0 ? minutes : 0;
    }

    seconds(seconds) {
        const sec = ((seconds % 86400) % 3600) % 60;
        return sec > 0 ? sec : 0;
    }

    getLocalDate(serverDateString) {
        const appTimezone = localStorage.getItem('appTimezone') || 'UTC';
        const serverMoment = moment.tz(serverDateString, appTimezone);
        const localMoment = serverMoment.local();
        return localMoment;
    }

    getServerDate(dateString = null) {
        const appTimezone = localStorage.getItem('appTimezone') || 'UTC';
        const localMoment = dateString ? moment(dateString) : moment();
        const serverMoment = localMoment.tz(appTimezone);
        return serverMoment;
    }

    getOs() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            return "windows-phone";
        }

        if (/android/i.test(userAgent)) {
            return "android";
        }

        const iosWords = [
            'iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'
        ];
        if(iosWords.includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
            return "ios";
        }

        return "unknown";
    }
}