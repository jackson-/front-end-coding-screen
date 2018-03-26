import React from 'react';
import { connect } from 'react-redux';

export class DisplayPrice extends React.Component {

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  render() {
    const priceNumeric = this.isNumeric(this.props.priceInETH);
    const displayPrice = priceNumeric ? Number(this.props.priceInETH).toFixed(5) : this.props.priceInETH;
    return (
      <div className="info-price">{displayPrice} ETH <span className="usd">(10 USD)</span></div>
    );
  }
}


function mapStateToProps(state) {
  return {
    priceInETH: state.get('priceInETH'),
  };
}

export default connect(
  mapStateToProps,
  null,
)(DisplayPrice);
