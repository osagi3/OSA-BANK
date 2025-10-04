'use strict';

const transfer = document.querySelector('.transaction-con');
const btnSignUp = document.querySelector('.btn-sign-up');
const userInput = document.querySelector('.nav-input-user');
const pinInput = document.querySelector('.nav-input-pin');
const userLogIn = document.querySelector('.login-input-user');
const pinLogIn = document.querySelector('.login-input-pin');
const btnLogIn = document.querySelector('.btn-login');
const eyesOpen = document.querySelector('.eyes-open');
const eyesClose = document.querySelector('.eyes-close');
const eyes = document.querySelectorAll('.eyes-pass');
const capitalLetter = document.querySelector('.capital-message');
const smallLetter = document.querySelector('.small-message');
const numberAlert = document.querySelector('.number-message');
const lengthAlert = document.querySelector('.length-message');
const greenLight = document.querySelector('.pass');
const redlight = document.querySelector('.not');
const errorMessage = document.querySelector('.error-status');
const passwordAlert = document.querySelector('.password-error');
const putPass = document.querySelector('.put-password');
const signUpAlert = document.querySelector('.sign-up-message');
const transferId = document.getElementById('username-message');
const logout = document.querySelector('.log-out-btn');
const wrapper = document.querySelector('.password-wrapper');
const errorSignUp = document.getElementById('error-signup');
const signUpmsg = document.querySelector('.sig-up-error');
const specialCh = document.querySelector('.special-cht');
const specialAlert = document.querySelector('.special-update');
const selectRecieve = document.getElementById('reciever');
const option = document.createElement('option');
const balance = document.getElementById('account-balance');
const transferButton = document.getElementById('transferbtn');
const transactionStats = document.querySelector('.transacion-status');
const loanBtn = document.querySelector('.loan-btn');
const loanInput = document.querySelector('.loan-input');
const closeBtn = document.querySelector('.close-btn');
const closeUserInput = document.querySelector('.close-input-user');
const closePinInput = document.querySelector('.close-input-pin');
const historyBtn = document.getElementById('history-btn');

const money = document.getElementById('amount');

const currentName = localStorage.getItem('currentUser');
if (transferId) {
  transferId.textContent = currentName;
}

if (!localStorage.getItem('userObj')) {
  const defaultUsers = [
    { user: 'wisdom', pin: '1122', balance: 2000000, transaction: [] },
    { user: 'danny', pin: '2233', balance: 500000, transaction: [] },
    { user: 'tola', pin: '3344', balance: 200000, transaction: [] },
    { user: 'tife', pin: '4455', balance: 300000, transaction: [] },
  ];
  localStorage.setItem('userObj', JSON.stringify(defaultUsers));
}

const accArray = JSON.parse(localStorage.getItem('userObj'));
const currentUser = localStorage.getItem('currentUser');

if (accArray.length > 0 && currentUser && balance) {
  for (let i = 0; i < accArray.length; i++) {
    if (accArray[i].user === currentUser) {
      balance.textContent = `Balance: ₦${accArray[i].balance}`;
      break;
    }
  }
}
if (selectRecieve) {
  const selectRecieve = document.getElementById('reciever');

  for (let i = 0; i < accArray.length; i++) {
    if (accArray[i].user != currentUser) {
      const option = document.createElement('option');
      option.textContent = accArray[i].user;
      option.value = accArray[i].user;
      selectRecieve.appendChild(option);
    }
  }
}

function renderTransfer(user) {
  transactionStats.innerHTML = '';
  user.transaction.forEach((tf) => {
    const tfDiv = document.createElement('div');
    tfDiv.classList.add('transaction-border');

    const tfDate = document.createElement('p');
    tfDate.classList.add('transaction-date');
    tfDate.textContent = new Date(tf.timestamp).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    tfDiv.appendChild(tfDate);
    ////TYPE/////
    const tfType = document.createElement('p');
    tfType.classList.add('transaction-type');
    tfType.textContent =
      tf.type === 'debit'
        ? `debit | to: ${tf.counterparty}`
        : `credit | from: ${tf.counterparty}`;
    tfDiv.appendChild(tfType);
    ////AMOUNT//////
    const tfAmount = document.createElement('p');
    tfAmount.classList.add('transaction-amount');
    if (tf.type === 'debit') {
      tfAmount.classList.add('debit');
    } else {
      tfAmount.classList.add('credit');
    }
    tfAmount.textContent = `₦${tf.amount}`;
    tfDiv.appendChild(tfAmount);
    /////BALANCE//////
    const tfBalance = document.createElement('p');
    tfBalance.classList.add('transaction-balance');
    tfBalance.textContent = `Balance: ₦${tf.balanceAfter}`;
    tfDiv.appendChild(tfBalance);
    transactionStats.prepend(tfDiv);
  });
}

