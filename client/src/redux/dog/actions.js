const dogActions = {
  FETCHED_DOG: 'FETCHED_DOG',

  // Action Creators
  requestDog : () => {
    return { type: 'REQUESTED_DOG' }
  },

  requestDogSuccess : (data) => {
    return { type: 'REQUESTED_DOG_SUCCEEDED', url: data.message }
  },

  requestDogError : () => {
    return { type: 'REQUESTED_DOG_FAILED' }
  },

  fetchDog : () => {
    return { type: 'FETCHED_DOG' }
  }

};
export default dogActions;
