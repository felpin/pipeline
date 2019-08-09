import { createSelector } from 'reselect';

export const pipelineSelector = state => state.pipeline;

export const makePipelineStatusItemsSelector = status => {
  return createSelector(
    pipelineSelector,
    pipeline => pipeline.filter(item => item.status === status)
  );
};
