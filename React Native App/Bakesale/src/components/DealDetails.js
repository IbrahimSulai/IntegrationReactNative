import React, {Component} from 'react'
import {
    View, 
    TouchableOpacity, 
    Text, 
    Image, 
    StyleSheet, 
    PanResponder, 
    Animated, 
    Dimensions,
    Button,
    Linking,
    ScrollView,
} from 'react-native'
import PropTypes from "prop-types"
import { priceDisplay }  from '../util'
import ajax from '../ajax'

class DealDetails extends Component {
    imageXPos = new Animated.Value(0);

    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderMove: (evt, gs) => {
            // console.log("Moving" + gs.dx);
            this.imageXPos.setValue(gs.dx);
        },

        onPanResponderRelease: (evt, gs) => {
            // console.log("Released" + gs.dx);
            this.width = Dimensions.get('window').width;
            if(Math.abs(gs.dx) > this.width * 0.4) {
                const direction = Math.sign(gs.dx);
                //-1 for left , 1 for right
                Animated.timing(this.imageXPos,
                    {
                        toValue: direction * this.width,
                        duration: 250,
                    }
                ).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0
                }).start();
                return;
            }
        }
    });

    handleSwipe = (indexDirection) => {
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
          Animated.spring(this.imageXPos, {
            toValue: 0
          }).start();
          return;
        }
        this.setState((prevState) => ({
          imageIndex: prevState.imageIndex + indexDirection
        }), () => {
          // Next image animation
          this.imageXPos.setValue(indexDirection * this.width);
          Animated.spring(this.imageXPos, {
            toValue: 0
          }).start();
        });
      };
    

    static propTypes = {
        initialDealData : PropTypes.object.isRequired,
        backButtonPress : PropTypes.func.isRequired,
    };

    state = {
        deal : this.props.initialDealData,
        imageIndex: 0,
    };

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetails(this.state.deal.key);
        console.log(fullDeal)
        this.setState({
            deal : fullDeal
        });
    }

    backButtonClick = () => {
        this.props.backButtonPress()
    }

    openBuyLink = () => {
        // Linking.openURL(this.state.deal.url)
    }

    render() {
        const {deal} = this.state;
        return(
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.backButtonClick}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Animated.Image 
                    {...this.imagePanResponder.panHandlers}
                    source= {{uri: deal.media[this.state.imageIndex]}}
                    style= {[{left: this.imageXPos}, styles.image]}
                />
                <View>
                    <Text style={styles.title}>{deal.title}</Text>
                </View>
                <ScrollView style={styles.detail}>
                    <View style= {styles.footer}> 
                        <View style= {styles.info}>
                            <Text style= {styles.cause}>{deal.cause.name}</Text>
                            <Text style= {styles.price}>{priceDisplay(deal.price)}</Text>
                        </View>
                        {
                            deal.user && 
                            <View style={styles.user}>
                                <Image source={{uri:deal.user.avatar}} style={styles.avatar}/>
                                <Text>{ deal.user.name }</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.description}>
                        <Text>{deal.description}</Text>
                    </View>
                    <Button title="Buy this deal" onPress={this.openBuyLink}/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
      marginBottom: 20,
      marginTop: 30
    },
    backLink: {
      marginBottom: 5,
      color: '#22f',
      marginLeft: 10,
    },
    image: {
      width: '100%',
      height: 150,
      backgroundColor: '#ccc',
    },
    title: {
      fontSize: 16,
      padding: 10,
      fontWeight: 'bold',
      backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 15,
    },
    info: {
      alignItems: 'center',
    },
    user: {
      alignItems: 'center',
    },
    cause: {
      marginVertical: 10,
    },
    price: {
      fontWeight: 'bold',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    description: {
      borderColor: '#ddd',
      borderWidth: 1,
      borderStyle: 'dotted',
      margin: 10,
      padding: 10,
    },
  });

export default DealDetails;