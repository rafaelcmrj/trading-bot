import Poloniex from './poloniex';
import Utils from './utils';
import * as Constants from './constants';

export default class Exchange {

    constructor() {
        this.init();
    }

    init() {
        this.initEvents();
        this.initExchange();
    }

    initEvents(){
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_INITIED, (name) => { this.onExchangeInitied(name); });
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_CONNECTED, (session) => { this.onExchangeConnected(session); });
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_TICKER_UPDATE, (ticker) => { this.onExchangeTickerUpdate(ticker); });
    }

    initExchange() {
        this.exchange = new Poloniex();
    }

    onExchangeInitied(name) {
        let message = name + ' API initiated';
        Utils.log(message);
    }

    onExchangeConnected(session) {
        this.exchange.subscribe(session, 'ticker');
    }

    onExchangeTickerUpdate(ticker) {
        console.log(ticker);
    }

}