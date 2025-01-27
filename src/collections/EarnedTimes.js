import AbstractCollection from '@/collections/AbstractCollection.js';
import EarnedTime from '@/models/EarnedTime.js';
import moment from 'moment';

export default class EarnedTimes extends AbstractCollection {
    constructor(items = []) {
        super(items);
    }

    getObject() {
        return new EarnedTime();
    }

    // формат ответа:  [{date: '2021-01-01', sumTime: 1000}, {date: '2021-01-02', sumTime: 2000}]
    mapByDays(dateFrom, days) {
        let result = [];
        let date = moment(dateFrom);
        for(let i = 0; i < days; i++) {
            let sumTime = 0;
            this.models.forEach(time => {
                if(moment(time.created_at).isSame(date, 'day')) {
                    sumTime += time.seconds;
                }
            });
            result.push({date: date.format('YYYY-MM-DD'), sumTime});
            date.add(1, 'day');
        }
        return result;
    }

    getMaxSumTime(dateFrom, days) {
        let max = 0;
        const map = this.mapByDays(dateFrom, days);
        map.forEach(item => {
            if(item.sumTime > max) {
                max = item.sumTime;
            }
        });

        return max;
    }

    sumSeconds(dateFrom, days) {
        let sum = 0;
        const map = this.mapByDays(dateFrom, days);
        map.forEach(item => {
            sum += item.sumTime;
        });

        return sum;
    }
}