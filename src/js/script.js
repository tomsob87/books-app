{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
    bookList: {
      book: '.book',
      bookImage: '.book__image',
    },
  };

  const classNames = {
    bookList: {
      favoriteBook: 'favorite',
      hidden: 'hidden',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const bookList = document.querySelector(select.containerOf.bookList);
  const filterForm = document.querySelector(select.containerOf.filters);
  
  function determineRatingBgc (rating){
    for (let bookParam of dataSource.books){

      let bgcValue = '';

      if(rating < 6){
        bgcValue = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        bgcValue = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        bgcValue = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        bgcValue = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return bgcValue;
    }
  }

  function render(){
    for (let bookParam of dataSource.books) {

      const ratingWidth = bookParam.rating * 10;
      bookParam['ratingWidth'] = ratingWidth;

      const ratingBgc = determineRatingBgc(bookParam.rating);
      // console.log(ratingBgc);
      bookParam['ratingBgc'] = ratingBgc;

      const generatedHTML = templates.bookTemplate(bookParam);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
     


      bookList.appendChild(generatedDOM);   
      
    }
  }

  render();



  const filters = [];
  const favoriteBooks = [];


  // Hiding books function start here

  function filterBooks(){
    for (let bookParam of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if(!bookParam.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      if(shouldBeHidden == true) {
        const bookImageToHide = document.querySelector(select.bookList.bookImage + '[data-id="' + bookParam.id + '"]');
        bookImageToHide.classList.add(classNames.bookList.hidden);
      } else {
        const bookImageToShow = document.querySelector(select.bookList.bookImage + '[data-id="' + bookParam.id + '"]');
        bookImageToShow.classList.remove(classNames.bookList.hidden);
      }

    }
  }
  
  
  // document.querySelector(select.bookList.bookImage + '[data-id="' + bookParam.id + '"]');

  function initActions (){

    bookList.addEventListener('dblclick', function(event){
      // console.log(event.target.parentElement.parentElement);
      // console.log(event.target.offsetParent);

      const clickedBook = event.target.offsetParent;

      if(clickedBook.classList.contains('book__image')){
        event.preventDefault();
        
        clickedBook.classList.toggle(classNames.bookList.favoriteBook);

        const bookId = clickedBook.getAttribute('data-id');
        
        if(!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
        } else {
          const indexOfElementToDelete = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfElementToDelete, 1);
        }
        // console.log(favoriteBooks);
      }
    });

    filterForm.addEventListener('click', function(event) {
      const clickedFilter = event.target;
      // console.log(clickedFilter);

      if(clickedFilter.type == 'checkbox' && clickedFilter.name == 'filter' && clickedFilter.tagName == 'INPUT'){
        // console.log(clickedFilter.value);
        if(clickedFilter.checked) {
          // console.log('zaznaczony');
          filters.push(clickedFilter.value);
        } else {
          const indexOfElementToDelete = filters.indexOf(clickedFilter.value);
          filters.splice(indexOfElementToDelete, 1);
        }
        
      }
      filterBooks();
      // console.log(filters);
    });
    
  } 
  
  
  initActions();

  



}
