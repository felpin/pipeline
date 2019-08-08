import produce from 'immer';

import pipelineService from '../../services/pipeline';
import { login } from '../user';
import { idSelector } from '../user/selectors';

const CHANGE_STATUS = 'pipeline/pipeline/CHANGE_STATUS';
const FETCH = 'pipeline/pipeline/FETCH';

export default (state = [], action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_STATUS: {
        const { id, newStatus } = action.payload;
        const itemToChange = draft.find(item => item.id === id);
        itemToChange.status = newStatus;
        break;
      }

      case `${FETCH}_FULFILLED`: {
        action.payload.data.forEach(item => {
          draft.push(item);
        });
        break;
      }

      default:
        break;
    }
  });

export const changeStatus = (id, newStatus) => ({
  type: CHANGE_STATUS,
  payload: { id, newStatus },
});

export const fetch = () => async (dispatch, getState) => {
  await dispatch(login());

  const id = idSelector(getState());
  return dispatch({ type: FETCH, payload: pipelineService(id) });
};
