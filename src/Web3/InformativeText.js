import React from 'react';
import { connect } from 'react-redux';

const InformativeText = (props) => {

    // I decided to make this more of a dummy component
    // as the TxSection can handle deciding which
    // message to display
    return (
      <div className="alert alert-warning">
        <pre>{props.message}</pre>
      </div>
    )
}

export default InformativeText