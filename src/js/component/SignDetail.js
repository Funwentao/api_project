import React,{Component} from 'react';
import {Modal,Icon} from 'antd';
import Card from './Card';
import SignModal from './SignModal';
import AddCard from './AddCard';

class SignDetail extends Component{
    constructor(){
        super();
        this.state = {
            course:[{
                name:'第一周',
                tips1:'签到人数',
                value1:'50人',
                tips2:'签到成功',
                value2:'49人'
            }]
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
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
            <div>
                <div style={{marginBottom:10}}>
                    <a href="javascript:;" onClick={this.props.toggleSignDetail} style={{fontSize:24}}><Icon type="arrow-left" /></a>
                </div>
                <div style={{overflow:'hidden'}}>
                    {
                        this.state.course.map((e)=> {
                            const className = 'color' + Math.ceil(Math.random()*10);
                            return <Card
                                name={e.name}
                                tips1={e.tips1}
                                value1={e.value1}
                                tips2={e.tips2}
                                value2={e.value2}
                                className = {className}
                                showModal = {this.showModal}
                            />
                        })
                    }
                    <AddCard/>
                </div>
                <Modal title="签到详情"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <SignModal/>
                </Modal>
            </div>

        )
    }
}

export default SignDetail;