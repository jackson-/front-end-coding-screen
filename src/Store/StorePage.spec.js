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
  
  it("renders the artist section", () => {
    store = mockStore(initialState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('ArtistSection').length).toEqual(1)
  });

  it("renders the album section", () => {
    store = mockStore(initialState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('AlbumSection').length).toEqual(1)
  });

});