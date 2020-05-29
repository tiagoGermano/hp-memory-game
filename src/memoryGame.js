class MemoryGame {
    constructor({screen}) {
        this.screen = screen;

        this.initialCards = [
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
            {
                img : './resources/img/luna.jpg',
                name : 'Severus'
            }, 
            {
                img : './resources/img/fred-and-george-weasley.jpg',
                name : 'Severus'
            },                         
    
        ]
    }

    init(){
        this.screen.renderHTMLCardsContent(this.initialCards)
        this.screen.configurePlayButton(this.play.bind(this))
    }

    shuffle(){
        const copies = this.initialCards
            .concat(this.initialCards)
                .map(item => {
                    return Object.assign({}, item, { id : Math.random() / 0.5})
                })
                    .sort(() => Math.random() - 0.5)

        
        this.screen.renderHTMLCardsContent(copies)
    }

    play(){
        this.shuffle();
    }
}