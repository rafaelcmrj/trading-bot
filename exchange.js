import Poloniex from './poloniex';
import Utils from './utils';
import Algorithm from './algorithm';
import * as Constants from './constants';

export default class Exchange {

    constructor() {
        this.init();
    }

    init() {
        this.initEvents();
        this.initExchange();
        this.initAlgorithm();
    }

    initEvents(){
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_INITIED, (name) => { this.onExchangeInitied(name); });
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_CONNECTED, (session) => { this.onExchangeConnected(session); });
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_TICKER_UPDATE, (ticker) => { this.onExchangeTickerUpdate(ticker); });
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_GET_BALANCES, (balances) => { this.onExchangeGetBalances(balances); });
        Utils.event.on(Constants.EVENT_TYPE_EXCHANGE_RETURN_CHART_DATA, (data) => { this.onExchangeReturnChartData(data); });
    }

    initExchange() {
        this.exchange = new Poloniex();
    }

    initAlgorithm() {
        this.algorithm = new Algorithm();
    }

    onExchangeInitied(name) {
        let message = name + ' API initiated';
        Utils.log(message);
    }

    onExchangeConnected(session) {
        //this.exchange.getBalances();
        //this.exchange.subscribe(session, 'ticker');
        this.exchange.returnChartData();
    }

    onExchangeTickerUpdate(ticker) {
        let serializedTicker = this.exchange.serializeTickerUpdate(ticker);
        this.algorithm.onTickerUpdate(serializedTicker);
    }

    onExchangeGetBalances(balances) {
        this.algorithm.setBTCBalance(balances.BTC);

        this.algorithm.start();
    }

    onExchangeReturnChartData(data) {
        this.algorithm.setChartData(data);
    }
}