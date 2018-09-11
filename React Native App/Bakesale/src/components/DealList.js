import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import DealItem from './DealItem'
import PropTypes from "prop-types"

class DealList extends Component {

    static propTypes = {
        dealList : PropTypes.array.isRequired,
        updateCurrentDealId: PropTypes.func.isRequired,
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.dealList}
                    renderItem={({item}) => <DealItem dealItem={item} onItemPress={this.props.updateCurrentDealId}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    text: {
        fontSize: 40
    }
})

export default DealList;