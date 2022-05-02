const useCardForm = () => {
  const cardFormSchema = {
    firstCardNumber: {
      alias: '카드 번호',
      type: 'number',
      initialValue: '',
      minLength: 4,
      maxLength: 4,
      required: true,
    },
    secondCardNumber: {
      alias: '카드 번호',
      type: 'number',
      initialValue: '',
      minLength: 4,
      maxLength: 4,
      required: true,
    },
    thirdCardNumber: {
      alias: '카드 번호',
      type: 'number',
      initialValue: '',
      minLength: 4,
      maxLength: 4,
      required: true,
    },
    fourthCardNumber: {
      alias: '카드 번호',
      type: 'number',
      initialValue: '',
      minLength: 4,
      maxLength: 4,
      required: true,
    },
    expiredMonth: {
      alias: '만료일',
      type: 'number',
      initialValue: '',
      minLength: 2,
      maxLength: 2,
      required: true,
      validation: [
        {
          assert: (month) => month >= 1 && month <= 12,
          errorMessage: '유효하지 않은 월입니다.',
        },
      ],
    },
    expiredYear: {
      alias: '만료일',
      type: 'number',
      initialValue: '',
      minLength: 2,
      maxLength: 2,
      required: true,
      validation: [
        {
          assert: (year) => year >= new Date().getFullYear() % 100,
          errorMessage: '유효하지 않은 연도입니다.',
        },
      ],
    },
    owner: {
      alias: '카드 소유자 이름',
      type: 'text',
      initialValue: '',
      maxLength: 30,
    },
    cvc: {
      alias: '보안코드 (cvc/cvv)',
      type: 'number',
      initialValue: '',
      minLength: 3,
      maxLength: 4,
      required: true,
    },
    firstPasswordDigit: {
      alias: '비밀번호',
      type: 'number',
      initialValue: '',
      minLength: 1,
      maxLength: 1,
      required: true,
    },
    secondPasswordDigit: {
      alias: '비밀번호',
      type: 'number',
      initialValue: '',
      minLength: 1,
      maxLength: 1,
      required: true,
    },
    thirdPasswordDigit: {
      alias: '비밀번호',
      type: 'number',
      initialValue: '*',
      minLength: 1,
      maxLength: 1,
    },
    fourthPasswordDigit: {
      alias: '비밀번호',
      type: 'number',
      initialValue: '*',
      minLength: 1,
      maxLength: 1,
    },
  };

  const addCard = async (values) => {
    console.log(values);
  };

  const onSubmit = async (values) => {
    await addCard(values);
  };

  const onSubmitError = (errors, invalidInputRefs) => {
    const firstInvalidInput = invalidInputRefs[0].element;
    const { errorMessage } = errors[firstInvalidInput.name];

    firstInvalidInput.focus();
    alert(errorMessage);
  };

  return {
    cardFormSchema,
    onSubmit,
    onSubmitError,
  };
};

export default useCardForm;
