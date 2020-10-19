import React from "react";
import ReactDOM from 'react-dom'
import {createHashHistory} from 'history'
export default function (opt ={}) {
    let history = opt.history || createHashHistory()
    let app = {
        _models:[], // 存放所有的模型
        model,
        _router:null,
        router,
        start
    }
    function model(m){
        app._models.push(m)

    }
    function router(router) {
        app._router = router;

    }
    function start() {

    }

}

