import { legacy_createStore } from "redux";

const countReducer = (count = 0, action) => {
  // state의 값을 설정해주지 않으면 default 값으로 0이 설정됨.
  if (action.type === "Add") {
    count++;
  } else if (action.type === "Minus") {
    count--;
  } else {
    return count;
  }
};

const countStore = legacy_createStore(countReducer);

countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Minus" });
// dispatch로 Add, Minus object를 보내 해당 action 값을 return 받음.

console.log(countStore.getState());