const currentUserName = localStorage.getItem('currentUser');

const accUser = accArray.find((acc) => acc.user === currentUserName);

if (btnSignUp) {
  console.log('agagg');
  btnSignUp.addEventListener('click', function (e) {
    e.preventDefault();
    const user1 = userInput.value;
    const pin1 = pinInput.value;
    if (user1 == '' || pin1 === '') {
      signUpAlert.textContent = 'Sign up to continue';
      return;
    }

    const accArray = JSON.parse(localStorage.getItem('userObj')) || [];

    let checkFlag = false;
    for (const accUser of accArray) {
      if (accUser.user === user1) {
        alert('already exist!');

        checkFlag = true;
        break;
      }
    }

    const errorSignUp = document.getElementById('error-signup');
    if (!/[A-Z]/.test(pin1)) {
      errorSignUp.textContent =
        'Password must contain at least one uppercase letter.';
      errorSignUp.style.display = 'block';
      return;
    }

    if (!/[a-z]/.test(pin1)) {
      errorSignUp.textContent =
        'Password must contain at least one small letter.';
      errorSignUp.style.display = 'block';
      return;
    }

    if (pin1.length < 8) {
      errorSignUp.textContent = 'Password must be at least 8 characters long.';
      errorSignUp.style.display = 'block';
      return;
    }

    if (!/^[A-Za-z0-9]+$/.test(pin1)) {
      errorSignUp.textContent = 'Password must not contain special characters.';
      errorSignUp.style.display = 'block';
      return;
    }
    errorSignUp.style.display = 'none';

    if (!checkFlag) {
      const newUser = {
        user: user1,
        pin: pin1,
        balance: 0,
        transaction: [],
      };
      accArray.push(newUser);
      localStorage.setItem('userObj', JSON.stringify(accArray));
      alert('sign up succesful!');
      localStorage.setItem('currentUser', user1);
      window.location.href = 'transaction.html';
    }
  });
}

if (pinInput) {
  pinInput.addEventListener('input', function () {
    const pin1 = pinInput.value;
    const hasUpper = /[A-Z]/.test(pin1);
    const hasSmall = /[a-z]/.test(pin1);
    const hasNum = /[0-9]/.test(pin1);
    const longEnough = pin1.length >= 8;
    const noSpecial = /^[A-Za-z0-9]+$/.test(pin1);

    nostyle(specialAlert, noSpecial);

    if (hasUpper && hasSmall && hasNum && longEnough && noSpecial) {
      btnSignUp.disabled = false;
    } else {
      btnSignUp.disabled = true;
    }

    function nostyle(element, con) {
      if (noSpecial) {
        element.classList.add('pass');
        element.classList.remove('not');
      } else {
        element.classList.add('not');
        element.classList.remove('pass');
      }
    }
  });
}

if (btnLogIn) {
  btnLogIn.addEventListener('click', function (e) {
    e.preventDefault();

    const login1 = userLogIn.value;
    const login2 = pinLogIn.value;

    if (login1 === '' || login2 === '') {
      putPass.textContent = 'Enter both username and password';
      return;
    }

    const accArray = JSON.parse(localStorage.getItem('userObj')) || [];

    const accUser = accArray.find(
      (acc) => acc.user === login1 && acc.pin === login2
    );

    if (accUser) {
      localStorage.setItem('currentUser', accUser.user);

      window.location.href = 'transaction.html';
    } else {
      putPass.textContent = 'Invalid username or password';
    }
  });
}

