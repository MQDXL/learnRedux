export function delay(ms) {
    return new Promise(function (resolve,reject) {
        setTimeout(function () {
            resolve("oooook__")
        },ms)
    })
}
