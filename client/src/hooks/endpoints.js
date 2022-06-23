export const allTransactions = (address, key) => {
    return (`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=999999999&page=1&offset=100&sort=asc&apikey=` + key);
}

export const gasOracle = (key) => {
    return `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${key}`
}