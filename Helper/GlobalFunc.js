function ExtractNumberWithoutZeroAtEndOfString(txt) {
    try {
        return parseInt(txt.match(/-?\d+$/)[0])
    } catch (e) {
        return 0;
    }
}

function groupBy(list, elemet) {
    return _.groupBy(list, elemet);
}

function selectFirst(list) {
    return _.filter(list, function(num) { return num[0] });
}

function where(list, elemet) {

    return _.where(list, elemet)
}

function any(list) {
    return _.some(list)
}



function ConvertArrayToString(itm, elem1, elem2, split) {
    result = "";
    if (itm != undefined) {
        itm.forEach(function(element) {
            if (elem1 == "") {
                result += element + split;
            } else if (elem2 == "") {
                result += element[elem1] + split

            } else {
                result += element[elem1][elem2] + split
            }
        });

    }
    return result.slice(0, -1);
}

function GetItemCount(itm, elem) {
    var itemCount = 1;
    if (itm) {
        itm.forEach(function(element) {

            itemCount += parseInt(element[elem]) ? parseInt(element[elem]) : 0;
        });
    }

    return itemCount;
}


module.exports = {
    ConvertArrayToString: ConvertArrayToString,
    GetItemCount: GetItemCount,
    ExtractNumberWithoutZeroAtEndOfString: ExtractNumberWithoutZeroAtEndOfString

}