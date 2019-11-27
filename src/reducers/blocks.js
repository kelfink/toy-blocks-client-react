import {GET_NODE_BLOCKS_SUCCESS, GET_NODE_BLOCKS_START, GET_NODE_BLOCKS_FAILURE} from '../constants/actionTypes';
import initialState from './initialState';

export default function blocksReducer(state = initialState().blocks, action) {
  let list, nodeIndex;
  
  switch (action.type) {
    case GET_NODE_BLOCKS_START:
        console.log("reducer GET_NODE_BLOCKS_START", state);
        list = state.blocksList;
    //   list = state.list;
    //   nodeIndex = state.list.findIndex(p => p.url === action.node.url);
    //   if (nodeIndex >= 0) {
    //     list = [
    //       ...state.list.slice(0, nodeIndex),
    //       {
    //         ...state.list[nodeIndex],
    //         loading: true
    //       },
    //       ...state.list.slice(nodeIndex + 1)
    //     ];
    //   }
      return {
        ...state,
        list
      };
    case GET_NODE_BLOCKS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case GET_NODE_BLOCKS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
