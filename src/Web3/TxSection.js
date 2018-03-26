import React from 'react';
import { connect } from 'react-redux';

import BuyButton from './BuyButton';
import InformativeText from './InformativeText';
import { displayModal } from '../Modal/modalActions';


export class TxSection extends React.Component {

  static learnMore() {
    window.open('https://medium.com/@UjoMusic/f258e6034226');
  }

  buyAlbum = () => { alert('Buying Album'); }

  getInfoMessage = () => {
    if(this.props.web3.get("isMobile")){
      return "The Ujo Store is currently incompatible with mobile browsers."
    } else if(!this.props.web3.get("isChrome")){
      return "The Ujo Store is currently only compatible with Chrome."
    } else if(!this.props.web3.get("metamaskUnlocked")){
      return "MetaMask is required to purchase this album on Ethereum."
    } else {
      return false
    }
  }  

  render() {
    const info_message = this.getInfoMessage()
    return (
      <div>
        {info_message && 
          <InformativeText message={info_message} />
        }
        <BuyButton buyAlbum={this.buyAlbum}/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    web3: state.get('web3'),
  };
}

export default connect(mapStateToProps, {
  displayModal,
})(TxSection);
