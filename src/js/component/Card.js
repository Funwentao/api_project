import React,{Component} from 'react';
import '../../style/card.scss';

class Card extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="card">
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