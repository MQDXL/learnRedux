export default function createSagaMiddleware() {
    // 返回一个中间件
    function sagaMiddleware({dispatch, getSate}) {
        function run(generator) {
            // 就开始自动执行这个generator
            console.log('自动执行generator！');
            let it = generator()

            function next(nextValue) {
                let {value: effect, done} = it.next(nextValue)
                if (!done) {
                    switch (effect.type) {
                        case "TAKE": // take 监听某一个动作，当动作发生的时候执行下一步
                            break;
                        case "PUT": // 直接向仓库派发动作
                            dispatch(effect.action);
                            next();
                            break;
                        default:
                            break

                    }

                }
            }

            next();
        }
        sagaMiddleware.run = run


        return function (next) {
            return function (action) {
                //
                next(action)
            }

        }
    }
    return sagaMiddleware
}
