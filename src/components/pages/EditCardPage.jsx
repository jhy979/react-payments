import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  API_SERVER,
  ERROR_MESSAGE,
  MESSAGES,
  PATH,
} from '../../utils/constants';
import BackwardButton from '../common/BackwardButton';
import Button from '../common/Button';
import CardPreview from '../common/CardPreview';
import Input from '../common/Input';
import TextBox from '../common/TextBox';

const StyledCompleteEditCardPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'center';
  align-items: 'center';

  .text-box {
    margin: 114px 17px 77px;
  }

  .small-card {
    width: 293px;
    height: 183px;
    margin: 0px 17px 33px;
  }

  .input-box {
    margin: 0 43px;
  }

  .input-box::placeholder {
    color: '#737373';
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
  const [newName, setNewName] = useState();
  const navigation = useNavigate();
  const {
    state: { cardName, values, id },
  } = useLocation();

  const editCard = async () => {
    const response = await fetch(`${API_SERVER}/cards/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cardName: newName.toUpperCase(),
      }),
    });

    if (!response.ok) {
      alert(ERROR_MESSAGE.FAILED_EDIT);
      return;
    }
    navigation('/');
  };

  const deleteCard = async () => {
    if (!window.confirm(MESSAGES.CONFIRM_DELETE)) {
      return;
    }

    const response = await fetch(`${API_SERVER}/cards/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      alert(ERROR_MESSAGE.FAILED_DELELTE);
      return;
    }
    navigation('/');
  };

  return (
    <StyledCompleteEditCardPage>
      <Link to={PATH.HOME}>
        <BackwardButton showBackWard>카드 수정</BackwardButton>
      </Link>
      <TextBox fontSize="23px">카드 이름을 수정하세요.</TextBox>
      <CardPreview values={values} />
      <Input
        underLine
        placeHolder={cardName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      />
      <Button
        className="delete-button"
        onClick={async () => {
          await deleteCard(newName);
        }}
      >
        삭제
      </Button>

      <Button
        className="edit-button"
        onClick={async () => {
          await editCard(newName);
        }}
      >
        수정
      </Button>
    </StyledCompleteEditCardPage>
  );
};

export default EditCardPage;
