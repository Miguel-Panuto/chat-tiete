const ascendingOrder = (a, b) => {
    // if the next value is minor than the previous, 
    // that will be on the front of him on the front arr position
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else
        return 0;
}

module.exports = ascendingOrder;