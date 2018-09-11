import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import PropTypes from "prop-types"
import { priceDisplay }  from '../util'

class DealItem extends Component {

    static propTypes = {
        dealItem : PropTypes.object.isRequired,
        onItemPress: PropTypes.func.isRequired,
    }

    handlePress = () => {
        this.props.onItemPress(this.props.dealItem.key)
    }

    render() {
        const {dealItem} = this.props;
        return(
            <TouchableOpacity 
                style={styles.deal}
                onPress={this.handlePress}
            >
                <Image 
                    source= {{uri: dealItem.media[0]}}
                    style= {styles.image}
                />
                <View style= {styles.info}>
                    <Text style= {styles.title}>{dealItem.title}</Text>
                    <View style= {styles.footer}> 
                        <Text style= {styles.cause}>{dealItem.cause.name}</Text>
                        <Text style= {styles.price}>{priceDisplay(dealItem.price)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    image: {
        width: "100%",
        height: 150,
        backgroundColor: "#ccc",
    },
    info: {
        padding: 10,
        backgroundColor: "#fff",
        borderColor: "#bbb",
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: "row",
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: "right"
    },
})

export default DealItem;