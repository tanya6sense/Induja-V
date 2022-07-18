import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid/lib';
import { Spin } from 'antd';
import { Todo } from './Todo';

function TodoList(props) {
  const {
 todos, toggle, loading, deleteTodo,
} = props;

  if (loading) {
    return (<Spin size="default" />);
  }

  if (todos.length === 0) {
    return <div>There is nothing here</div>;
  }

  console.log('Rendering todos list');

  const renderTodos = todos.map((todo) => {
    const {
      name, completed, id, created,
    } = todo;
    return (
      <Todo
        key={id}
        name={name}
        toggle={toggle}
        id={id}
        completed={completed}
        created={created}
        deleteTodo={deleteTodo}
      />
    );
  });

  return (
    <Row center="xs">
      <Col>
        {renderTodos}
      </Col>
    </Row>

  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  toggle: PropTypes.func,
  loading: PropTypes.bool,
  deleteTodo: PropTypes.func,
};

export default React.memo(TodoList);
