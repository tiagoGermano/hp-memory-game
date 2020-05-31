class MemoryGame {
    constructor({screen, util}) {
        this.screen = screen;
        this.util = util;

        this.gameCards = []
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

        this.defaultCard = './resources/img/hp-logo-2.jpg'
        this.hiddenCards = []
        this.selectedCards = []
    }

    init(){
        this.screen.renderHTMLCardsContent(this.initialCards)
        this.screen.configurePlayButton(this.play.bind(this))
        this.screen.configureCardOnclick(this.checkCards.bind(this));
    }

    async shuffle(){
        this.gameCards = this.initialCards
            .concat(this.initialCards)
                .map(item => {
                    return Object.assign({}, item, { id : Math.random() / 0.5, facingUp : false})
                })
                    .sort(() => Math.random() - 0.5)

        
        this.screen.renderHTMLCardsContent(this.gameCards)
        this.hideCards(this.gameCards)
        /*
        this.screen.showSpinner()
        const invervalId = this.screen.startCounter();
        await this.util.timeout(3000)
        this.screen.stopCounter(invervalId);
        this.hideCards(copies)
        this.screen.showSpinner(false)
        */
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

    turnCards(cards){
        cards.forEach((card) => {
            if(card.facingUp){
                this.screen.updateCardImage(card.id, this.defaultCard)
            } else {
                this.screen.updateCardImage(card.id, card.imgPath)
            }
    
            card.facingUp = !card.facingUp
        })
    }

    async checkCards(id){
        const card = this.gameCards.find((c) =>{
            return c.id == id
        })
        
        if(card.facingUp){
            return
        }
        
        
        if(this.selectedCards.length < 2){
            this.selectedCards.push(card)
            this.turnCards([card])
            if(this.selectedCards.length === 2){
                
                await this.util.timeout(1000)
                if(this.cardsMatches(this.selectedCards)){
                    this.screen.showMessage();
                } else {
                    this.screen.showMessage(false);
                    this.turnCards(this.selectedCards)
                }
        
                this.selectedCards = [];
            }

        }
    }

    cardsMatches(cards){
        return cards[0].name === cards[1].name && cards[0].id !== cards[1].id
    }

    play(){
        this.shuffle();
    }
}