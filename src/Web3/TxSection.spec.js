import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StorePage from '../Store/StorePage';
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const initialState = fromJS({
  priceInETH: 'open MetaMask for ',
  web3: {
    validNetwork: false,
    metamaskUnlocked: false,
    isMobile: true,
    isChrome: false,
    hasWeb3: false,
  },
  modal: {
    open: false,
    message: null,
  },
});


describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)',()=>{
  const mockStore = configureStore([thunk])
  let container;
  let store,wrapper
  
  it("displays the warning 'The Ujo Store needs you to have Web3 to facilate purchases.' if Web3 is not found.", () => {
    store = mockStore(initialState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('InformativeText').prop('message')).toEqual('The Ujo Store needs you to have Web3 to facilate purchases.')
  });

  it("displays the warning 'The Ujo Store is currently incompatible with mobile browsers.' if on a mobile device", () => {
    let newState = initialState.setIn(['web3', 'hasWeb3'], true)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('InformativeText').prop('message')).toEqual('The Ujo Store is currently incompatible with mobile browsers.')
  });

  it("displays the warning 'The Ujo Store is currently only compatible with Chrome.' if device is not on Chrome", () => {
    let newState = initialState
      .setIn(['web3', 'hasWeb3'], true)
      .setIn(['web3', 'isMobile'], false)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('InformativeText').prop('message')).toEqual('The Ujo Store is currently only compatible with Chrome.')
  });

  it("displays the warning 'MetaMask is required to purchase this album on Ethereum.' if MetaMask is not found.", () => {
    let newState = initialState
      .setIn(['web3', 'hasWeb3'], true)
      .setIn(['web3', 'isMobile'], false)
      .setIn(['web3', 'isChrome'], true)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('InformativeText').prop('message')).toEqual('MetaMask is required to purchase this album on Ethereum.')
  });

});