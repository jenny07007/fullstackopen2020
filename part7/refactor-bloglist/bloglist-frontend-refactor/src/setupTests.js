import "@testing-library/jest-dom/extend-expect";

let saveItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    saveItems[key] = item;
  },
  getItem: key => saveItems[key],
  removeItem: key => saveItems[key]
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });
