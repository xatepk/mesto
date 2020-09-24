const showInputError = (formElement, inputElement, errorMessage, inputData) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputData.errorClass);
};

const hideInputError = (formElement, inputElement, inputData) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputData.inputErrorClass);
  errorElement.classList.remove(inputData.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputData);
  } else {
    hideInputError(formElement, inputElement, inputData);
  }
};

const setEventListeners = (formElement, inputData) => {
  const inputList = Array.from(formElement.querySelectorAll(inputData.inputSelector));
  const buttonElement = formElement.querySelector(inputData.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputData);
      toggleButtonState(inputList, buttonElement, inputData);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inputData) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделаем кнопку неактивной
    buttonElement.classList.add(inputData.inactiveButtonClass);
  } else {
        // иначе сделаем кнопку активной
    buttonElement.classList.remove(inputData.inactiveButtonClass);
  }
};

const enableValidation = (inputData) => {
  const formList = Array.from(document.querySelectorAll(inputData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());

    setEventListeners(formElement, inputData);

  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
