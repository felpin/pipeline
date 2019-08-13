import humps from 'humps';
import produce from 'immer';

import pipelineService from '../../services/pipeline';
import { loadUser } from '../user';
import { idSelector } from '../user/selectors';

const CHANGE_STATUS = 'pipeline/pipeline/CHANGE_STATUS';
const FETCH = 'pipeline/pipeline/FETCH';

export default (state = { isLoading: false, data: [] }, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_STATUS: {
        const { id, newStatus } = action.payload;
        const itemToChange = draft.data.find(item => item.id === id);
        itemToChange.status = newStatus;
        break;
      }

      case `${FETCH}_PENDING`: {
        // Immer requires to change draft
        // eslint-disable-next-line no-param-reassign
        draft.isLoading = true;
        break;
      }

      case `${FETCH}_FULFILLED`: {
        // Immer requires to change draft
        // eslint-disable-next-line no-param-reassign
        draft.isLoading = false;

        action.payload.data.forEach(item => {
          draft.data.push(humps.camelizeKeys(item));
        });
        break;
      }

      case `${FETCH}_REJECTED`: {
        // Immer requires to change draft
        // eslint-disable-next-line no-param-reassign
        draft.isLoading = false;
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
  await dispatch(loadUser());

  const id = idSelector(getState());
  return dispatch({ type: FETCH, payload: pipelineService(id) });
};
