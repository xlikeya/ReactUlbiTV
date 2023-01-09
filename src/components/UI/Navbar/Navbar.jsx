import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useNavigate} from "react-router-dom";

const items = [
    {
        label: 'О приложении',
        key: '/about',
        icon: <HomeOutlined />,
    },
    {
        label: 'Список',
        key: '/posts',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Список по уроку с Redux',
        key: '/posts_redux',
        icon: <SettingOutlined/>,
    }
];

const Navbar = () => {
    const [current, setCurrent] = useState('/posts');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(e.key);
    };
    const navigate = useNavigate()
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;

};

export default Navbar;
