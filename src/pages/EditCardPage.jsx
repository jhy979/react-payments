import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { ERROR_MESSAGE, MESSAGES, PATH } from '../utils/constants';

import BackwardButton from '../components/common/BackwardButton';
import Button from '../components/common/Button';
import CardPreview from '../components/common/CardPreview';
import Input from '../components/common/Input';
import TextBox from '../components/common/TextBox';
import useFetch from '../hooks/useFetch';

const StyledCompleteEditCardPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'center';
  align-items: 'center';

  .text-box {
    margin: 114px 17px 77px;
  }

  .input-box {
    margin: 0 43px;
  }

  .input-box::placeholder {
    color: ${(props) => props.GRAY_500};
  }

  .button {
    width: 51px;
    height: 34px;
  }

  .delete-button {
    position: absolute;
    right: 80px;
    bottom: 16px;
  }

  .edit-button {
    position: absolute;
    right: 25px;
    bottom: 16px;
  }
`;

const EditCardPage = () => {
  const navigation = useNavigate();

  const inputRef = useRef();

  const {
    state: { cardName, values, id },
  } = useLocation();

  const { error: errorWithEditing, fetch: fetchEditCard } = useFetch('patch');
  const { error: errorWithDeleting, fetch: fetchDeleteCard } =
    useFetch('delete');

  const editCard = async () => {
    await fetchEditCard({
      API_URL: `${process.env.REACT_APP_CARD_API}/cards/${id}`,
      body: {
        cardName: inputRef.current.value.trim()?.toUpperCase() || cardName,
      },
    });

    if (errorWithEditing) {
      alert(ERROR_MESSAGE.FAILED_EDIT);
    }
  };

  const deleteCard = async () => {
    if (!window.confirm(MESSAGES.CONFIRM_DELETE)) {
      return;
    }

    await fetchDeleteCard({
      API_URL: `${process.env.REACT_APP_CARD_API}/cards/${id}`,
    });

    if (errorWithDeleting) {
      alert(ERROR_MESSAGE.FAILED_DELETE);
    }
  };

  return (
    <StyledCompleteEditCardPage>
      <Link to={PATH.HOME}>
        <BackwardButton showBackWard>카드 수정</BackwardButton>
      </Link>
      <TextBox fontSize="23px">카드 이름을 수정하세요.</TextBox>
      <CardPreview values={values} size="large" />
      <Input underLine placeHolder={cardName} innerRef={inputRef} />
      <Button
        className="delete-button"
        onClick={async () => {
          await deleteCard();
          navigation('/');
        }}
      >
        삭제
      </Button>

      <Button
        className="edit-button"
        onClick={async () => {
          await editCard();
          navigation('/');
        }}
      >
        수정
      </Button>
    </StyledCompleteEditCardPage>
  );
};

export default EditCardPage;
