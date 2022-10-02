import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

initForm();

const onTextareaInput = throttle(changeForm, 500);

formEl.addEventListener('submit', onSubmit);
formEl.addEventListener('input', onTextareaInput);
formEl.addEventListener('change', changeForm);
formEl.addEventListener('reset', removeFormInfo);

function onSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });

  evt.currentTarget.reset();
}

function initForm(evt) {
  let infoItem = localStorage.getItem(STORAGE_KEY);
  if (infoItem) {
    infoItem = JSON.parse(infoItem);
    Object.entries(infoItem).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}

function changeForm(evt) {
  const { name, value } = evt.target;
  let infoItem = localStorage.getItem(STORAGE_KEY);
  infoItem = infoItem ? JSON.parse(infoItem) : {};
  infoItem[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(infoItem));
}

function removeFormInfo() {
  localStorage.removeItem(STORAGE_KEY);
}
