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
            	const audio = new Audio(`data:audio/mpeg;base64,${voice}`);
                audio.play();
            } catch(e) {
            }
        }
    }
}