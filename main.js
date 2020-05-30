function onLoad(){
    
    const dependecies = {
        screen : Screen,
        util : Util
    }

    const memoryGame = new MemoryGame(dependecies)
    memoryGame.init()
}

window.onload = onLoad
