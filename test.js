let x = 10;

function fn1(x) {
    return x + 1
}

function fn2(x) {
    return x + 2
}

function fn3(x) {
    return x + 3
}

function fn4(x) {
    return x + 4
}
function fn5() {
    return x + 5
}

function compose(...funcs) {
    // loop1：a = fn1 b = fn2 (a, b) => (...args) => a(b(...args))
    // loop2：a = function (...args) {
    //             return a(b(...args))
    //         }
    //         b = fn3
    return funcs.reduce(function (a, b) {
        return function (...args) {
            return a(b(...args))
        }
    })
}

let fn = compose(fn1, fn2, fn3, fn4,fn5)
console.log(fn + 'fn___');

