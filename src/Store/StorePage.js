import React from 'react';
import { connect } from 'react-redux';

import ModalComponent from '../Modal/Modal';
import ArtistSection from './ArtistSection';
import AlbumSection from './AlbumSection';
import { closeModal } from '../Modal/modalActions';
import { checkForWeb3, getPriceInEth } from '../Web3/actions';
import './store.css';

export class StoreSection extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount = () => {
    if(this.props.web3.get('hasWeb3') !== true){
      this.props.checkForWeb3()
    }
    this.props.getPriceInEth()

  }

  render() {
    const {priceInEth} = this.props;
    return (
      <div>
        <ModalComponent
          displayModal={this.props.modal.get('open')}
          message={this.props.modal.get('message')}
          closeModal={() => this.props.closeModal()}
        />
        <div className="store-section">
          <div className="container">
            <div className="row">
              <ArtistSection />
              <AlbumSection price={priceInEth} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    modal: state.get('modal'),
    web3: state.get('web3'),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    checkForWeb3: () => dispatch(checkForWeb3()),
    closeModal: () => dispatch(closeModal()),
    getPriceInEth: () => dispatch(getPriceInEth()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreSection);

