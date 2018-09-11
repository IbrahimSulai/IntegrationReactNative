/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetails from './DealDetails';
import SearchBar from './SearchBar';

class App extends Component {
  titleXPosition = new Animated.Value(0);

  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  }

  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150
    Animated.timing(
      this.titleXPosition,
      {toValue: direction * (width / 2)},
      {duration: 1000},
      {easing: Easing.bounce},
    ).start(({finished}) => {
      if(finished) {
        this.animateTitle(-1 * direction);
      }
    })
  }

  async componentDidMount() {
    this.animateTitle()
    const deals = await ajax.fetchInitialDeals();
    this.setState({
      deals
    });
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if(searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResult(searchTerm);
    }
    this.setState({
      dealsFromSearch
    });
  }

  setCurrentDealId = (dealId) => {
    this.setState({
      currentDealId : dealId,
    })
  }

  unsetCurrentDealId = () => {
    this.setState({
      currentDealId : null,
    })
  }

  currentDeal = () => {
    return this.state.deals.find((deal) => 
      deal.key === this.state.currentDealId
    )
  }

  render() {
    let dealsArrayToDisplay = this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch : this.state.deals
    if (this.state.currentDealId) {
      return <DealDetails initialDealData={this.currentDeal()} backButtonPress={this.unsetCurrentDealId}/>
    }
    if (dealsArrayToDisplay.length > 0) {
      return (
      <View>
        <SearchBar searchDeals={this.searchDeals}/>
        <DealList dealList = {dealsArrayToDisplay} updateCurrentDealId={this.setCurrentDealId}/>
      </View>)
    }
    return (
      <Animated.View style={[{left: this.titleXPosition}, styles.container]}>
        <Text style={styles.header}>Bakesale</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 40
  }
});

export default App;
