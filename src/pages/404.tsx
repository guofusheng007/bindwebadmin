import React from 'react';
import { Outlet } from "react-router-dom";

export default () => {
    return <>
        <h3>默认404页面。<br/><br/>未匹配到该路由请先设置路由页面</h3>
    </>
}