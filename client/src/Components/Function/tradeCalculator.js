/**
 * 거래기록을 계산해주는 함수입니다
 * @author 이중원
 * @param {Array} data 계산할 데이터
 */
const tradeCalculator = (data = []) => {
    let map = new Map();
    for (let i = 0; i < data.length; i++) {
        map.set(data[i].stockCode, []);
    }
    for (let i = 0; i < data.length; i++) {
        map.set(data[i].stockCode, [].concat(map.get(data[i].stockCode), data[i]));
    }

    // 보유수량
    const quantity = (stockCode) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        } else {
            return stock[stock.length - 1].totalStockHoldings;
        }
    };

    // 평단가
    const averageUnitPrice = (stockCode, price) => {
        const stock = map.get(stockCode);
        let count = 0;
        if (stock === undefined || stock.length === 0) {
            return 0;
        } else {
            const total = stock.reduce((accumulator, currentValue) => {
                if (currentValue.tradeType === 'BUY') {
                    count += currentValue.quantity;
                    return accumulator + currentValue.price * currentValue.quantity;
                }
                return accumulator;
            }, 0);
            if (total === 0) return 0;
            return Math.floor(total / count);
        }
    };

    // 매도 평균가
    const averageSellPrice = (stockCode) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        } else {
            let count = 0;
            const total = stock.reduce((accumulator, currentValue) => {
                if (currentValue.tradeType === 'SELL') {
                    count += currentValue.quantity;
                    return accumulator + currentValue.price * currentValue.quantity;
                }
                return accumulator;
            }, 0);

            if (total === 0) return 0;
            return Math.floor(total / count);
        }
    };

    // 매수 수량
    const numberOfBuy = (stockCode) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        }
        const total = stock.reduce((accumulator, currentValue) => {
            if (currentValue.tradeType === 'BUY') {
                return accumulator + currentValue.quantity;
            }
            return accumulator;
        }, 0);

        return total;
    };

    // 매도 수량
    const numberOfSell = (stockCode) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        }
        const total = stock.reduce((accumulator, currentValue) => {
            if (currentValue.tradeType === 'SELL') {
                return accumulator + currentValue.quantity;
            }
            return accumulator;
        }, 0);
        return total;
    };

    // 투자손익
    const incomeStatement = (stockCode, currentPrice) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        }
        const total = stock.reduce((accumulator, currentValue) => {
            if (currentValue.tradeType === 'SELL') {
                return accumulator + currentValue.price * currentValue.quantity;
            }
            if (currentValue.tradeType === 'BUY') {
                return accumulator - currentValue.price * currentValue.quantity;
            }
            return null;
        }, 0);
        let currentHoldings = stock[stock.length - 1].totalStockHoldings;
        return total + currentPrice * currentHoldings;
    };

    // 보유 주식 총 가격
    const totalStockPrice = () => {
        if (data === undefined || data.length === 0) {
            return 0;
        }
        let total = 0;
        for (let item of map) {
            total += item[1].reduce((accumulator, currentValue, currentIndex, arr) => {
                if (arr.length - 1 === currentIndex) {
                    accumulator += currentValue.price * currentValue.totalStockHoldings;
                }
                return accumulator;
            }, 0);
        }
        return total;
    };

    // 손익
    const totalEstimatedAssets = () => {
        if (data === undefined || data.length === 0) {
            return 0;
        }
        let total = 0;
        for (let item of map) {
            total += item[1].reduce((accumulator, currentValue, currentIndex, arr) => {
                if (arr.length - 1 === currentIndex) {
                    accumulator += currentValue.price * currentValue.totalStockHoldings;
                }
                if (currentValue.tradeType === 'SELL') {
                    return accumulator + currentValue.price * currentValue.quantity;
                }
                if (currentValue.tradeType === 'BUY') {
                    return accumulator - currentValue.price * currentValue.quantity;
                }
            }, 0);
        }
        return total;
    };

    const holdingStock = () => {
        let price = [];
        let stockName = [];
        if (data === undefined || data.length === 0) {
            return { price, stockName };
        }
        for (let item of map) {
            let last = item[1][item[1].length - 1];
            price.push(last.price * last.totalStockHoldings);
            stockName.push(last.stockName);
        }
        return { price, stockName };
    };

    const history = () => {
        // 예수금
        let money = 10000000;
        let moneyHistory = [];

        //보유주식
        let holdingStockPrice = [];
        // 손익
        let incomeStatement = [];

        if (data === undefined || data.length === 0) {
            return { moneyHistory, holdingStockPrice, incomeStatement };
        }
        // 주식 가격 기록
        let stockPrice = new Map();
        for (let i = 0; i < data.length; i++) {
            stockPrice.set(data[i].stockCode, 0);
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].tradeType === 'BUY') {
                money -= data[i].price * data[i].quantity;
                moneyHistory.push(money);
                stockPrice.set(data[i].stockCode, data[i].price * data[i].totalStockHoldings);
                let totalStockPrice = 0;
                for (let item of stockPrice) {
                    totalStockPrice += item[1];
                }
                holdingStockPrice.push(totalStockPrice);
                incomeStatement.push(money + totalStockPrice - 10000000);
            } else if (data[i].tradeType === 'SELL') {
                money += data[i].price * data[i].quantity;
                moneyHistory.push(money);
                stockPrice.set(data[i].stockCode, data[i].price * data[i].totalStockHoldings);
                let totalStockPrice = 0;
                for (let item of stockPrice) {
                    totalStockPrice += item[1];
                }
                holdingStockPrice.push(totalStockPrice);
                incomeStatement.push(money + totalStockPrice - 10000000);
            }
        }

        return { moneyHistory, holdingStockPrice, incomeStatement };
    };

    return {
        quantity,
        averageUnitPrice,
        averageSellPrice,
        numberOfBuy,
        numberOfSell,
        incomeStatement,
        totalStockPrice,
        totalEstimatedAssets,
        holdingStock,
        history,
    };
};

export default tradeCalculator;