if (pinLogIn) {
  pinLogIn.addEventListener('input', function (e) {
    e.preventDefault();

    const pin = pinLogIn.value;

    if (!/[A-Z]/.test(pin)) {
      capitalLetter.style.display = 'block';
      capitalLetter.classList.add('not');
      capitalLetter.classList.remove('pass');
    } else {
      capitalLetter.classList.add('pass');
      capitalLetter.classList.remove('not');
    }
    if (!/[a-z]/.test(pin)) {
      smallLetter.style.display = 'block';
      smallLetter.classList.add('not');
      smallLetter.classList.remove('pass');
    } else {
      smallLetter.classList.add('pass');
      smallLetter.classList.remove('not');
    }
    if (!/[0-9]/.test(pin)) {
      numberAlert.style.display = 'block';
      numberAlert.classList.add('not');
      numberAlert.classList.remove('pass');
    } else {
      numberAlert.classList.add('pass');
      numberAlert.classList.remove('not');
    }
    if (pin.length < 8) {
      lengthAlert.style.display = 'block';
      lengthAlert.classList.add('not');
      lengthAlert.classList.remove('pass');
    } else {
      lengthAlert.classList.add('pass');
      lengthAlert.classList.remove('not');
    }

    if (!/^[A-Za-z0-9]+$/.test(pin)) {
      specialCh.style.display = 'block';
      specialCh.classList.add('not');
      specialCh.classList.remove('pass');
    } else {
      specialCh.classList.add('pass');
      specialCh.classList.remove('not');
    }

    const capital1 = /[A-Z]/.test(pin);
    const small1 = /[a-z]/.test(pin);
    const num1 = /[0-9]/.test(pin);
    const hasNoSpecialCh = /^[A-Za-z0-9]+$/.test(pin);
    const long1 = pin.length >= 8;
    if (capital1 && small1 && num1 && hasNoSpecialCh && long1) {
      passwordAlert.style.display = 'none';
      errorMessage.style.display = 'none';
    } else {
      passwordAlert.style.display = 'block';
      errorMessage.style.display = 'block';
    }

    if (!capital1) {
      capitalLetter.classList.add('not');
      capitalLetter.classList.remove('pass');
    } else {
      capitalLetter.classList.add('pass');
      capitalLetter.classList.remove('not');
    }
  });
}

if (pinInput) {
  pinInput.addEventListener('input', function (e) {
    e.preventDefault();

    const sinUp = pinInput.value;

    if (!/[A-Z]/.test(sinUp)) {
      capitalLetter.style.display = 'block';
      capitalLetter.classList.add('not');
      capitalLetter.classList.remove('pass');
    } else {
      capitalLetter.classList.add('pass');
      capitalLetter.classList.remove('not');
    }
    if (!/[a-z]/.test(sinUp)) {
      smallLetter.style.display = 'block';
      smallLetter.classList.add('not');
      smallLetter.classList.remove('pass');
    } else {
      smallLetter.classList.add('pass');
      smallLetter.classList.remove('not');
    }
    if (!/[0-9]/.test(sinUp)) {
      numberAlert.style.display = 'block';
      numberAlert.classList.add('not');
      numberAlert.classList.remove('pass');
    } else {
      numberAlert.classList.add('pass');
      numberAlert.classList.remove('not');
    }
    if (sinUp.length < 8) {
      lengthAlert.style.display = 'block';
      lengthAlert.classList.add('not');
      lengthAlert.classList.remove('pass');
    } else {
      lengthAlert.classList.add('pass');
      lengthAlert.classList.remove('not');
    }

    const capital2 = /[A-Z]/.test(sinUp);
    const small2 = /[a-z]/.test(sinUp);
    const num3 = /[0-9]/.test(sinUp);
    const long4 = sinUp.length >= 8;
    if (capital2 && small2 && num3 && long4) {
      passwordAlert.style.display = 'none';
      errorMessage.style.display = 'none';
    } else {
      passwordAlert.style.display = 'block';
      errorMessage.style.display = 'block';
    }

    if (!capital2) {
      capitalLetter.classList.add('not');
      capitalLetter.classList.remove('pass');
    } else {
      capitalLetter.classList.add('pass');
      capitalLetter.classList.remove('not');
    }
  });
}

if (pinLogIn) {
  pinLogIn.addEventListener('blur', function (e) {
    e.preventDefault();
    passwordAlert.style.display = 'none';
  });
}

if (pinInput) {
  pinInput.addEventListener('blur', function (e) {
    e.preventDefault();
    passwordAlert.style.display = 'none';
  });
}

if (userInput) {
  userInput.addEventListener('input', function (e) {
    e.preventDefault();
    if (userInput.value !== '') {
      signUpAlert.style.display = 'none';
    } else {
      signUpAlert.style.display = 'block';
    }
  });
}

if (pinInput) {
  pinInput.addEventListener('input', function (e) {
    e.preventDefault();
    if (pinInput.value !== '') {
      signUpAlert.style.display = 'none';
    } else {
      signUpAlert.style.display = 'block';
    }
  });
}

