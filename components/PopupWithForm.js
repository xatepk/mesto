import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleFormSubmit }) {
    super({ popupSelector, handleFormSubmit });
    this._handleFormSubmit = handleFormSubmit ;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this._element.querySelector('.popup__form').reset();
    })
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    super.close();
  }
}
