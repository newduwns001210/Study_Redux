# Redux

- npm install redux -> import { legacy_createStore } from "redux";
- Store / Reducer
  > data를 넣는 곳 -> state
  > 생성 방법 : const Store명 = legacy_createStore();
  > 하지만, 사용자에게 reducer을 요구함. (reducer = function)
  > Store.getState()에 reducer의 return data가 담겨있음.
  > 두번째 argument로는 redux가 fuction을 호출할 때 쓰는 action이라는 parameter (Store의 reducer와 소통하기 위한 방법)
  > action을 reducer에 보낼 땐 Store명.dispatch(object);로 보냄. (object -> {type: "&&&"})

<br>

**Redux 사용법**

```
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
```

<br>

**<JS> Redux를 사용하지 않은 Counter**

```
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;
number.innerText = count;

const updateText = () => {
  number.innerText = count;
};
const handleAdd = () => {
  count++;
  updateText();
};
const handleMinus = () => {
  count--;
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
```
