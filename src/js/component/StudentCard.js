import React from 'react';
import "../../style/studentCard.scss";
import '../../style/color.scss';

class StudentCard extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           color:props.color
       }
   }
    render(){
       const {color} = this.state;
        const {name,studentNumber} = this.props;
        return(
            <div className={`student-card ${color}`}>
                <p className="name">{name}</p>
                <p className="number">{studentNumber}</p>
            </div>
        )
    }
}
export default StudentCard;