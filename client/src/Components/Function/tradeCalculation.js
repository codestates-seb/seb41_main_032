const tradeCalculation = (data = []) => {
    let map = new Map();
    for (let i = 0; i < data.length; i++) {
        map.set(data[i].stockCode, []);
    }
    for (let i = 0; i < data.length; i++) {
        map.set(data[i].stockCode, [].concat(map.get(data[i].stockCode), data[i]));
    }

    const getQuantity = (stockCode) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        } else {
            return stock[stock.length - 1].totalStockHoldings;
        }
    };

    const getAverageBuyPrice = (stockCode) => {
        const stock = map.get(stockCode);
        if (stock === undefined || stock.length === 0) {
            return 0;
        } else {
            const total = stock.reduce((accumulator, currentValue) => {
                if (currentValue.tradeType === 'BUY') {
                    return accumulator + currentValue.price * currentValue.quantity;
                }
                if (currentValue.tradeType === 'SELL') {
                    return accumulator - currentValue.price * currentValue.quantity;
                }
                return null;
            }, 0);

            if (total === 0) return 0;
            return Math.floor(total / stock[stock.length - 1].totalStockHoldings);
        }
    };

    const getAverageSellPrice = (stockCode) => {
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

    const getNumberOfBuy = (stockCode) => {
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

    const getNumberOfSell = (stockCode) => {
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

    const IncomeStatement = (stockCode, currentPrice) => {
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

    return {
        getQuantity,
        getAverageBuyPrice,
        getAverageSellPrice,
        getNumberOfBuy,
        getNumberOfSell,
        IncomeStatement,
    };
};

export default tradeCalculation;
