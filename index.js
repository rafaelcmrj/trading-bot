import Exchange from './exchange';

class TradingBot {

    constructor() {
        this.init();
    }

    init() {
        this.initExchange();
    }

    initExchange() {
        this.exchange = new Exchange();
    }

};

var tradingBot = new TradingBot();