
//nav icon
let navWidth = $('.inner').outerWidth()
$('#open').click(function () {
  new WOW().init();
  $('nav').animate({ left: "0" }, 700)
  $('.fa-x').css('display', 'block')
  $('.fa-bars').css('display', 'none')

})
$('#close').click(function () {
  $('nav').animate({ left: "-206.734" }, 700)
  $('.fa-x').css('display', 'none')
  $('.fa-bars').css('display', 'block')

})
// new WOW().init();


$('nav a').click(function () {
  if ($('nav').css('left') == "0px") {
    $('nav').animate({ left: "-206.734" }, 700)
    $('.fa-x').css('display', 'none')
    $('.fa-bars').css('display', 'block')

  }

})


//get All Data
async function getData(link, showFun) {
  $('.loading-div').fadeIn(100)

  let resp = await fetch(link)
  let data = await resp.json()
  $(data).ready(function () {
    $('.loading-div').fadeOut(100)

  });
  console.log(data);
  showFun(data)
}

def

function def(data) {
  //filling the row with data
  let cartoona = '';
  for (let i = 0; i < data.meals.length; i++) {
    cartoona += ` 
      <div class="col-md-3 theMeal " idMeal='${data.meals[i].idMeal}' >
    <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
     <div class="layer  text-center bg-white w-100 h-100 position-absolute">
     <h3>${data.meals[i].strMeal}</h3>
     </div>
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="">
    </div>
   </div>
  `
  }
  document.getElementById('rowMain').innerHTML = cartoona;

  mealInfo()

}
getData('https://www.themealdb.com/api/json/v1/1/filter.php?a=American', def)

//search
function searchItem() {
  let cartoona = `
  <div class="col-md-6 ">
     <input type="text" class="form-control " id="searchName" placeholder="Search by name..">
    </div>
   <div class="col-md-6 ">
     <input type="text" class="form-control" maxlength="1" id="searchLetter" placeholder="Search by letter..">
    </div>
    <div class="row g-1 my-5" id="searchResult">
   
  </div>
  `
  document.getElementById('rowMain').innerHTML = cartoona;
}


function mealInfo() {
  $('.theMeal').click(function () {

    let idMeal = $(this).attr('idMeal')

    function mealDetail(data) {
      //split string
      let mealTags = data.meals[0].strTags
      if (mealTags != null) {
        var mealTagssplit = mealTags.split(',')
        console.log(mealTagssplit);

      }
      let cartoona = '';
      cartoona = `
        <div class="col-md-4 rounded-3 overflow-hidden">
        <img src="${data.meals[0].strMealThumb}" class="rounded-3 w-100">
        <h2 class="text-white fa-3x">${data.meals[0].strMeal}</h2>
      </div>
      <div class="col-md-8 text-white">
        <div class="m-5 mt-0">
          <h2>Instructions</h2>
          <p>${data.meals[0].strInstructions} </p>
          <h3><span>Area</span> : ${data.meals[0].strArea}</h3>
          <h3><span>Category</span> : ${data.meals[0].strCategory}</h3>
          <h3><span>Recipes</span> :</h3>
          <ul class=" ms-0 ps-0 list-unstyled">
            <li class="btn btn-info m-1">${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</li>
            <li class="btn btn-info m-1">${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</li>
            <li class="btn btn-info m-1">${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</li>
            <li class="btn btn-info m-1">${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</li>
            <li class="btn btn-info m-1">${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</li>
            <li class="btn btn-info m-1">${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</li>
            <li class="btn btn-info m-1">${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</li>               
            </ul>
            <h3 >Tags :</h3>
            <ul id="tags" class="ms-0 ps-0 list-unstyled">

          </ul>

   
          <a href="${data.meals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
          <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
        </div>
      </div>
`

      document.getElementById('rowMain').innerHTML = cartoona;

    }//end mealDetail

    getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, mealDetail)
  })
}











