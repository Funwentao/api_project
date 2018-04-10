import React,{Component} from 'react';
import Card from './Card';
import AddCard from './AddCard';

class SemesterManagement extends Component{
    constructor(){
        super();
        this.state = {
            course:[{
                name:'2017~2018',
                tips1:'学期',
                value1:'上学期',
                tips2:'开始时间',
                value2:'2017/9/1'
            }]
        }
    }
    render(){
        return(
            <div>
                <div>
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
                                />
                            })
                        }
                        <AddCard/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SemesterManagement;