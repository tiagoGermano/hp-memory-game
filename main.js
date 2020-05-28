function onLoad(){
    
    const dependecies = {
        screen : Screen
    }

    const memoryGame = new MemoryGame(dependecies)
    memoryGame.init()
}

window.onload = onLoad
