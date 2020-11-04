// import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  editButton, addButton,
  popups, profileFormElement, cardFormElement, placeContainer,
  inputData, nameInputEdit, jobInputEdit
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '21eb34d7-a814-4066-9679-9fbe4fccc6eb',
    'Content-Type': 'application/json'
  }
});

api.getInitialUsers()
.then((result) => {
  console.log(result);
  //создаем экземпляр класса для загрузки данных о пользователе с сервера
  const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__about-self', avatarSelector: '.profile__avatar'});
  user.setUserInfo({name: result.name, "about-self": result.about});
  user.setUserAvatar({avatar: result.avatar});
})
.catch((err) => {
  console.log(err);
});

api.getInitialCards()
.then((result) => {
  console.log(result);
  //создаем экземпляр класса Section для инициализации карточек с сервера
  const cardsList = new Section({
    items: result.reverse(),
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
      }
    }, placeContainer
  );
  // отрисовка карточек
  cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
});

const zoomPopup = new PopupWithImage({ popupSelector: '.popup_el_card' });
zoomPopup.setEventListeners();

const createCard = (item) => {
  const cardElement = new Card({
    item,
    handleCardClick: () => {
      zoomPopup.open(item);
    },
    handleCardDelete: () => {
      const delPopup = new PopupWithForm({
        popupSelector: '.popup_el_del',
        handleFormSubmit: () => {
          cardElement.remove();
          delPopup.close();
        }
      });

      delPopup.setEventListeners();
      delPopup.open();
    }
  }, '#places').generateCard();
  return cardElement
}

// const cardsList = new Section({
//   items: initialCards.reverse(),
//   renderer: (item) => {
//     const cardElement = createCard(item);
//     cardsList.addItem(cardElement);
//     }
//   }, placeContainer
// );

const editPopup = new PopupWithForm({
  popupSelector: '.popup_el_edit',
  handleFormSubmit: (item) => {
    user.setUserInfo(item);

    api.saveUserInfo(item)
    .then((result) => {
      console.log(result);
      })
    .catch((err) => {
      console.log(err);
    });

    editPopup.close();
  }
});
editPopup.setEventListeners();


editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo();
  nameInputEdit.value = userInfo.name;
  jobInputEdit.value = userInfo['about-self'];
  editPopup.open();

  //обнуление ошибок
  profileForm.resetInputError();
});

const addPopup = new PopupWithForm({
  popupSelector: '.popup_el_add',
  handleFormSubmit: (item) => {
    const {
      place: name,
      'place-url': link
    } = item;

    // const cardElement = createCard({name, link});
    // cardsList.addItem(cardElement);

    api.postNewCard({name, link})
    .then(() => {
      api.getInitialCards()
      .then((result) => {
      //создаем экземпляр класса Section для инициализации карточек с сервера
      const cardsList = new Section({
        items: result.reverse(),
        renderer: (el) => {
          const cardElement = createCard(el);
          cardsList.addItem(cardElement);
          }
        }, placeContainer
      );
        // отрисовка карточек
        cardsList.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });

    addPopup.close();

  }
});
addPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addPopup.open();

  //обнуление ошибок
  cardForm.resetInputError();
});

document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popups.forEach(el => el.classList.add('popup__load'));
}, false);


const cardForm = new FormValidator(inputData, cardFormElement);
const profileForm = new FormValidator(inputData, profileFormElement);
profileForm.enableValidation();
cardForm.enableValidation();

const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__about-self', avatarSelector: '.profile__avatar'});

// // отрисовка карточек
// cardsList.renderItems();

