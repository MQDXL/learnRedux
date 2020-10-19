const hasSymbol = typeof Symbol === 'function' && Symbol.for;
const REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;

function createElement(type, config, children) {
    let props = {}
    for (let key in config) {
        props[key] = config[key]
    }
    const childrenLength = arguments.length - 2;
    // 只有一个儿子 props.children是一个对象 ，也就是一个ReactNode
    if (childrenLength == 1) {
        props.children = children;

        // 儿子数大于一，把所有儿子放在一个数组中， props.children是一个对象 ，也就是一个ReactNode
    } else if (childrenLength > 1) {
        props.children = Array.prototype.slice.call(arguments, 2);
    }
    return {
        // 表示这是一个React元素类型
        $$typeof: REACT_ELEMENT_TYPE, type, props
    }
    /*
    * REACT_ELEMENT_TYPE：表示这是一个React元素
    * type：React元素类型 string（h1,h2），fragment, Function Class
    * */
}
class Component {
    constructor(props) {
        this.props = props;
    }
    static isReactComponent = {}
}

export default {
    createElement,
    Component
}
