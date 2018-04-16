import React,{Component} from 'react';
import {Icon} from 'antd';
import '../../style/card.scss';

class Card extends Component{
    constructor(){
        super();
    }
    render(){
        const {id} = this.props;
        return(
            <div className="card" onClick={()=>this.props.showModal(id)}>
                {this.props.visible&&<a href="javascript:;" className="remove-btn"
                                        onClick={(e)=>{e.stopPropagation();this.props.deleteCard(id)}}><Icon type="close"/></a>}
                <p className={"course-name "+this.props.className}>{this.props.name}</p>
                <div className="tips-content">
                    <div className="tips-item">
                        <span>{this.props.tips1}</span>：
                        <span>{this.props.value1}</span>
                    </div>
                    <div className="tips-item">
                        <span>{this.props.tips2}</span>：
                        <span>{this.props.value2}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;