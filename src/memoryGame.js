class MemoryGame {
    constructor({screen}) {
        this.screen = screen;

        this.inicialCards = [
            {
                img : './resources/img/harry-potter.jpg',
                name : 'Harry Potter'
            },
            {
                img : './resources/img/ginny.jpg',
                name : 'Ginny'
            },
            {
                img : './resources/img/hagrid.jpg',
                name : 'Hagrid'
            },
            {
                img : './resources/img/severus.jpg',
                name : 'Severus'
            },                        
    
        ]
    }

    init(){
        this.screen.renderHTMLCardsContent(this.inicialCards);
    }
}