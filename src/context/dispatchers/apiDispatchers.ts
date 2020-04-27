import { default as api} from '../../utils/api';
import { ApiEditCall, ApiPostCall, Dispatch } from '../../types/types';

export const getData = async (dispatch: Dispatch) => {
  const data = await api.getList();
  dispatch({
    type: 'get',
    payload: {
      loading: false,
      data,
    }
  });
};

export const postData = async (dispatch: Dispatch | undefined, data: ApiPostCall) => {
  if(dispatch === undefined) {
    console.log('This property must be called within a provider');
    return
  }

  const response =  await api.postListItem(data);
  dispatch({
    type: 'post',
    payload: {
      loading: false,
      data: response,
  }});
};

export const editData = async (dispatch: Dispatch | undefined, id: number, data: ApiEditCall) => {
  if(dispatch === undefined) {
    console.log('This property must be called within a provider');
    return
  }

  await api.editListItem(id, data);
  const response = await api.getList();

  dispatch({
    type: 'edit',
    payload: {
      loading: false,
      data: response,
  }});
};

export const deleteData = async (dispatch: Dispatch | undefined, id: number) => {
  if(dispatch === undefined) {
    console.log('This property must be called within a provider');
    return
  }

  await api.deleteListItem(id);
  const updatedData = await api.getList();

  dispatch({
    type: 'delete',
    payload: {
      loading: false,
      data: updatedData,
  }});
};