import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  editButton, addButton, profileAvatar, avatarFormElement,
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

api.getPromises()
.then((result) => {
  const [initialUsers, initialCards] = result;
  const { _id, name, avatar, about } = initialUsers;
  //создаем экземпляр класса для загрузки данных о пользователе с сервера
  const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__about-self', avatarSelector: '.profile__avatar'});
  user.setUserInfo({name, "about-self": about});
  user.setUserAvatar({avatar});

  //создаем экземпляр класса Section для инициализации карточек с сервера
  const cardsList = new Section({
    items: initialCards.reverse(),
    renderer: (item) => {
      const cardElement = createCard(item, _id);
      cardsList.addItem(cardElement);
      }
    }, placeContainer
  );

  const addPopup = new PopupWithForm({
    popupSelector: '.popup_el_add',
    handleFormSubmit: (item) => {
      const {
        place: name,
        'place-url': link
      } = item;

      renderLoading(true, '.popup_el_add');

      api.postNewCard({name, link})
      .then((res) => {
        console.log(res);
        const cardElement = createCard(res, _id);
        cardsList.addItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, '.popup_el_add')});

      addPopup.close();

    }
  });
  addPopup.setEventListeners();

  addButton.addEventListener('click', () => {
    addPopup.open();

    //обнуление ошибок
    cardForm.resetInputError();
  });

  const createCard = (item, id) => {
    const cardElement = new Card({
      item,
      id,
      handleCardClick: () => {
        zoomPopup.open(item);
      },
      handleCardDelete: () => {
        const delPopup = new PopupWithForm({
          popupSelector: '.popup_el_del',
          handleFormSubmit: () => {
            api.delCard(item._id)
            .then(() => {
            cardElement.remove();
            delPopup.close();
            })
            .catch((err) => {
              console.log(err);
            });
          }
        });

        delPopup.setEventListeners();
        delPopup.open();
      },
      handleCardLike: (evt) => {
        evt.target.classList.toggle('place__icon_is-active');
        if (evt.target.classList.contains('place__icon_is-active')) {
          api.likeCard(item.likes, item._id)
          .then((result) => {
            cardElement.querySelector('.place__likes-count').textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api.dislikeCard(item.likes, item._id)
          .then((result) => {
            cardElement.querySelector('.place__likes-count').textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });

        }

      }
    }, '#places').generateCard();
    return cardElement
  }

  const editAvatarPopup = new PopupWithForm({
    popupSelector: '.popup_el_avatar',
    handleFormSubmit: (item) => {
      const {
        'avatar-url': avatar
      } = item;
      renderLoading(true, '.popup_el_avatar');
      user.setUserAvatar({ avatar });

      api.saveUserAvatar({ avatar })
      .then((result) => {
        console.log(result);
        })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, '.popup_el_avatar')});

      editAvatarPopup.close();
    }
  });
  editAvatarPopup.setEventListeners();

  profileAvatar.addEventListener('click', () => {
    editAvatarPopup.open();

    //обнуление ошибок
    profileForm.resetInputError();
  });

  const zoomPopup = new PopupWithImage({ popupSelector: '.popup_el_card' });
  zoomPopup.setEventListeners();

  const editPopup = new PopupWithForm({
    popupSelector: '.popup_el_edit',
    handleFormSubmit: (item) => {
      user.setUserInfo(item);

      renderLoading(true, '.popup_el_edit');

      api.saveUserInfo(item)
      .then((result) => {
        console.log(result);
        })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, '.popup_el_edit')});

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

  function renderLoading(isLoading, popupSelector) {
    if (isLoading ) {
      document.querySelector(popupSelector).querySelector('.popup__button').value = 'Сохранение...'
    }
  }

  // отрисовка карточек
  cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
});

document.addEventListener('DOMContentLoaded', function() {
  //установка свойств для плавного закрытия попапа
  popups.forEach(el => el.classList.add('popup__load'));
}, false);

const cardForm = new FormValidator(inputData, cardFormElement);
const profileForm = new FormValidator(inputData, profileFormElement);
const avatarForm = new FormValidator(inputData, avatarFormElement);
profileForm.enableValidation();
cardForm.enableValidation();
avatarForm.enableValidation();

// const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__about-self', avatarSelector: '.profile__avatar'});

