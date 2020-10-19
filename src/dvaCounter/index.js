import React from "react";
import dva,{connect} from "dva"
// 默认是hash 路由,可以这样改成history路由
import {createBrowserHistory} from 'history'

let app = dva({
    history:createBrowserHistory()
});
app.model({
    namespace:'counter',
    state:{number:0},
    reducers:{
        add(state){
            return{
                number:state.number+1
            }
        }
    }
});
function Counter(props) {
    return(
        <div>
            <p>{props.number}</p>
            <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
        </div>
    )
}
let ConnectedCounter = connect((state)=>state.counter)(Counter);
app.router(()=>{
    return <ConnectedCounter></ConnectedCounter>
})
app.start('#root');