$('#Search').click(function () {
  searchItem()


  $('#searchName').keyup(function () {
    let mealNameSearch = $('#searchName').val()

    function searchNameKeyup(data) {
      //filling the row with data
      let cartoona = '';
      for (let i = 0; i < data.meals.length; i++) {
        cartoona += ` 
           <div class="col-md-3 theMeal" idMeal='${data.meals[i].idMeal}' >
      <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
       <div class="layer text-center bg-white w-100 h-100 position-absolute">
       <h3>${data.meals[i].strMeal}</h3>
       </div>
          <img src="${data.meals[i].strMealThumb}" class="w-100" alt="">
      </div>
     </div>
      `
      }
      document.getElementById('searchResult').innerHTML = cartoona
      mealInfo()
    }

    getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealNameSearch}`, searchNameKeyup)


  })//keyup

  //search letter
  $('#searchLetter').keyup(function () {
    let mealLetterSearch = $('#searchLetter').val()
    function searchLetterKeyup(data) {
      //filling the row with data
      let cartoona = '';
      for (let i = 0; i < data.meals.length; i++) {
        cartoona += `    <div class="col-md-3 theMeal" idMeal='${data.meals[i].idMeal}' >
      <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
       <div class="layer text-center bg-white w-100 h-100 position-absolute">
       <h3>${data.meals[i].strMeal}</h3>
       </div>
          <img src="${data.meals[i].strMealThumb}" class="w-100" alt="">
      </div>
     </div>
      `
      }
      document.getElementById('searchResult').innerHTML = cartoona;
      mealInfo()

    }

    getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealLetterSearch}`, searchLetterKeyup)


  })//keyup
})//main









//category//////////////////////////////////////////////////////////////////////////////////////////
function showCatData(data) {
  let cartoona = '';
  //split string

  for (let i = 0; i < data.categories.length; i++) {
    let catSplit;
    if (data.categories[i].strCategoryDescription != null) {
      let spl = data.categories[i].strCategoryDescription.split(" ", 15)
      catSplit = spl.join(" ")
    }
    cartoona += `
    <div class="col-md-3 catItem p-2" mealCatName='${data.categories[i].strCategory}'>
    <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
    <div class="layer text-center bg-white w-100 h-100 position-absolute">
    <h3>${data.categories[i].strCategory}</h3>
                <p> ${catSplit} </p>
                </div>
                <img src="${data.categories[i].strCategoryThumb}" class="w-100" alt="">
                
                </div>
                </div>
                `
  }


  document.getElementById('rowMain').innerHTML = cartoona

  //if click on someone //////////////////////////////////////////////////////////
  $('.catItem').click(function () {
    $('.loading-div').fadeIn(300)

    let mealCatName = $(this).attr('mealCatName');
    //this category meals data
    async function getCatData(mealCatName) {
      let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCatName}`)
      let catDetData = await resp.json()
      $(catDetData).ready(function () {
        $('.loading-div').fadeOut(300);
      })

      let cartoona = '';

      for (let i = 0; i < catDetData.meals.length; i++) {
        cartoona += `
             <div class="col-md-3 theMeal " idMeal='${catDetData.meals[i].idMeal}' >
              <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
               <div class="layer  text-center bg-white w-100 h-100 position-absolute">
               <h3>${catDetData.meals[i].strMeal}</h3>
               </div>
                  <img src="${catDetData.meals[i].strMealThumb}" class="w-100" alt="">
              </div>
             </div>
        `
      }
      document.getElementById('rowMain').innerHTML = cartoona;
      //meal detail/////////////////////////////////////////////////////////
      mealInfo()

    }
    getCatData(mealCatName)
  })
}//main

$('#Categories').click(function () {

  getData("https://www.themealdb.com/api/json/v1/1/categories.php", showCatData)


}
)




//Area//////////////////////////////////////////////////////////////////////////////////////////////////////


function showAreaData(data) {
  let cartoona = '';
  for (let i = 0; i < data.meals.length; i++) {
    cartoona += `
    <div class="col-md-3 areaItem" mealAreaName='${data.meals[i].strArea}'>
        <div class="rounded-3 d-flex align-items-center flex-column  m-3  p-0 overflow-hidden bg-danger position-relative">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${data.meals[i].strArea}</h3>
          </div>
          </div>
                `
  }


  document.getElementById('rowMain').innerHTML = cartoona

  //if click on someone //////////////////////////////////////////////////////////
  $('.areaItem').click(function () {
    $('.loading-div').fadeIn(300)

    let mealAreaName = $(this).attr('mealAreaName');
    //this category meals data
    async function getareaData(mealAreaName) {
      let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealAreaName}`)
      let areaDetData = await resp.json()
      // console.log(areaDetData);
      $(areaDetData).ready(function () {
        $('.loading-div').fadeOut(300);
      })

      let cartoona = '';
      document
      for (let i = 0; i < areaDetData.meals.length; i++) {
        cartoona += `
             <div class="col-md-3 theMeal" idMeal='${areaDetData.meals[i].idMeal}' >
              <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
               <div class="layer  text-center bg-white w-100 h-100 position-absolute">
               <h3>${areaDetData.meals[i].strMeal}</h3>
               </div>
                  <img src="${areaDetData.meals[i].strMealThumb}" class="w-100" alt="">
              </div>
             </div>
        `
      }
      document.getElementById('rowMain').innerHTML = cartoona;
      //meal detail/////////////////////////////////////////////////////////

      mealInfo()

    }
    getareaData(mealAreaName)
  })
}//main

