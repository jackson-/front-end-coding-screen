import React from 'react';
import { connect } from 'react-redux';
import { displayModal } from '../Modal/modalActions';

class BuyButton extends React.Component {
  constructor(props) {
    super(props)
    this.chromeMessage = `Ethereum payments powering 
    the Ujo Store use web3 applications that are only available
     in a Chrome desktop browser. If you have access, open up 
     Chrome on your desktop and return to localhost:3000 :) 
     for instructions on how to buy.`
    this.metaMaskMessage = `You need to be signed into your 
    MetaMask account and be connected the correct ethereum 
    network to buy the album. Please connect to the Main 
    Network. Using Metamask, you can switch networks by 
    clicking the MetaMask extension icon in your browser 
    and then clicking the network name in the top left corner.`
  }
  
  getButton = () => {
    if(this.props.web3.get("isMobile")){
      return <button onClick={() => this.props.displayModal(this.chromeMessage)} type="button" className="gradient">Learn More</button>
    } else if(!this.props.web3.get("isChrome")){
      return <button onClick={() => this.props.displayModal(this.chromeMessage)}>How To Buy Album</button>
    } else if(!this.props.web3.get("metamaskUnlocked")){
      return <button onClick={() => this.props.displayModal(this.metaMaskMessage)}>How To Buy Album</button>
    } else {
      return <button onClick={this.props.buyAlbum}>Buy Album</button>
    }
  }

  render() {
    return (
      <div>
        {this.getButton()}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    web3: state.get('web3'),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    displayModal: (message) => dispatch(displayModal(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton);


