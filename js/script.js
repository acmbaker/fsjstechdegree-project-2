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
   let html = '';
   let pageno = parseInt(page);

   if (pageno === numberofbuttons) {
      endindex = list.length;
   }

   sl.innerHTML = '';

   for (let i = startindex; i < endindex; i++) {
      html += `
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${data[i].picture.thumbnail}" alt="Profile Picture">
            <h3>${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">${data[i].registered.date}</span>
         </div>
      </li>`;
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
            <button type="button">${i+1}</button>
         </li>
         `;
   }
   linklist.insertAdjacentHTML('beforeend', html);

   let firstbutton = document.querySelector('li > button');
   firstbutton.classList.add("active");

   linklist.addEventListener('click', (e) => {
      let pageclicker = e.target;
      if (pageclicker.tagName === 'BUTTON') {
         let currentactive = document.querySelector('.active');
         currentactive = currentactive.classList.remove('active');
         pageclicker.classList.add("active");
         let pagenumber = pageclicker.textContent;
         showPage(data, pagenumber);
      }
   });
}

 // The search component function.

 function searchFilter() {
   let searchbox = document.querySelector('header.header');
   let html = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
   searchbox.insertAdjacentHTML('beforeend', html);

   searchbox.addEventListener('keyup', (e) => {
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

      //found this single line of code from stack overflow
      const final = datalist.map(x=>data[x]);
      console.log(final);
      addPagination(final);
   });
 }

// Call functions
addPagination(data);
searchFilter();