$('#Area').click(function () {

  getData("https://www.themealdb.com/api/json/v1/1/list.php?a=list", showAreaData)


}
)



















//Ingradients//////////////////////////////////////////////////////////////////////////////////////////////


function showIngData(data) {
  let cartoona = '';
  for (let i = 0; i < 20; i++) {
    //split the Ingradients string
    let ingradSplit;
    if (data.meals[i].strDescription != null) {
      let spl = data.meals[i].strDescription.split(" ", 20)
      ingradSplit = spl.join(" ")
    }
    cartoona += `
    <div class="col-md-3 ingItem" mealIngName='${data.meals[i].strIngredient}'>
    <div class="rounded-3 d-flex align-items-center flex-column  m-3  p-0 overflow-hidden bg-danger position-relative">
      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3>${data.meals[i].strIngredient}</h3>
      <p class='p-2 text-center' >${ingradSplit}...</p>
    </div>
  </div>
                `
  }


  document.getElementById('rowMain').innerHTML = cartoona

  //if click on someone //////////////////////////////////////////////////////////
  $('.ingItem').click(function () {
    $('.loading-div').fadeIn(300)

    let mealIngName = $(this).attr('mealIngName');
    console.log(mealIngName);
    //this Ing  meals data
    async function getIngData(mealIngName) {
      let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngName}`)
      let ingDetData = await resp.json()
      console.log(ingDetData);
      $(ingDetData).ready(function () {
        $('.loading-div').fadeOut(300);
      })

      let cartoona = '';
      document
      for (let i = 0; i < ingDetData.meals.length; i++) {
        cartoona += `
             <div class="col-md-3 theMeal " idMeal='${ingDetData.meals[i].idMeal}' >
              <div class="rounded-3  m-3 p-0 overflow-hidden bg-danger position-relative">
               <div class="layer  text-center bg-white w-100 h-100 position-absolute">
               <h3>${ingDetData.meals[i].strMeal}</h3>
               </div>
                  <img src="${ingDetData.meals[i].strMealThumb}" class="w-100" alt="">
              </div>
             </div>
        `
      }
      document.getElementById('rowMain').innerHTML = cartoona;
      //meal detail/////////////////////////////////////////////////////////
      mealInfo()

    }

    getIngData(mealIngName)
  })
}//main

$('#Ingradients').click(function () {

  getData("https://www.themealdb.com/api/json/v1/1/list.php?i=list", showIngData)


}
)


//contact us
function showContFun() {
  let cartoona = '';


  cartoona += `     
   <div class="d-flex col-md-6 flex-column">
  <input type="text" id='nome' class="form-control " placeholder="Enter your name..">
  <div class="alert noem alert-danger text-center ">Special characters and numbers not allowed</div>
</div>
<div class="d-flex col-md-6 flex-column">
<input type="text" id='emol' class="form-control " placeholder="Enter your Email..">
  <div class="alert emlo alert-danger text-center ">Special characters and numbers not allowed</div>
</div>
<div class="d-flex col-md-6 flex-column">
<input type="text" id='fone' class="form-control " placeholder="Enter your Phone..">
  <div class="alert foen alert-danger text-center ">Special characters and numbers not allowed</div>
</div>
<div class="d-flex col-md-6 flex-column">
<input type="text" id='age' class="form-control " placeholder="Enter your Age..">
  <div class="alert aeg alert-danger text-center ">Special characters and numbers not allowed</div>
</div>
<div class="d-flex col-md-6 flex-column">
<input type="text" id='pass' class="form-control " placeholder="Enter your password..">
  <div class="alert passo alert-danger text-center  ">Special characters and numbers not allowed</div>
</div>
<div class="d-flex col-md-6 flex-column">
<input type="text" id='repass' class="form-control " placeholder="Enter your RePassword..">
  <div class="alert repasso alert-danger text-center  ">Special characters and numbers not allowed</div>
</div>

<button class="btn  btn-outline-danger disabled col-md-4 m-auto my-4">submit</button>
    `
  document.getElementById('rowMain').innerHTML = cartoona
}

let nameReg = /^[a-z A-Z]{1,}$/
let emailReg = /^[a-z A-Z \d]{1,}@[a-z]{1,10}\.[a-z]{1,5}$/
let passReg = /^[a-z A-Z \d]{8,}$/
let ageReg = /^\d{1,2}$/
let phoneReg = /^(012|010|011|015)[0-9]{8}$/



$('#Contactus').click(function () {
  $('.loading-div').fadeOut(100)

  showContFun()
  $('#nome').keyup(function () {
    if (nameReg.test($('#nome').val())) {
      // console.log('ye')
      console.log($('.noem'));
      $('.noem').css("display", 'none');


    } else {
      $('.noem').css("display", 'block');
      console.log('no');
    }
  })
  $('#emol').keyup(function () {
    if (emailReg.test($('#emol').val())) {
      // console.log('ye')
      console.log($('.emlo'));
      $('.emlo').css("display", 'none');


    } else {
      $('.emlo').css("display", 'block');
      console.log('no');
    }
  })
  $('#fone').keyup(function () {
    if (phoneReg.test($('#fone').val())) {
      // console.log('ye')
      console.log($('.foen'));
      $('.foen').css("display", 'none');


    } else {
      $('.foen').css("display", 'block');
      console.log('no');
    }
  })
  $('#age').keyup(function () {
    if (ageReg.test($('#age').val())) {
      // console.log('ye')
      console.log($('.aeg'));
      $('.aeg').css("display", 'none');


    } else {
      $('.aeg').css("display", 'block');
      console.log('no');
    }
  })
  $('#pass').keyup(function () {
    if (passReg.test($('#pass').val())) {
      // console.log('ye')
      console.log($('.passo'));
      $('.passo').css("display", 'none');


    } else {
      $('.passo').css("display", 'block');
      console.log('no');
    }
  })
  $('#repass').keyup(function () {
    if ($('#pass').val() == $('#repass').val()) {
      // console.log('ye')
      console.log($('.repasso'));
      $('.repasso').css("display", 'none');


    } else {
      $('.repasso').css("display", 'block');
      console.log('no');
    }
  })
  console.log($('input').val());
  if ($('input').val() != "") {
    console.log('x');
  } else {
    console.log('m')
  }
})


















//search field//done
//item on click
//contact
//click on nav item colse it
//some egory doesnt work
//string cut in egory
//wow jquery

















