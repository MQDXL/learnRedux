import React from "react";
function demo() {
    let element = React.createElement('h1',{id:'wanglu'},
        React.createElement('span',{style:{color:'red',backgroundColor:"yellow"}},'hello'),
        React.createElement('span',{className:"world"},'world')
    );
    console.log(element);
    return element;
}
export default demo;
