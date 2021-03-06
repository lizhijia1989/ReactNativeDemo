/**
 * DemoAnimated
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  PanResponder
} from 'react-native';
import Page from '../common/Page.js';
import Viewport from '../components/Viewport.js';
import Header from '../components/Header.js';

export default class DemoAnimatedEvent extends Page {
  constructor(props) {
    super(props);
    this.offsetY = new Animated.Value(0);
    this.trans = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.trans.x, dy: this.trans.y }]
      ),
      onPanResponderRelease: () => {
        Animated.spring(this.trans, { toValue: { x: 0, y: 0 } }
         ).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(this.trans, { toValue: { x: 0, y: 0 } }
         ).start();
      },
    });
  }

  render() {
    return (
      <Viewport>
        <Header
          page={this}
          title={'Animated.Event'}
        />
        <View style={styles.container}>
          <Animated.View
            style={[styles.box, { 
              width: this.offsetY.interpolate({
                inputRange: [0, 0, 200, 200],
                outputRange: [50, 50, 200, 200]
              })
            }]}
          />
          <ScrollView
            style={{ flex: 1 }}
            scrollEventThrottle={1}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {y: this.offsetY}
                }
              }
            ])}
          >
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, i) => (
              <Text key={i}>{item}</Text>
            ))
          }
          </ScrollView>
          <View>
            <Text>pansponder</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Animated.View
              style={[styles.box, {
                width: 50,
                transform:[
                  {translateX:this.trans.x},
                  {translateY:this.trans.y}
                ],
              }]}
              {...this.panResponder.panHandlers}
            />
          </View>
        </View>
      </Viewport>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3'
  },
  box: {
    height: 50,
    backgroundColor: 'red'
  }
});