import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useNavigate} from "react-router-dom";

const items = [
    {
        label: 'О приложении',
        key: 'mail',
        icon: <MailOutlined />,
        onClick: () => { navigate('/about')},
    },
    {
        label: 'Список',
        key: 'app',
        icon: <AppstoreOutlined />,
        onClick: () => { navigate('/posts')},
    },
    {
        label: 'Список по уроку с Redux',
        key: 'SubMenu',
        icon: <SettingOutlined/>,
        onClick: () => { navigate('/posts_redux')},
    }
];

const Navbar = () => {
    const [current, setCurrent] = useState('mail');
    let navigate = useNavigate();

    return <Menu selectedKeys={[current]} mode="horizontal" items={items} />;

};

export default Navbar;