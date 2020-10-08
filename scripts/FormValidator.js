export default class FormValidator {
  constructor(inputData, formElement) {
    this._formSelector = inputData.formSelector;
    this._inputSelector = inputData.inputSelector;
    this._submitButtonSelector = inputData.submitButtonSelector;
    this._inactiveButtonClass = inputData.inactiveButtonClass;
    this._inputErrorClass = inputData.inputErrorClass;
    this._errorClass = inputData.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделаем кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
          // иначе сделаем кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  };
}
