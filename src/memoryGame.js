class MemoryGame {
    constructor({screen}) {
        this.screen = screen;

        this.initialCards = [
            {
                imgPath : './resources/img/harry-potter.jpg',
                name : 'Harry Potter'
            },
            {
                imgPath : './resources/img/ginny.jpg',
                name : 'Ginny'
            },
            {
                imgPath : './resources/img/hagrid.jpg',
                name : 'Hagrid'
            },
            {
                imgPath : './resources/img/severus.jpg',
                name : 'Severus'
            },
            {
                imgPath : './resources/img/luna.jpg',
                name : 'Severus'
            }, 
            {
                imgPath : './resources/img/fred-and-george-weasley.jpg',
                name : 'Severus'
            },                         
    
        ]

        this.defaultCard = './resources/img/hp-logo-1.jpg'
        this.hiddenCards = []
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
        setTimeout(() => {
            this.hideCards(copies)
        }, 2000);        
    }

    hideCards(cards){
        const hiddenCards = cards.map( ({name, id}) => ({
            id,
            name,
            imgPath : this.defaultCard
        }))

        this.screen.renderHTMLCardsContent(hiddenCards)
        this.hiddenCards = hiddenCards;
    }

    play(){
        this.shuffle();
    }
}