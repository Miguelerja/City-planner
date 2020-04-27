import { Action } from '../../types/types';

export const apiReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'get': {
      return {loading: action.payload.loading, data: action.payload.data};
    }
    case 'post': {
      const updatedData = [...state.data, action.payload.data];
      return {loading: action.payload.loading, data: updatedData};
    }
    case 'edit': {
      return {loading: action.payload.loading, data: action.payload.data};
    }
    case 'delete': {
      return {loading: action.payload.loading, data: action.payload.data};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
};
