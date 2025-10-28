import { useEffect, useCallback } from 'react';
import Editor from '../../components/write/Editor';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { changeField, initialize } from '../../modules/write';

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
    }),
    shallowEqual,
  );

  // #. Editor 컴포넌트에서 사용할 useEffect 가 Editor 컴포넌트가 화면에 나타났을 때 최초 한번만 실행되도록 useCallback으로 감싸기
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  // #. 언마운트될 때 초기화. 사용자가 WritePage 를 벗어날 때 데이터 초기화.
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;

/**
 * Quill 에디터
 * onChange와 value로 상태를 관리할 수 없음.
 * 1. 에디터 값이 바뀌면 리덕스 스토어에 넣기
 * 2. 리덕스 스토어의 값이 바뀌면 에디터 값 업데이트
 */
