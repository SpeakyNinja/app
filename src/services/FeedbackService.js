import AbstractService from "@/services/AbstractService.js";

export default class FeedbackService extends AbstractService {
    
    submit(message, meaningId) {
        return this.request('/training/feedback', {message: message, meaningId: meaningId});
    }
}