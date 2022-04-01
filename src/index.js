import React from "react";
import ReactDom from "react-dom"
import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";


// 讀取local中保存USER,保存到內存中

const user = storageUtils.getUser()
memoryUtils.user = user


ReactDom.render(<App/>,document.getElementById('root'))