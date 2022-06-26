export const allTransactions = (address, key) => {
    return (`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=13024456&endblock=999999999&page=1&offset=100&sort=asc&apikey=` + key);
}

export const gasOracle = (key) => {
    return `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${key}`
}

export const ether2Supply = (key) => {
    return `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${key}`
}

export const etherNodeSize = (key) => {
    return `https://api.etherscan.io/api?module=stats&action=chainsize&startdate=2019-02-01&enddate=2019-02-28&clienttype=geth&syncmode=default&sort=asc&apikey=${key}`
}