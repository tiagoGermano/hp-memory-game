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
                name : 'Ginny Weasley'
            },
            {
                imgPath : './resources/img/hagrid.jpg',
                name : 'Rubeus Hagrid'
            },
            {
                imgPath : './resources/img/severus.jpg',
                name : 'Severus Snape'
            },
            {
                imgPath : './resources/img/luna.jpg',
                name : 'Luna Lovegood'
            }, 
            {
                imgPath : './resources/img/fred-and-george-weasley.jpg',
                name : 'Fred and George Weasley'
            },                         
    
        ]

        this.defaultCard = './resources/img/hp-logo-1.jpg'
        this.hiddenCards = []
        this.selectedCards = []
    }

    init(){
        this.screen.renderHTMLCardsContent(this.initialCards)
        this.screen.configurePlayButton(this.play.bind(this))
        this.screen.configureCardOnclick(this.checkCards.bind(this));
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

    checkCards(id, name){
        const card = {id, name};
        const countOfSelectedCards = this.selectedCards.length

        switch (countOfSelectedCards) {
            case 0:
                this.selectedCards.push(card)
                break;
        
            case 1:
                const [firstCard] = this.selectedCards;

                if(firstCard.name === card.name){

                    if(firstCard.id !== card.id){
                        this.selectedCards = [];
                        alert(`card match !!! ${card.name}`)
                        return
                    } 
                  
                    return
                }
                
                this.selectedCards = [];
                alert('sorry, try again.')
        }

    }

    play(){
        this.shuffle();
    }
}