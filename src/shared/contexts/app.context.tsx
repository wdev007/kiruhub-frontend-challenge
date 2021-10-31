import React, { createContext, useState } from "react";
import { IAppContext } from "../types/app.context.interface";
import { ITodoItem } from "../../modules/todolist/types/todo.item.interface";

export const AppContext = createContext<IAppContext>({} as IAppContext);

const AppProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  const signIn = (): Promise<void> => {
    setAuthenticated(true);
    return Promise.resolve();
  };

  const signOut = (): Promise<void> => {
    setAuthenticated(false);
    return Promise.resolve();
  };

  const addItem = (item: ITodoItem) => {
    setTodoList((prevState) => [...prevState, item]);
  };

  const removeItem = (todoItem: ITodoItem) => {
    const remainingItems = todoList.filter(
      (item) => item.title !== todoItem.title
    );
    setTodoList(remainingItems);
  };

  return (
    <AppContext.Provider
      value={{ authenticated, signIn, signOut, addItem, todoList, removeItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
