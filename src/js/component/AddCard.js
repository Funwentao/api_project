import React,{Component} from 'react';
import {Icon} from 'antd';
import '../../style/addCard.scss';


export default function AddCard(props){
    return(
        <div className="add-card" onClick={props.showModal}>
            <Icon type="plus"/>
        </div>
    )
}