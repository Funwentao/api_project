import React,{Component} from 'react';
import {Input } from 'antd';
import Card from './Card';
import AddCard from './AddCard';

const Search = Input.Search;

class MyCourse extends Component{
    constructor(){
        super();
        this.state = {
            course:[{
                name:'离散数学',
                tips1:'上课时间',
                value1:'4-5节',
                tips2:'上课地点',
                value2:'教学楼304'
            }]
        }
    }
    render(){
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 300 }}
                        enterButton
                    />
                </div>
                <div>
                    <p>进行中的课程：</p>
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
                                    visible={true}
                                    showModal = {this.props.showModal}
                                />
                            })
                        }
                        <AddCard/>
                    </div>
                </div>
                <div>
                    <p>已结束的课程：</p>
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
                                    visible={false}
                                    showModal = {this.props.showModal}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyCourse;