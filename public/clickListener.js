export default function createClickListener(document){
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }
    
    document.addEventListener('click', handleClick)

    function handleClick(event) {
        var cardTarget = event.target

        if (cardTarget.nodeName == "P" || cardTarget.nodeName == "I") {
            if(cardTarget.nodeName == "I") {
                cardTarget = cardTarget.parentElement
            }
            cardTarget = cardTarget.parentElement
        }

        if(cardTarget.className != 'my-card front') {return}

        const cardSymbol = cardTarget.children[0].children[0].innerHTML
        const cardNumber = cardTarget.children[1].innerHTML

        const command = {
            type: 'play-card',
            playerId: state.playerId,
            cardSymbol,
            cardNumber,
        }

        notifyAll(command)
    }

    return {
        subscribe,
        registerPlayerId
    }
}