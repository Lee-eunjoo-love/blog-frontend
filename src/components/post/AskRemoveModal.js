import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="포스트 삭제"
      description="⚠️포스트를 정말 삭제하시겠습니까?"
      confirm="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskRemoveModal;

/**
 * 모달 컴포넌트를 각각 구분하여 만들어 줄 필요는 없이 모달을 사용하는 곳에서 AskModal을 직접 랜더링해도 되나
 * 모달이 많아지는 경우 관리를 용이하게 하기 위해 별도 컴포넌트 파일로 작성.
 */
