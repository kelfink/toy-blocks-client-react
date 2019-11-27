import {GET_NODE_BLOCKS_SUCCESS, GET_NODE_BLOCKS_START, GET_NODE_BLOCKS_FAILURE} from '../constants/actionTypes';
import initialState from './initialState';

export default function blocksReducer(state = initialState().blocks, action) {
  let list, nodeIndex;
  
  switch (action.type) {
    case GET_NODE_BLOCKS_START:
        list = state.blocksList;
      return {
        ...state,
        list: list
      };
    case GET_NODE_BLOCKS_SUCCESS:
      list = state.blocksList;
      return {
        ...state,
        list: action.res.data
      };
    case GET_NODE_BLOCKS_FAILURE:
      return {
        ...state,
        list: [],
        errors: "failed to load blocks",
      };
    default:
      return state;
  }
}