if (pinLogIn) {
  pinLogIn.addEventListener('input', function (e) {
    e.preventDefault();
    if (pinLogIn.value !== '') {
      putPass.style.display = 'none';
    } else {
      putPass.style.display = 'block';
    }
  });
}

if (userLogIn) {
  userLogIn.addEventListener('input', function (e) {
    e.preventDefault();
    if (userLogIn.value !== '') {
      putPass.style.display = 'none';
    } else {
      putPass.style.display = 'block';
    }
  });
}

if (eyes) {
  eyes.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const wrapper = button.parentElement;
      const input = wrapper.querySelector('input');

      const open = button.querySelector('.eyes-open');
      const close = button.querySelector('.eyes-close');

      if (input.type == 'password') {
        input.type = 'text';
        open.style.display = 'inline';
        close.style.display = 'none';
      } else {
        input.type = 'password';
        open.style.display = 'none';
        close.style.display = 'inline';
      }
    });
  });
}

if (logout) {
  logout.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}

if (transferButton) {
  transferButton.addEventListener('click', function () {
    const senderName = currentUser;

    let sender;

    for (let i = 0; i < accArray.length; i++) {
      if (accArray[i].user === senderName) {
        sender = accArray[i];
        break;
      }
    }

    const recieverName = selectRecieve.value;

    let reciever;
    for (let i = 0; i < accArray.length; i++) {
      if (accArray[i].user === recieverName) {
        reciever = accArray[i];
        break;
      }
    }

    const amounttransfer = Number(money.value);

    sender.balance = sender.balance - amounttransfer;
    reciever.balance = reciever.balance + amounttransfer;

    localStorage.setItem('userObj', JSON.stringify(accArray));
    document.getElementById('account-balance').textContent =
      'Balance: ₦' + sender.balance;

    const dateTransfer = {
      type: 'debit',
      amount: amounttransfer,
      counterparty: recieverName,
      balanceAfter: sender.balance,
      timestamp: new Date().toISOString(),
    };
    sender.transaction.push(dateTransfer);

    const creditTransfer = {
      type: 'credit',
      amount: amounttransfer,
      counterparty: senderName,
      balanceAfter: reciever.balance,
      timestamp: new Date().toISOString(),
    };
    reciever.transaction.push(creditTransfer);
    localStorage.setItem('userObj', JSON.stringify(accArray));
    document.getElementById('account-balance').textContent =
      'Balance: ₦' + sender.balance;
    renderTransfer(sender);
  });
}

if (loanBtn) {
  loanBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const lapo = Number(loanInput.value);
    if (accUser.balance < 100) {
      alert('“Sorry, minimum balance ₦100 required for loan”');
    } else if (accUser.balance >= 100) {
      alert('approve loan.');
      loanInput.value = '';
      accUser.balance += lapo;

      const lapoData = {
        type: 'credit',
        amount: lapo,
        counterparty: 'loan',
        balanceAfter: accUser.balance,
        timestamp: new Date().toISOString(),
      };
      accUser.transaction.push(lapoData);
      localStorage.setItem('userObj', JSON.stringify(accArray));
      document.getElementById('account-balance').textContent =
        'Balance ₦' + accUser.balance;
      renderTransfer(accUser);
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (
      closeUserInput.value === accUser.user &&
      closePinInput.value === accUser.pin
    ) {
      const index = accArray.findIndex((acc) => acc.user === accUser.user);
      accArray.splice(index, 1);

      localStorage.setItem('userObj', JSON.stringify(accArray));
      localStorage.removeItem('currentUser');
      closeUserInput.value = '';
      closePinInput.value = '';

      alert('Account successfully closed!');

      window.location.href = 'index.html';
    }
  });
}

if (accUser) {
  document.getElementById('account-balance').textContent =
    'Balance: ₦' + accUser.balance;

  const historyBtn = document.getElementById('history-btn');
  const transactionStats = document.querySelector('.transacion-status');

  if (historyBtn && transactionStats) {
    let visible = false;

    historyBtn.addEventListener('click', function () {
      if (visible) {
        transactionStats.style.display = 'none';
        historyBtn.textContent = 'Show Transaction History';
        visible = false;
      } else {
        renderTransfer(accUser);
        transactionStats.style.display = 'block';
        historyBtn.textContent = 'Hide Transaction History';
        visible = true;
      }
    });
  }
}
