import todoActions from './actions';

// Reducer
const initialState = {
  trimPara: '',
  trimStatus: false,
};

export default function todoReducer(state = initState, action) {

  console.log('reducer');
  switch (action.type) {
    case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_DOG_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
