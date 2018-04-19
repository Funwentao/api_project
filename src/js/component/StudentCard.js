import React from 'react';
import "../../style/studentCard.scss";
import '../../style/color.scss';

class StudentCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color:props.color,
            sign:props.sign
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            sign:nextProps.sign
        })
    }
    render(){
       const {color,sign} = this.state;
       const {name,studentNumber} = this.props;
       return(
           <div className={`student-card ${color}`} onClick={this.props.teacherChangeSign}>
               <div className={"tips "+(sign===3?"success":"failed")}>
                   <div className="info">{sign===3?"Success":"Failed"}</div>
               </div>
               <p className="name">{name}</p>
               <p className="number">{studentNumber}</p>
           </div>
       )
    }
}
export default StudentCard;