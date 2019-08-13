import { createSelector } from 'reselect';

export const pipelineSelector = state => state.pipeline.data;
export const isLoadingSelector = state => state.pipeline.isLoading;

export const makePipelineStatusItemsSelector = status => {
  return createSelector(
    pipelineSelector,
    pipeline => pipeline.filter(item => item.status === status)
  );
};
