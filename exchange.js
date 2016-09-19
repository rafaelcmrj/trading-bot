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
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_INITIED, this.onExchangeInitied);
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_CONNECTED, this.onExchangeConnected);
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_TICKER_UPDATE, this.onExchangeTickerUpdate);
    }

    initExchange() {
        this.exchange = new Poloniex();
    }

    onExchangeInitied() {
        console.log('exchange initied');
    }

    onExchangeConnected(session, emitter) {
        emitter.subscribe(session, 'ticker');
    }

    onExchangeTickerUpdate(ticker) {
        console.log(ticker);
    }

}