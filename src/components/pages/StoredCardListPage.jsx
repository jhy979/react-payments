import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import API_SERVER from '../../utils/constants';
import BackwardButton from '../common/BackwardButton';
import Button from '../common/Button';
import CardPreview from '../common/CardPreview';
import TextBox from '../common/TextBox';

const StyledStoredCardList = styled.div`
  margin: 65px 59px;
  display: flex;
  flex-direction: column;

  height: 508px;

  overflow-y: auto;

  /* hide scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  .button {
    width: 208px;
    min-height: 123px;
    border-radius: 5px;

    font-weight: 400;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    color: '#575757';
  }

  .card-box {
    margin: 0 0 5px;
  }

  .card-box:hover {
    opacity: 0.6;
  }

  .text-box {
    margin: 0 0 26px;
    font-weight: 700;
    line-height: 16px;
  }
`;

const StoredCardListPage = () => {
  const [storedList, setStoredList] = useState({});

  useEffect(() => {
    async function fetchStoredCardList() {
      const fetchedCards = await fetch(`${API_SERVER}/cards`);
      const response = await fetchedCards.json();
      return response;
    }
    fetchStoredCardList().then(setStoredList);
  }, []);

  return (
    <>
      <BackwardButton showBackWard={false}>보유 카드</BackwardButton>
      <StyledStoredCardList>
        {Object.values(storedList).map(({ cardName, values, id }) => (
          <>
            <Link to="/edit-card" state={{ cardName, values, id }}>
              <CardPreview key={cardName} values={values} />
            </Link>
            <TextBox fontSize="14px">{cardName}</TextBox>
          </>
        ))}

        <Link to="/add-card">
          <Button color="#575757" backgroundColor="#E5E5E5">
            +
          </Button>
        </Link>
      </StyledStoredCardList>
    </>
  );
};

export default StoredCardListPage;
