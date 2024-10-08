import AbstractService from "@/services/AbstractService.js";

export default class AbstractModel extends AbstractService {
    constructor(attributes = {}) {
        super();
        this.setProperties(attributes);
    }

    setProperties(attributes) {
        for(let key in attributes) {
            this[key] = attributes[key];
        }
    }

    getProperties() {
        const keys = Object.getOwnPropertyNames(this);
        const props = {};
        keys.forEach(key => {
            props[key] = this[key];
        });
        return props;
    }

    isNew() {
        return !this.id;
    }

    getDataForSave() {
        let data = {};
        Object.getOwnPropertyNames(this).forEach((val, idx, array) => {
            data[val] = this[val];
        });

        return data;
    }
}