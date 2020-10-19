/**
 *
 * @param node react 节点 可以是React 元素 也可以是数字 字符串
 * @param parent 父容器，他是一个真实的DOM元素
 */

function render(node,parent) {
    // 处理字符串节点
    if(typeof node === 'string'){
        return parent.appendChild(document.createTextNode(node));

    }
    let type,props;
    type = node.type; //h1 原生 Function ClassComponent
    props = node.props;
    // 类组件
    if(type.isReactComponent){
        let element = new type(props).render();
        type = element.type;
        props = element.props;
    }else if(typeof type === 'function'){
        let element = type(props);
        type = element.type;
        props = element.props;

    }
    let docElement = document.createElement(type)// 创建H1 的真实DOM
    for(let propName in props){
        if(propName === 'children'){
            let children = props.children;
            if(!Array.isArray(children)){ //children 可能是一个对象，也可能是一个数组
                children = [children]
            }
            children.forEach(child=>render(child,docElement))
        }else if(propName==='className'){
            docElement.className = props.className;
        }else if(propName === 'style'){ //行内样式
            let styleObj = props.style; //{color:'red',backgroundColor:"yellow"}
            for(let attr in styleObj){
                docElement.style[attr] = styleObj[attr]

            }
        }else {
            //普通属性，例如Id
            docElement.setAttribute(propName,props[propName])
        }
    }
    parent.appendChild(docElement)


}
export default {
    render
}
