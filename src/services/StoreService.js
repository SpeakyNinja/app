import AbstractService from "@/services/AbstractService.js";
import ToolsService from "@/services/ToolsService.js";

export default class StoreService extends AbstractService {
    items;
    campaigns = [];

    fetch() {
        return this.request('/store/get-items', {}, r => {
            this.items = r.items;
            this.campaigns = r.campaigns || [];
        });
    }

    formattedNum(item, field) {
        const value = item[field];
        return new Intl.NumberFormat().format(value);
    }

    getTitle(item) {
        if (item.name && item.product_type && item.product_type !== 'neuron_pack') {
            return item.name;
        }
        if (item.name && !item.qty) {
            return item.name;
        }
        const tools = new ToolsService();
        return tools.plural(item.qty, ['нейрон', 'нейрона', 'нейронов']);
    }

    isNeuronPack(item) {
        return !item.product_type || item.product_type === 'neuron_pack';
    }

    getDiscount(item) {
        return Math.abs( parseInt(item.discount_text) ) || 0;
    }
}