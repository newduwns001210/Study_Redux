# Redux

- npm install redux -> import { legacy_createStore } from "redux";
- Store / Reducer
  > data를 넣는 곳 -> state
  > 생성 방법 : const Store명 = legacy_createStore();
  > 하지만, 사용자에게 reducer을 요구함. (reducer = function)
  > Store.getState()에 reducer의 return data가 담겨있음.
  > 두번째 argument로는 redux가 fuction을 호출할 때 쓰는 action이라는 parameter (Store의 reducer와 소통하기 위한 방법)
  > action을 reducer에 보낼 땐 Store명.dispatch(object);로 보냄. (object -> {type: "&&&"})
- Subscribe

  > Store 안에 있는 변화를 우리에게 알 수 있게 해줌.

- **요약**
  > Modifier = Reducer은 즉, 현재 상태의 app과 함께 불려지는 function  
  > 현재의 상태가 없다면 0으로 끝남, 그래고 현재 상태와 더불어 action과 함께 불러짐. (한마디로 state와 action 두개가 같이 불려짐)  
  > action은 Reducer(Modifier)과 소통하는 방법  
  > Reducer(Modifier)가 return 하는 것이 app의 state가 됨.  
  > Reducer(Modifier)에게 action을 보내는 방법 = dispatch  
  > dispatch가 Reducer를 불러와 현재의 state와 내가 보낸 action을 더함.
  > 여기서 action은 object여야 함. (name으로는 바꿀 수 없어서 type으로 바꿔야 함. type: "exam" 이런 식)  
  > 만약, 나의 change function을 나의 Store에서 감지하고 싶다면 myStore.subscribe(change function)하면 됨.

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

**Redux를 사용하지 않은 Counter**

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

<br>

**Redux를 사용한 Counter(개선 전)**

```
import { legacy_createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const countReducer = (count = 0, action) => {
  // state의 값을 설정해주지 않으면 default 값으로 0이 설정됨.
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};

const countStore = legacy_createStore(countReducer);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
};

const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
/*
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Minus" });
// dispatch로 Add, Minus object를 보내 해당 action 값을 return 받음.
*/
```

<br>

**Redux를 사용한 Counter(개선 후)**

- Reducer를 if else -> switch & case로 변경. (더 간결하고 보기 좋음.)
- action에 들어갈 object를 외부해서 const하여 사용 -> 오류 발생 시 웹페이지에서 오류를 확인 할 수 있음.

```
import { legacy_createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countReducer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = legacy_createStore(countReducer);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
```

<br>
<br>

# ToDo List with Redux

**Redux의 3가지 원칙**

1. state는 single source of truth고, read-only이다.
2. store을 수정할 수 있는 유일한 방법은 action을 보내는 방법뿐이다. => dispatch
3. **(중요)** state를 mutate(변형)하지 말아야한다.
   > mutating state하는 대신에 new state objects를 리턴해야 한다. => state를 추가,삭제 하지 말고 새로운 state object를 생성해서 보내줘야 함. 즉, 수정이 아닌 새로운 것을 리턴(보내줌)

**SetUp**

```
import { legacy_createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = legacy_createStore(reducer);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo });
};

form.addEventListener("submit", onSubmit);

```
