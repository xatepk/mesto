const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputData.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputData.inputErrorClass);
  errorElement.classList.remove(inputData.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(inputData.inputSelector));
  const buttonElement = formElement.querySelector(inputData.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделаем кнопку неактивной
    buttonElement.classList.add(inputData.inactiveButtonClass);
  } else {
        // иначе сделаем кнопку активной
    buttonElement.classList.remove(inputData.inactiveButtonClass);
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(inputData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());

    setEventListeners(formElement);

  });
};

enableValidation();
