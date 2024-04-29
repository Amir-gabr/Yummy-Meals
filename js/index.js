// ======== custom the main Loading screen   ========= //

$(document).ready(() => {
  $(".main-loading-screen").fadeOut(500);
  $("body").css({ overflow: "visible" });
});

// =========   custom the open and close side nav      ======== //

function openSideBar() {
  $("#sideBar").animate({ left: 0 }, 500);

  $("#open-close-icon").removeClass("bx-menu");
  $("#open-close-icon").addClass("bx-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeSideBar() {
  let navTabWidth = $("#nav-tab").outerWidth();

  $("#sideBar").animate({ left: -navTabWidth }, 500);

  $("#open-close-icon").removeClass("bx-x");
  $("#open-close-icon").addClass("bx-menu");

  $(".links li").animate({ top: 300 }, 500);
}
closeSideBar();

$("#open-close-icon").click(() => {
  if ($("#nav-tab").css({ left: 0 }) === "0px") {
    closeSideBar();
  } else {
    openSideBar();
  }
});

// ====================================================================//

let dataContainer = document.getElementById("dataContainer");
let mealsContainer = document.getElementById("mealsContainer");
let searchContainer = document.getElementById("searchContainer");
let searchBars = document.getElementById("searchBars");
let searchResults = document.getElementById("searchResults");
let dataSearch = document.getElementById("dataSearch");

// ==========  Categories meals   =========== //

async function getCategories() {
  let urlApi = "https://www.themealdb.com/api/json/v1/1/categories.php";

  let res = await fetch(urlApi);

  res = await res.json();
  console.log(res.categories);
  ShowCategories(res.categories);
}
getCategories();

function ShowCategories(data) {
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(500);
  let dataContent = "";
  data.map((category) => {
    dataContent += `
      <div class="col-sm-12 col-md-6 col-lg-4 cursor-pointer">
        <div onclick="getCategoryMeals('${
          category.strCategory
        }')" class="meal position-relative overflow-hidden rounded-2">
            <img class="w-100" src="${
              category.strCategoryThumb
            }" alt="" srcset="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center flex-column text-black p-2">
                <h3>${category.strCategory}</h3>
                <p>${category.strCategoryDescription
                  .split(" ")
                  .slice(0, 15)
                  .join(" ")}</p>
            </div>
        </div>
      </div>
    `;
  });
  $(".data-loading-screen").fadeOut(500);

  dataContainer.innerHTML = dataContent;
}

// ==========  areas meals   =========== //

async function getArea() {
  let urlApi = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  let res = await fetch(urlApi);
  res = await res.json();

  console.log(res.meals);

  ShowArea(res.meals);
}

function ShowArea(data) {
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(500);

  let dataContent = "";
  data.map((area) => {
    dataContent += `
      <div class="col-sm-12 col-md-4 col-lg-3 cursor-pointer">
        <div onclick="getAreaMeals('${area.strArea}')" class="rounded-2 text-center text-white">
                <i class="fa-solid fa-house fa-4x"></i>
                <h3 class="">${area.strArea}</h3>
        </div>
      </div>
    `;
  });
  $(".data-loading-screen").fadeOut(500);
  dataContainer.innerHTML = dataContent;
}

// ==========  ingredients meals   =========== //

async function getIngredients() {
  let urlApi = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  let res = await fetch(urlApi);
  res = await res.json();

  console.log(res.meals);
  showIngredients(res.meals);
}

function showIngredients(data) {
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(500);
  let dataContent = "";

  data.map((ingredient) => {
    dataContent += `
      <div class="col-sm-12 col-md-6 col-lg-4  text-white cursor-pointer">
        <div onclick="getIngredientsMeals('${
          ingredient.strIngredient
        }')" class="rounded-2 text-center">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${ingredient.strIngredient}</h3>
             <p>${ingredient.strDescription
               ?.split(" ")
               ?.slice(0, 15)
               ?.join(" ")}
            </p>
        </div>
      </div>
    `;
  });
  $(".data-loading-screen").fadeOut(500);

  dataContainer.innerHTML = dataContent;
}
// ==========  get Meals   =========== //

function showMeals(data) {
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(500);

  let dataContent = "";
  data.map((meals) => {
    dataContent += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${meals.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meals.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 w-100">
                        <h3>${meals.strMeal}</h3>
                    </div>
                </div>
        </div>

    `;
  });
  $(".data-loading-screen").fadeOut(500);
  dataContainer.innerHTML = dataContent;
}

// =======
async function getCategoryMeals(data) {
  let urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`;

  let res = await fetch(urlApi);

  res = await res.json();

  console.log(res.meals);
  showMeals(res.meals);
}

// ========
async function getAreaMeals(data) {
  let urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`;

  let res = await fetch(urlApi);

  res = await res.json();

  console.log(res.meals);
  showMeals(res.meals);
}

// =====
async function getIngredientsMeals(data) {
  let urlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`;

  let res = await fetch(urlApi);

  res = await res.json();

  console.log(res.meals);
  showMeals(res.meals);
}

// ==========  search about meals   =========== //

async function searchByName(name) {
  closeSideBar();
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(300);

  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  res = await res.json();

  showMeals(res.meals);
  $(".data-loading-screen").fadeOut(300);
}

async function searchByLetter(letter) {
  closeSideBar();
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  res = await res.json();

  showMeals(res.meals);
  $(".data-loading-screen").fadeOut(300);
}

// ==========  details of the meal   =========== //

async function getMealDetails(id) {
  let urlApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  let res = await fetch(urlApi);

  res = await res.json();

  console.log(res.meals);
  showMealDetails(res.meals);
}

function showMealDetails(meal) {
  dataContainer.innerHTML = "";
  $(".data-loading-screen").fadeIn(300);

  let ingredients = "";
  // let index = 20;
  for (let i = 0; i <= 20; i++) {
    ingredients += `

    `;
    console.log(`${meal[`strIngredient${i}`]}`);
  }

  let dataContent = "";
  meal.map((meal) => {
    dataContent = `
    <div class="col-md-4">
      <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="" srcset="">
      <h2>${meal.strMeal}</h2>
      </div>
      <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient1}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient2}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient3}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient4}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient5}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient6}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient7}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient8}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient9}
            </li>
            <li class="alert alert-info m-2 p-1">
              ${meal.strIngredient10}
            </li>
          </ul>
          <a target="_blank" href="${
            meal.strSource
          }" class="btn btn-success">Source</a>
          <a target="_blank" href="${
            meal.strYoutube
          }" class="btn btn-danger">Youtube</a>
      </div>`;
  });

  dataContainer.innerHTML = dataContent;
  $(".data-loading-screen").fadeOut(300);
}

// ========== show contact us section    ========

function showContacts() {
  dataContainer.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
