import React from 'react';
import { StyleSheet, Animated, View, Text, Dimensions,ImageBackground } from 'react-native';
import Enemy from './app/Components/Enemy';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
      points: 0,

      moveEnemyval: new Animated.Value(40),
      enemyStartposX: 0,
      enemySide: 'left',
      enemySpeed: 4200,
      gameOver: false,




    };
  }




  render() {
    return (
      <ImageBackground source={require('./app/img/back.jpg')} style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
          <View style={styles.points} >
            <Text style={{ fontWeight: 'bold', fontSize: 40 }}>{this.state.points}</Text>
          </View>
        </View>


        <Animated.Image source={require('./app/img/space.png')}
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            zIndex: 1,
            bottom: 50,
            resizeMode: 'stretch',
            transform: [

              { translateX: this.state.movePlayerVal }
            ]

          }}></Animated.Image>

        <Enemy enemyImg={require('./app/img/malo.png')}
          enemyStartposX={this.state.enemyStartposX}
          moveEnemyval={this.state.moveEnemyval}

        ></Enemy>

        <View style={styles.controls}>
          <Text style={styles.left} onPress={() => this.movePlayer('left')} >{'<'}</Text>
          <Text style={styles.right} onPress={() => this.movePlayer('right')}>{'>'}</Text>
        </View>




      </ImageBackground>
    );
  }

  movePlayer(direction) {

    //Move player right 

    if (direction == 'right') {
      this.setState({ playerSide: 'right' });

      Animated.spring(

        this.state.movePlayerVal,
        {

          toValue: Dimensions.get('window').width - 140,
          tension: 50,

        }
      ).start();
    } else if (direction == 'left') {

      this.setState({ playerSide: 'left' });

      Animated.spring(

        this.state.movePlayerVal,
        {

          toValue: 40,
          tension: 50,

        }
      ).start();
    }
  }

  componentDidMount() {
    this.animateEnemy();
  }
  animateEnemy() {
    this.state.moveEnemyval.setValue(-100);
    var windhowH = Dimensions.get('window').height;
    var r = Math.floor(Math.random() * 2) + 1;

    if (r == 2) {
      r == 40;
      this.setState({ enemySide: 'left' });
    } else {
      r = Dimensions.get('window').width - 140;
      this.setState({ enemySide: 'right' });
    }
    this.setState({ enemyStartposX: r });

    var refreshIntervalId;
    refreshIntervalId = setInterval(() => {

      if (this.state.moveEnemyval._value > windhowH - 280
        && this.state.moveEnemyval._value < windhowH - 180
        && this.state.playerSide == this.state.enemySide) {

        clearInterval(refreshIntervalId)
        this.setState({ gameOver: true });
        this.gameOver();
      }
    }, 50);

    setInterval(() => {
      this.setState({ enemySpeed: this.state.enemySpeed - 50 })
    }, 2000);

    Animated.timing(
      this.state.moveEnemyval,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed,
      }
    ).start(event => {

      if (event.finished && this.state.gameOver == false) {

        clearInterval(refreshIntervalId)
        this.setState({ points: ++this.state.points });
        this.animateEnemy();
      }
    });
  }

gameOver(){
alert('GAME OVER');

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',

  },


  points: {
    width: 80,
    height: 80,
    backgroundColor: '#993399',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },


  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  right: {
    flex: 1,
    color: '#FFFFFF',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left'
  },

  left: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right'
  },


});
