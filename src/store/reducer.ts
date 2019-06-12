/**
 * 定义具体reducer
 * @param state 当前state
 * @param action action对象
 */
const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'increment1':
      return { ...state, count1: state.count1 + 1 };
    case 'decrement1':
      return { ...state, count1: state.count1 - 1 };
    case 'set1':
      return { ...state, count1: action.count };
    case 'increment2':
      return { ...state, count2: state.count2 + 1 };
    case 'decrement2':
      return { ...state, count2: state.count2 - 1 };
    case 'set2':
      return { ...state, count2: action.count };
    default:
      throw new Error('Unexpected action');
  }
};

export default reducer
