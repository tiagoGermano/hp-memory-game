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
            <div class="col-3" style="padding:5px">
                <div class="card mg-card" style="cursor:pointer;" onclick="window.checkCards('${item.id}')">
                    <img src="${item.imgPath}" id="${item.id}" name="${item.name}" class="card-img-top">
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
        window.checkCards = onclick
    }

    static showCards(cardName, imgPath){
        const cardElements = document.getElementsByName(cardName);
        cardElements.forEach( card => (card.src = imgPath))
    }

    static updateCardImage(cardId, imgPath){
        const cardElement = document.getElementById(cardId)
        cardElement.src = imgPath
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

    static startCounter(){
        let countAt = 3
        const elementText = document.getElementById(ID_SPINNER_COUNTER)

        const identifyText = "$$counter"
        const defaultText = `Starting in ${identifyText} seconds...`

        const updateText = () =>
        (elementText.innerHTML = defaultText.replace(identifyText, countAt--))

        updateText()
        const intervalId = setInterval(updateText, 1000)
        return intervalId;
        
    }

    static stopCounter(intervalId){
        clearInterval(intervalId)
        document.getElementById(ID_SPINNER_COUNTER).innerHTML = ""
    }
}
