import { UseMutationResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateOneOneChatQuery } from '@/features/chat/api/chat.api';


const CreateChat = () => {

  const params = useParams();
  const userId = params['userId'];
  const navigate = useNavigate();

  const createOneOneChatMutation = useCreateOneOneChatQuery() as UseMutationResult;

  useEffect(() => {

    if(userId) {
      createOneOneChatMutation.mutate(userId);
    }

  }, []);

  useEffect(() => {

    if(createOneOneChatMutation.data) {
      navigate('/chat', { replace: true });
    }

    if(createOneOneChatMutation.isError) {
      alert('Có lỗi xảy ra, vui lòng thử lại sau');
      navigate(-1);
    }

  }, [createOneOneChatMutation.isLoading, createOneOneChatMutation.isError]);

  return <></>
}


export default CreateChat