class MemoryGame {
    constructor({screen, util}) {
        this.screen = screen;
        this.util = util;

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

    async shuffle(){
        const copies = this.initialCards
            .concat(this.initialCards)
                .map(item => {
                    return Object.assign({}, item, { id : Math.random() / 0.5})
                })
                    .sort(() => Math.random() - 0.5)

        
        this.screen.renderHTMLCardsContent(copies)
        this.screen.showSpinner()
        await this.util.timeout(2000)
        this.hideCards(copies)
        this.screen.showSpinner(false)
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
                        this.showCards(card.name);
                        this.screen.showMessage();
                        return
                    } 
                  
                    return
                }
                
                this.selectedCards = [];
                this.screen.showMessage(false);
        }

    }


    showCards(cardName){
        const {imgPath} = this.initialCards.find(({name}) => cardName === name)
        this.screen.showCard(cardName, imgPath)
    }

    play(){
        this.shuffle();
    }
}