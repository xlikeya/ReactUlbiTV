import React from 'react';
import { Button } from 'antd';
import classes from "./MyButton.module.css";

const MyButton = ({children, ...props}) => {
    return (
        <Button {...props} className={classes.myBtn}>
            {children}
        </Button>
    );
};

export default MyButton;