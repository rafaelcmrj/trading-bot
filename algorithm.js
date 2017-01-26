import Talib from 'talib';
import TI from 'technicalindicators';
import Utils from './utils';

export default class Algorithm {

    constructor() {
        this.currencyPair = 'USDT_BTC';
        this.marketData = {};
    }

    onExchangeGetBalances(balances) {
        
    }

    onTickerUpdate(ticker) {
        
    }

    analyzeBestPriceToBuy() {

    }

    analyzeBestPriceToSell() {
        
    }

    setBTCBalance(balance) {
        this.BTCBalance = balance;
    }

    setChartData(data) {
        /* BB */
        var input = {
            period: 14,
            values: [],
            stdDev: 2
        };

        for (let item of data) {
            input.values.push(item.weightedAverage);
        }
        console.log(input);

        console.log(TI.BollingerBands.calculate(input));


        /*
        ADX Talib
        this.marketData = {
            open: [],
            close: [],
            high: [],
            low: [],
            volume: []
        };

        for (let item of data) {
            this.marketData.open.push(item.open);
            this.marketData.close.push(item.close);
            this.marketData.low.push(item.low);
            this.marketData.high.push(item.high);
            this.marketData.volume.push(item.volume);
        }

        this.executeADX();*/
    }

    executeADX() {
        Talib.execute({
            name: 'ADX',
            startIdx: 0,
            endIdx: this.marketData.close.length - 1,
            high: this.marketData.high,
            low: this.marketData.low,
            close: this.marketData.close,
            open: this.marketData.open,
            optInTimePeriod: 900
        }, function(data) {
            console.log(data);
        });
    };

    canStart() {
        if (this.BTCBalance.available > 0) {
            if (this.BTCBalance.onOrders == 0) {
                return true;
            } else {
                Utils.log('You have opened orders, please close these orders before start trading.');
                return false;
            }
        } else {
            Utils.log('You do not have enough BTC balance to trade.');
            return false;
        }
    }

    start() {
        if (this.canStart()) {
            Utils.log('Bot is starting up... Your current balance is ' + this.BTCBalance.available + ' BTC');
        }
    }

}