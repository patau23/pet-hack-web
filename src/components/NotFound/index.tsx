import * as React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return <Result
    status="404"
    title="404"
    subTitle="Извините, страница, которую вы посетили, не существует."
    extra={<Button onClick={() => navigate(-1)}>Вернуться</Button>}
  />
}
export default NotFound