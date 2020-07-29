import update from 'immutability-helper';

import ActionTypes from '~/client/store/booth/types';
import { setNonce } from '~/client/services/nonce';

const initialState = {
  address: null,
  festivalChainId: null,
  isDeactivated: false,
  isInitialized: false,
  isVotePending: false,
  nonce: 0,
};

const boothReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.BOOTH_INITIALIZE:
      return update(state, {
        address: { $set: action.meta.address },
        nonce: { $set: action.meta.nonce },
      });
    case ActionTypes.BOOTH_UPDATE_STATUS:
      return update(state, {
        festivalChainId: { $set: action.meta.festivalChainId },
        isDeactivated: { $set: action.meta.isDeactivated },
        isInitialized: { $set: action.meta.isInitialized },
      });
    case ActionTypes.BOOTH_VOTE_REQUEST:
      return update(state, {
        isVotePending: { $set: true },
      });
    case ActionTypes.BOOTH_VOTE_SUCCESS: {
      const nonce = state.nonce + 1;
      setNonce(nonce);

      return update(state, {
        nonce: { $set: nonce },
        isVotePending: { $set: false },
      });
    }
    case ActionTypes.BOOTH_VOTE_FAILURE:
      return update(state, {
        isVotePending: { $set: false },
      });
    case ActionTypes.BOOTH_RESET:
      return update(state, { $set: initialState });
    default:
      return state;
  }
};

export default boothReducer;