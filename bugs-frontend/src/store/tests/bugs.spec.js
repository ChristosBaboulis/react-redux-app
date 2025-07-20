import configureStore from '../configureStore';
import { addBug, resolveBug, getUnresolvedBugs, loadBugs } from '../bugs';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('bugslice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it('should add the bug to the store if it is saved to the server', async () => {
    const bug = { description: 'a' };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it('should not add the bug to the store if it is saved to the server', async () => {
    const bug = { description: 'a' };
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  it('should resolve the bug', async () => {
    fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it('should get server error', async () => {
    fakeAxios.onPatch('/bugs/1').reply(500);
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

  it('should have loader true while fetching bugs', async () => {
    fakeAxios.onGet('/bugs').reply(() => {
      expect(bugsSlice().loading).toBe(true);
      return [200, [{ id: 1 }, { id: 2 }, { id: 3 }]];
    });
  });

  it('should have loader false after fetching the bugs from the server', async () => {
    fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);

    await store.dispatch(loadBugs());

    expect(bugsSlice().loading).toBe(false);
  });

  it('should have loader false after server responds with error', async () => {
    fakeAxios.onGet('/bugs').reply(500);

    await store.dispatch(loadBugs());

    expect(bugsSlice().loading).toBe(false);
  });

  it('should fetch bugs from cache if they exists there', async () => {
    fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);

    await store.dispatch(loadBugs());
    await store.dispatch(loadBugs());

    expect(fakeAxios.history.get.length).toBe(1);
  });

  it('should fetch bugs from server if they dont exist in the cache', async () => {
    fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);

    await store.dispatch(loadBugs());

    expect(fakeAxios.history.get.length).toBe(1);
    expect(bugsSlice().list).toHaveLength(3);
  });

  describe('bugslice', () => {
    it('should get the bugs that are unresolved', async () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2, resolved: false },
        { id: 3, resolved: false },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
