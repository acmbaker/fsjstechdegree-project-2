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
let itemsperpage = 9;

function showPage(list, page) {
   let numberofbuttons = Math.ceil(list.length / itemsperpage);
   let sl = document.querySelector('ul.student-list');
   let startindex = (page * itemsperpage) - itemsperpage;
   let endindex = page * itemsperpage;
   let maintitle = document.querySelector('header > h2');
   maintitle.style.color = '#fff';
   let html = '';
   let pageno = parseInt(page);

   if (pageno === numberofbuttons) {
      endindex = list.length;
   }

   sl.innerHTML = '';

   if ( list.length >= 1 ) {
      for (let i = startindex; i < endindex; i++) {
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

   sl.insertAdjacentHTML('beforeend', html);
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let numberofbuttons = Math.ceil(list.length / itemsperpage);

   showPage(list, 1);

   let linklist = document.querySelector('ul.link-list');
   let html = '';

   linklist.innerHTML = '';

   for (let i = 0; i < numberofbuttons; i++) {
      html += `
         <li>
            <button type="button" style="margin-bottom:20px;color: #fff;background-color:rgba(0, 0, 0, 0.2);">${i+1}</button>
         </li>
         `;
   }
   linklist.insertAdjacentHTML('beforeend', html);

   if ( list.length >= 1) {
      let firstbutton = document.querySelector('li > button');
      firstbutton.classList.add("active");
   }

   linklist.addEventListener('click', (e) => {
      let pageclicker = e.target;
      if (pageclicker.tagName === 'BUTTON') {
         let currentactive = document.querySelector('.active');
         currentactive = currentactive.classList.remove('active');
         pageclicker.classList.add("active");
         let pagenumber = pageclicker.textContent;
         showPage(list, pagenumber);
      }
   });
}

 //The search component function.
 function searchFilter() {
   let searchbox = document.querySelector('header.header');
   let html = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   searchbox.insertAdjacentHTML('beforeend', html);

   let searchbutton = document.querySelector('header.header > label > button');
   
   let entry = document.querySelector('input');
   let evalue = entry.value;
   searchbutton.addEventListener('click', (e) => {
      searcher();
   });

   searchbox.addEventListener('keyup', (e) => {
      searcher();
   });
 }

//So I didn't have to write the 2 x add event listener code.
 function searcher() {
      let entry = document.querySelector('input');
      let evalue = entry.value;
      evalue = evalue.toUpperCase();
      let datalist = [];
      for (let i = 0; i < data.length; i++) {
         let filter = data[i].name.first;
         if (filter.toUpperCase().indexOf(evalue) > -1) {
         datalist.push(i);
         }
      }
   let final = datalist.map(x=>data[x]);
   addPagination(final);
}

//Call background styling from: https://1stwebdesigner.com/15-css-background-effects/
document.querySelector('body');

// Call functions
addPagination(data);
searchFilter();