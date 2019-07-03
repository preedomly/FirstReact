// createStore接受reducer生成stote
import { createStore } from "redux";
// redux-persist作用是将store中的数据缓存到浏览器中，减少数据请求，每当白名单中的数据发生变化，才会进行一次更新缓存的操作，并且这个数据缓存是存在localStorage中的，不是会话级别的缓存。
import { persistStore, persistReducer } from "redux-persist";
// storage简单就可以理解成localStorage的功能封装吧，不过有时候由于版本问题，必要在后一个storage上加一个default属性，可以在console中打出来判断是否需要加
import storage from "redux-persist/lib/storage";

import reducers from "./reducers";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
