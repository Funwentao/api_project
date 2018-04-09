import React,{Component} from 'react';
import { Layout, Menu, Icon} from 'antd';
const { Header, Content, Sider } = Layout;
import MyHeader from './MyHeader';
import MyCourse from './MyCourse';
import MyStudents from './MyStudents';
import SignRecords from './SignRecords';
import '../../style/home.scss';

class Home extends Component{
    constructor(){
        super();
        this.state = {
          key:'1'
        };
        this.menuChangeHandler = this.menuChangeHandler.bind(this);
    }
    menuChangeHandler(e){
        let {key} = e;
        this.setState({
            key
        })
    }
    render(){
        return(
            <Layout>
                <Header className="header">
                    <MyHeader/>
                </Header>
                <Layout>
                    <Sider width="256"
                        style={{ background: '#fff', padding: 0 }}
                    >
                        <div className="logo" />
                        <Menu  mode="inline"
                              defaultSelectedKeys={['1']}
                              onClick={this.menuChangeHandler}
                        >
                            <Menu.Item key="1">
                                <Icon type="folder" />
                                <span>我的课程</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="user" />
                                <span>我的学生</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="form" />
                                <span>签到管理</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{padding:20}}>
                            {this.state.key==='1'&&<MyCourse/>}
                            {this.state.key==='2'&&<MyStudents/>}
                            {this.state.key==='3'&&<SignRecords/>}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Home;