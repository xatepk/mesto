import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit ;
    this._form = this._element.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
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
    this._form.reset();
  }
}
