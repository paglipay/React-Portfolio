import React, { createContext, useReducer, useContext } from "react";

const VideoChatContext = createContext();
const { Provider } = VideoChatContext;

function reducer(state, action) {
  switch (action.type) {
      case "add":
        console.log(state, action)
        return [
          ...state,
          {
            id: state.length * Math.random(),
            name: action.name
          }
        ];
    case "remove":
      return state.filter((_, index) => {
        return index !== action.index;
      });
    case "call":
      console.log(state.filter((_, index) => {
        return index === action.index;
      }));
      return state
    case "prioritize":
      return state.map((item, index) => {
        if (index === action.index) {
          return Object.assign({}, item, {
            priority: !item.priority
          });
        }
        return item;
      });
    default:
      return state;
  }
}

function VideoChatProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(reducer, []);

  return <Provider value={[state, dispatch]} {...props} />;
}

function useVideoChatContext() {
  return useContext(VideoChatContext);
}

export { VideoChatProvider, useVideoChatContext };
