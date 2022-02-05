const account1 = {
  owner: "jonas schettman",
  movements: [300, -100, 400, 120, -200, 1300, 180],
  intrestRate: 1.2,
  pin: 1111,
  movementsDate: [
    "2020-05-27T17:01:17.194Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-05-27T17:01:17.194Z",
  ],
  locale:'pt-PT',
  currency:'EUR',
};
const account2 = {
  owner: "jessica devis",
  movements: [1300, 450, 1500, 1700, 200, 300],
  intrestRate: 1.2,
  movementsDate: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
  ],
  pin: 2222,
  locale:'en-US',
  currency:'USD',
};
const account3 = {
  owner: "stiven thomas williams",
  movements: [500, 1200, 300, 200, 100, 600, -460, -750],
  intrestRate: 1.2,
  pin: 3333,
};
const account4 = {
  owner: "sarah smith",
  movements: [500, 200, 300, 1200, 200, -300],
  intrestRate: 1.2,
  pin: 3333,
};

const accounts = [account1, account2, account3, account4];

const labelwelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");

const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

let inputLoginUsername = document.querySelector(".login__input--user");
let inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
console.log(labelTimer);


const now = new Date();

const formateMovementDate = function (date,locale) {
  const calcDayspassed = (Date1, Date2) =>
    Math.round(Math.abs(Date2 - Date1) / (1000 * 3600 * 24));
  const daysPassed = calcDayspassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "yeterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //   else{
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();

  //   return `${day}/${month}/${year}, `;
  // } 

  return new Intl.DateTimeFormat(locale).format(date)
};

const formatCur = function(value,locale,currency){
  return new Intl.NumberFormat(locale,{
    style:'currency',
    currency:currency, 
  }).format(value)
  
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDate[i]);
    const displayDate = formateMovementDate(date,acc.locale);
    const formattedMov = formatCur(mov,acc.locale,acc.currency);

    const html = `<div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
     <div class="movements__value">${formattedMov} </div>
   </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr, i, arr) => acc + curr, 0);
  const formattedMov = formatCur(acc.balance,acc.locale,acc.currency)


  labelBalance.textContent = `${formattedMov}`;
};

const euroUsd = 1;

const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter((mov) => mov > 0)
    .map((movinEuro) => 1.1 * movinEuro)
    .reduce((acc, movReduce) => acc + movReduce);
    const formattedMov = 


  labelSumIn.textContent = formatCur(deposits,acc.locale,acc.currency);
  const withdrawal = acc.movements
    .filter((mov) => mov < 0)
    .map((movinEuro) => 1.1 * movinEuro)
    .reduce((acc, movReduce) => acc + movReduce, 0);      

  labelSumOut.textContent = formatCur(withdrawal,acc.locale,acc.currency);
  const interest = (acc.intrestRate * deposits) / 100;
  labelSumInterest.textContent = formatCur(interest,acc.locale,acc.currency);
};
const updateUI = function (acc) {
  // display movements
  displayMovements(acc);

  // display balance
  displayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};


const startLogOut =  function(){
  console.log('we are in startlogout')

  const tick = function(){
   
    const min = String(Math.trunc(time/60)).padStart(2,0)
    const sec = String(time%60).padStart(2,0); 
    console.log(labelTimer)  
    labelTimer.textContent= `${min}:${sec}`;

  

     if(time===0){
      clearInterval(timer)
      labelwelcome.textContent = 'Login to get started'
  
      containerApp.style.opacity = 0;
    }
    time--
  
     
  }
  let time = 120;
  tick();
   
   timer=setInterval(tick,1000)
    return timer;
    
}

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("feraz");
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance > amount &&
    recieverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    currentAccount.movementsDate.push(new Date());
    recieverAcc.movementsDate.push(new Date());
    if(timer){
      clearInterval(timer);
    }
    timer = startLogOut();
    updateUI(currentAccount);
  }
});

const user = "stiven thomas williams"; //stw
// const userName = user.toLowerCase().split(' ').map(function(name){
//   return (name[0]);
// }).join('');
// console.log(userName);

//

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
      console.log(name)
  });
  
};

createUsernames(accounts);
console.log(account1);

//event handlers

let currentAccount,timer;

//Fake login
// currentAccount = account1
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("login");
    console.log(account1.userName);
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("we are in ");

    // display welcome messege

    labelwelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = ` ${now.getMonth()}`;
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;
    const options = {
      hour:'numeric',
      minute:'numeric',
      day:'numeric',
      month:'numeric',
      year:'numeric',
      // 'weekday:long'
    
    }
    // const locale = navigator.language
    // console.log(locale);
    labelDate.textContent=new Intl.DateTimeFormat(currentAccount.locale,options).format(now);

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    if(timer){
      clearInterval(timer);
    }
    timer = startLogOut();
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("bye-bye");
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(
      (mov) => mov > 0.1 * Number(inputLoanAmount.value)
    )
  ) {
    console.log("hello hi");

    setTimeout(function(){
      currentAccount.movements.push(loanAmount);
    console.log(currentAccount.movementsDate.push(new Date()));
    currentAccount.movementsDate.push(new Date().toISOString());
    updateUI(currentAccount);
    clearInterval(timer,2500);
  
    timer = startLogOut();
    },2500);
    
    
  }

  
    
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  inputCloseUsername.value = inputClosePin.value = "";
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});


const cow = new Date();
const day =`${ cow.getDate()}`.padStart(2,0);
const month = `${cow.getMonth()+1}`.padStart(2,0);
const year = cow.getFullYear();
const hour = `${cow.getHours()}`.padStart(2,0);
const min = `${cow.getMinutes()}`.padStart(2,0);
// const options = {
//   hour:'numeric',
//   minute:'numeric',
//   day:'numeric',
//   month:'long',
//   year:'numeric',
//   weekday:'long'

// }
// const locale = navigator.language
// console.log(locale);
// labelDate.textContent=new Intl.DateTimeFormat(locale,options).format(now);
// console.log(new Intl.DateTimeFormat('en-GB').format(now));


// `${day}/${month}/${year}/${hour}:${min}` 

// const num = 3456789.23;
// const option = {
//   style:'unit',
//   unit:'mile-per-hour',

// }

// console.log(new Intl.NumberFormat('en-US',option).format(num));
// console.log(new Intl.NumberFormat('en-UK',option).format(num));
// console.log(new Intl.NumberFormat('en-GB',option).format(num));
// console.log(new Intl.NumberFormat('de-DE',option).format(num))
// console.log(new Intl.NumberFormat(navigator.language,option).format(num))

// const ingredients = ['olives','spinch']
// const mangoTimer = setTimeout((ing1,ing2)=>console.log(`here is your Mango${ing1} ${ing2}`),6000,...ingredients); 
// console.log('waiting....') 
// if(ingredients.includes('g'))clearTimeout(mangoTimer); 
//
// setInterval(function(){
//   const now = new Date()
//   console.log(now);
// },1000)