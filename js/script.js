/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
let itemsPerPage = 9;
let clicked = 0;

//Displaying a page
function showPage(list, page) {
   //declaring variables
   let numberOfButtons = Math.ceil(list.length / itemsPerPage);
   let studentList = document.querySelector('ul.student-list');
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   let mainTitle = document.querySelector('header > h2');
   mainTitle.style.color = '#fff';
   let html = '';
   let pageNo = parseInt(page);

   if (pageNo === numberOfButtons) {
      endIndex = list.length;
   }

   studentList.innerHTML = '';

  console.log("Index button clicked! Click count: ", clicked);
  clicked++;
  console.log("Current startindex value: ", startIndex);

   //for loop based on how many entries are in the list
   if ( list.length >= 1 ) {
      for (let i = startIndex; i < endIndex; i++) {
         console.log("Current i value in loop: ", list[i]);
         html += `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
               <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">${list[i].registered.date}</span>
            </div>
         </li>`;
      }
   }  else if ( list.length === 0 ){
         html = `<h2 style="text-align:center;color:#fff;">Nothing to see here. Try again.</h2>`;
      }

   studentList.insertAdjacentHTML('beforeend', html);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

//Pagination buttons
function addPagination(list) {
   let numberOfButtons = Math.ceil(list.length / itemsPerPage);

   let linkList = document.querySelector('ul.link-list');
   let html = '';

   linkList.innerHTML = '';

   for (let i = 0; i < numberOfButtons; i++) {
      html += `
         <li>
            <button type="button" style="margin-bottom:20px;color: #fff;background-color:rgba(0, 0, 0, 0.2);">${i+1}</button>
         </li>
         `;
   }
   linkList.insertAdjacentHTML('beforeend', html);

   if ( list.length >= 1) {
      let firstButton = document.querySelector('li > button');
      firstButton.classList.add("active");
   }

   linkList.addEventListener('click', (e) => {
      let pageClicker = e.target;
      if (pageClicker.tagName === 'BUTTON') {
         let currentActive = document.querySelector('.active');
         currentActive = currentActive.classList.remove('active');
         pageClicker.classList.add("active");
         let pageNumber = pageClicker.textContent;
         showPage(list, pageNumber);
      }
   });
}

 //The search component function - exceeded expactions feature.
 function searchFilter() {
   let searchBox = document.querySelector('header.header');
   let html = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name..." style="border:none;">
      <button type="button" style="background:rgba(0, 0, 0, 0.2)!important;border:none;"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   searchBox.insertAdjacentHTML('beforeend', html);

   let searchButton = document.querySelector('header.header > label > button');
   
   searchButton.addEventListener('click', (e) => {
      searcher();
   });

   searchBox.addEventListener('keyup', (e) => {
      searcher();
   });
 }

//So I didn't have to write the 2 x add event listener code.
 function searcher() {
      let entry = document.querySelector('input');
      let evalue = entry.value;
      evalue = evalue.toUpperCase();
      let dataList = [];
      for (let i = 0; i < data.length; i++) {
         let filter = data[i].name.first;
         if (filter.toUpperCase().indexOf(evalue) > -1) {
         dataList.push(i);
         }
      }
   let final = dataList.map(x=>data[x]);
   //Add pagination for search results.
   addPagination(final);
}

// Call functions
showPage(data,1);
addPagination(data);
searchFilter();