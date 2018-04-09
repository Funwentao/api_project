import React,{Component} from 'react';
import {Icon} from 'antd';
import '../../style/addCard.scss';

class AddCard extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="add-card">
                <Icon type="folder-add"/>
            </div>
        )
    }
}

export default AddCard;