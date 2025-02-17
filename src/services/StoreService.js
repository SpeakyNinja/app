import AbstractService from "@/services/AbstractService.js";
import ToolsService from "@/services/ToolsService.js";

export default class StoreService extends AbstractService {
    items;

    fetch() {
        return this.request('/store/get-items', {}, r => {
            this.items = r.items;
        });
    }

    formattedNum(item, field) {
        const value = item[field];
        return new Intl.NumberFormat().format(value);
    }

    getTitle(item) {
        const tools = new ToolsService();
        return tools.plural(item.qty, ['нейрон', 'нейрона', 'нейронов']);
    }

    getDiscount(item) {
        return Math.abs( parseInt(item.discount_text) );
    }
}