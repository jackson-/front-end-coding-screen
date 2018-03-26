/* global web3 */
import OracleContracts from 'ujo-contracts-oracle';
import Truffle from 'truffle-contract';
import Web3 from 'web3';

let oracle;

const initializeContract = () => {
  oracle = Truffle(OracleContracts.USDETHOracle);
  oracle.setProvider(web3.currentProvider);
  debugger
};

const web3Found = () => {
  return {
    type: 'WEB3_FOUND',
  };
}

const web3NotFound = () => {
  return {
    type: 'WEB3_NOT_FOUND',
  };
}

const setValidNetwork = (validNetwork) => {
  return {
    type: 'SET_WEB3_NETWORK',
    ...validNetwork
  };
}


export const checkForWeb3 = () => dispatch => {
  if (typeof web3 !== 'undefined') {        
    window.web3 = new Web3(window.web3.currentProvider)
    dispatch(web3Found())
    web3.eth.net.getNetworkType()
    .then((network) => {
      if(network !== "private"){
        dispatch(setValidNetwork({
          validNetwork: true,
        }))
        dispatch(checkMetaMask())
      } else{
        dispatch(web3Found())
        dispatch(setValidNetwork({
          validNetwork: false,
        }))
        dispatch(checkMetaMask())
      }
    })
  } else {
    dispatch(web3NotFound());
  }
};

export const checkMetaMask = () => {
  // use Web3 to check for an account and if on a valid network
  return {
    type: 'METAMASK_CHECK',
    metamaskUnlocked: web3.currentProvider.isMetaMask,
  };
};

// spoofed web3 call for the price
export const getPriceInUsd = () => async dispatch => {
  dispatch({
    type: 'GETTING_PRICE_IN_USD',
    priceInETHString: 'null',
  });
  initializeContract()
  // setTimeout(async () => {
  //   dispatch({
  //     type: 'GOT_PRICE_IN_USD',
  //     priceInETHString: '10',
  //   });
  // }, 8000);
};
