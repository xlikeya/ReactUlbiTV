import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

import { createPost as createPostAction } from '../redux/modules/posts';

const CreatePost = ({ createPost }) => {
  const onSubmit = (values) => {
    createPost(values)
  };

  return (
    <Form
      name="basic"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Заголовок"
        name="title"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="body"
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
};

export default connect(
  null,
  {
    createPost: createPostAction,
  }
)(CreatePost);
