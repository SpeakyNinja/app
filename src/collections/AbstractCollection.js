import AbstractService from "@/services/AbstractService.js";

export default class AbstractCollection extends AbstractService {
    constructor(items = []) {
        super();
        this.models = [];
        this.reset(items);
    }

    getObject(type = null) {
        // Реализовать в наследниках
    }

    reset(items) {
        this.models = [];
        items.forEach(item => {
            const model = this.getObject();
            model.setProperties(item);
            this.models.push(model);
        });
    }

    add(params) {
        const model = this.getObject();
        model.setProperties(params);
        this.models.push(model);
    }

    remove(model) {
        for(let i in this.models) {
            if(this.models[i].id == model.id) {
                this.models.splice(i, 1);
                break;
            }
        }
    }

    removeById(id) {
        const model = this.findById(id);
        if(model) {
            this.remove(model);
        }
    }

    findById(id) {
        for(let i in this.models) {
            if(this.models[i].id == id) {
                return this.models[i];
            }
        }

        return null;
    }
}