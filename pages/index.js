import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  userName, aboutSelf, editButton, addButton,
  popups, profileFormElement, cardFormElement, placeContainer,
  inputData, initialCards
} from '../utils/constants.js';

const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const cardElement = new Card({
      item,
      handleCardClick: (card) => {
        const zoomPopup = new PopupWithImage({ popupSelector: '.popup_el_card', card });
        zoomPopup.open();
        zoomPopup.setEventListeners();
      }
    }, '#places').generateCard();

    cardsList.addItem(cardElement);
    }
  }, placeContainer
);

editButton.addEventListener('click', () => {
  const editPopup = new PopupWithForm({
  popupSelector: '.popup_el_edit',
  handleFormSubmit: (item) => {
    const user = new UserInfo(item);
    const setUserInfo = user.setUserInfo();
    editPopup.close();
    }
  });
  const user = new UserInfo({ name: userName.textContent, 'about-self': aboutSelf.textContent});
  const getUserInfo = user.getUserInfo();

  editPopup.open();
  editPopup.setEventListeners();

  //обнуление ошибок
  profileForm.resetInputError();
});

addButton.addEventListener('click', () => {
  const addPopup = new PopupWithForm({
    popupSelector: '.popup_el_add',
    handleFormSubmit: (item) => {
      const {
        place: name,
        'place-url': link
      } = item;

      const cardElement = new Card({
        item: { name, link },
        handleCardClick: (card) => {
          const zoomPopup = new PopupWithImage({ popupSelector: '.popup_el_card', card });
          zoomPopup.open();
          zoomPopup.setEventListeners();
        }
      }, '#places').generateCard();

      cardsList.addItem(cardElement);

      addPopup.close();

    }
  });

  addPopup.open();
  addPopup.setEventListeners();

  //обнуление ошибок
  cardForm.resetInputError();
});

document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popups.forEach(el => el.classList.add('popup__load'));
}, false);


const cardForm = new FormValidator(inputData, cardFormElement);
const profileForm = new FormValidator(inputData, profileFormElement);
const profileFormValidator = profileForm.enableValidation();
const cardFormValidator = cardForm.enableValidation();

// отрисовка карточек
cardsList.renderItems();

