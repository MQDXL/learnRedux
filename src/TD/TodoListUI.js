import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {Input, Button, Space, List} from 'antd';
import React from "react";
// 无状态组件 没有state 默认值，生命周期的，性能比 class组件好
export default function (props) {
    return(
        <div>
            <Space>
                <div>
                    <Input placeholder={props.inputValue} style={{width: 300}} onChange={props.changeInputValue}
                           value={props.inputValue}/>
                    <Button type="primary" onClick={props.clickBtn}>新增</Button>
                </div>

            </Space>
            <div>
                <List
                    size="small"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={props.data}
                    renderItem={(item, index) => <List.Item
                        onClick={props.deleteItem.bind(this, index)}>{item}</List.Item>}
                />
            </div>
        </div>
    )
}
