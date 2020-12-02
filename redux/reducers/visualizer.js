import { GET_DATA, ERROR } from '../actions';

const initialState = {
  data: [],
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload
      };
    case ERROR:
      return {
        ...state,
        data: [],
        error: 'Error en la carga de datos'
      };
    default: {
      return state;
    }
  }
};
