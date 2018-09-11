import React, {Component} from 'react'
import {TextInput, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

class SearchBar extends Component {

    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    }

    state = {
        searchTerm: '',
    };

    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm);
        this.inputText.blur();
    }

    debouncedSearchDeals = debounce(this.searchDeals, 300)
    updateSearchTerm = (searchTerm) => {
        this.setState({
            searchTerm,
        }, () => {
            this.debouncedSearchDeals(this.state.searchTerm)
        })
    }

    render() {
        return(
            <TextInput 
                ref={(inputText) => {this.inputText = inputText;}}
                placeholder='Search Deals' 
                style={styles.input}
                onChangeText={this.updateSearchTerm}>
            </TextInput>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginTop: 20,
        marginHorizontal: 12,
    },
})

export default SearchBar