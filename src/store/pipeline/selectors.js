import { createSelector } from 'reselect';

import * as STATUS from '../../contants/pipeline-status';

export const pipelineSelector = state => state.pipeline;

const initialPipelineGrouped = Object.values({ ...STATUS }).reduce(
  (groups, field) => ({ ...groups, [field]: [] }),
  {}
);

export const pipelineGrouped = createSelector(
  pipelineSelector,
  pipeline =>
    pipeline.reduce(
      (groups, item) => {
        groups[item.status].push(item);
        return groups;
      },
      { ...initialPipelineGrouped }
    )
);
