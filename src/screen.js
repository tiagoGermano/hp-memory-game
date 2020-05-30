const util = Util

const ID_CARDS_SECTION = "cardsSection"
const ID_BTN_PLAY = "bntPlay"
const ID_MESSAGE_DIALOG = "dialogMessageId";
const ID_SPINNER = "startGameSpinner"
const ID_SPINNER_COUNTER = "startGameCount"
const CLASS_INVISIBLE = "invisible";
const MESSAGES = {
    success : {
        text : 'correct match !',
        class : 'alert-success'
    },
    fail : {
        text : 'fail, try again',
        class : 'alert-danger'        
    }
}

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

    static async showMessage(success = true){
        const element = document.getElementById(ID_MESSAGE_DIALOG);

        if(success){
            element.classList.remove(MESSAGES.fail.class)
            element.classList.add(MESSAGES.success.class)
            element.innerHTML = MESSAGES.success.text

        }else {
            element.classList.remove(MESSAGES.success.class)
            element.classList.add(MESSAGES.fail.class)
            element.innerHTML = MESSAGES.fail.text
        }

        element.classList.remove(CLASS_INVISIBLE)
        await util.timeout(1000);
        element.classList.add(CLASS_INVISIBLE)
    }

    static showSpinner(visible = true){
        const element = document.getElementById(ID_SPINNER)
        
        if(visible){
            element.classList.remove(CLASS_INVISIBLE);
            return;
        } 

        element.classList.add(CLASS_INVISIBLE);
    }
}
