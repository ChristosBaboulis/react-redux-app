import configureStore from '../configureStore';
import { addBug } from '../bugs';

describe('bugslice', () => {
  it('should handle the addBug action', async () => {
    const store = configureStore();
    const bug = { description: 'a' };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
