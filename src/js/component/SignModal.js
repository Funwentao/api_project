import React,{Component} from 'react';
import {Button,Table,message,Switch,Input} from 'antd';

const Search = Input.Search;

class SignModal extends Component{
    constructor(){
        super();
    }
    render(){
        const columns = [{
            title: '姓名',
            dataIndex: 'name'
        }, {
            title: '学号',
            dataIndex: 'number'
        }, {
            title: '班级',
            dataIndex: 'class'
        },{
            title:'签到',
            dataIndex:'sign'
        },{
            title:'签到时间',
            dataIndex:'time'
        }];
        const data = [{
            key: '1',
            name: 'John Brown',
            number: 32,
            class: '计科1班',
            sign:<Switch/>,
            time:'2018/1/3 5:30'
        },  {
            key: '2',
            name: 'Jim Green',
            number: 42,
            class: '计科1班',
            sign:<Switch/>,
            time:'2018/1/3 5:30'
        }, {
            key: '3',
            name: 'Joe Black',
            number: 32,
            class: '计科1班',
            sign:<Switch/>,
            time:'2018/1/3 5:30'
        }, {
            key: '4',
            name: 'Disabled User',
            number: 99,
            class: '计科1班',
            sign:<Switch/>,
            time:'2018/1/3 5:30'
        }];
        return(
            <div>
                <div className="btn-content">
                    <Button >全部</Button>
                    <Button type='primary'>成功</Button>
                    <Button type='danger'>失败</Button>
                    <Button  type="primary" ghost style={{float:'right'}}>扫描签到</Button>
                    <Button  type="danger" ghost style={{float:'right'}}>点名</Button>
                </div>
                <div style={{marginBottom:20}}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 300 }}
                        enterButton
                    />
                </div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}

export default SignModal;