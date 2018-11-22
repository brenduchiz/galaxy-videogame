
import React from 'react';
import { StyleSheet, Animated,Text,Image} from 'react-native';

export default class Enemy extends React.Component {




  render() {
    return (
     
        <Animated.Image source= {this.props.enemyImg}
      style= {{
        height: 100,
        width: 100,
        position:'absolute',
        resizeMode: 'stretch',
        left: this.props.enemyStartposX,
        
transform: [

          {translateY: this.props.moveEnemyval},
         ] 
       
      }}></Animated.Image>



);
}
}