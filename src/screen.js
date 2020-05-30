const ID_CARDS_SECTION = "cardsSection"
const ID_BTN_PLAY = "bntPlay"

class Screen {

    static buildHtmlCardContent(item){
        return `
            <div class="col-md-3">
                <div class="card mg-card" style="cursor:pointer; width: 50%" onclick="window.checkCards('${item.id}', '${item.name}')">
                    <img src="${item.imgPath}" name="${item.name}" class="card-img-top" alt="...">
                </div>
            </div>
            <br/>
        `
    }

    static changeHtmlCardContent(contentHTML){
        const content = document.getElementById(ID_CARDS_SECTION)
        content.innerHTML = contentHTML;
    }

    static buildHTMLCardsContent(itens){
        return itens.map(Screen.buildHtmlCardContent).join('');
    }

    static renderHTMLCardsContent(itens){
        const content = Screen.buildHTMLCardsContent(itens);
        Screen.changeHtmlCardContent(content);
    }

    static configurePlayButton(onclickFunction){
        const btnPlay = document.getElementById(ID_BTN_PLAY)
        btnPlay.onclick = onclickFunction;
    }

    static configureCardOnclick(onclick){
        window.checkCards = onclick;
    }

    static showCard(cardName, imgPath){
        const cardElements = document.getElementsByName(cardName);
        cardElements.forEach( card => (card.src = imgPath))
    }
}
