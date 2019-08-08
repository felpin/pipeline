import pipelineService from '../../services/pipeline';
import { login } from '../user';
import { idSelector } from '../user/selectors';

const FETCH = 'pipeline/pipeline/FETCH';

export default (state = [], action) => {
  switch (action.type) {
    case `${FETCH}_FULFILLED`:
      return action.payload.data;

    default:
      return state;
  }
};

export const fetch = () => async (dispatch, getState) => {
  await dispatch(login());

  const id = idSelector(getState());
  return dispatch({ type: FETCH, payload: pipelineService(id) });
};
