{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    bookList: {
      book: '.book',
      bookImage: '.book__image',
    },
  };

  const classNames = {
    bookList: {
      favoriteBook: 'favorite',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const bookList = document.querySelector(select.containerOf.bookList);

  function render(){
    for (let bookParam of dataSource.books) {
      const generatedHTML = templates.bookTemplate(bookParam);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(generatedDOM);
    }
  }

  render();

  const favoriteBooks = [];

  function initActions (){

    bookList.addEventListener('click', function(event){
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
        console.log(favoriteBooks);
      }
    });
  } 
  
  initActions();

}
