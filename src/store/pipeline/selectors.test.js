import { pipelineSelector, makePipelineStatusItemsSelector } from './selectors';

describe('pipeline selector', () => {
  test('should return the pipeline state', () => {
    const state = { pipeline: [] };
    expect(pipelineSelector(state)).toBe(state.pipeline);
  });
});

describe('make pipeline status item selector', () => {
  test('should return a function', () => {
    expect(typeof makePipelineStatusItemsSelector()).toBe('function');
  });

  test('should get items from the pipeline with correct status', () => {
    const state = {
      pipeline: [
        { id: 1, status: 'STATUS_A' },
        { id: 2, status: 'STATUS_A' },
        { id: 3, status: 'STATUS_B' },
      ],
    };

    const selector = makePipelineStatusItemsSelector('STATUS_B');
    const result = selector(state);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ id: 3, status: 'STATUS_B' });
  });
});
