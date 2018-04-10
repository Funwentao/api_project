import React,{Component} from 'react';
import { Layout, Menu, Icon,Modal} from 'antd';
const { Header, Content, Sider } = Layout;
import MyHeader from './MyHeader';
import MyCourse from './MyCourse';
import MyStudents from './MyStudents';
import SignRecords from './SignRecords';
import SemesterManagement from './SemesterManagement';
import '../../style/home.scss';



class Home extends Component{
    constructor(){
        super();
        this.state = {
            key:'1',
            visible:false,
            modalType:''
        };
        this.menuChangeHandler = this.menuChangeHandler.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    menuChangeHandler(e){
        let {key} = e;
        this.setState({
            key
        })
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    handleOk(){
        this.setState({
            visible:false
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
                        <Menu.Item key="4">
                            <Icon type="setting" />
                            <span>学期管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{padding:20}}>
                        {this.state.key==='1'&&<MyCourse/>}
                        {this.state.key==='2'&&<MyStudents/>}
                        {this.state.key==='3'&&<SignRecords/>}
                        {this.state.key==='4'&&<SemesterManagement/>}
                    </Content>
                </Layout>
            </Layout>
            <Modal title="Basic Modal"
                   visible={this.state.visible}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}>

            </Modal>
        </Layout>
        )
    }
}

export default Home;