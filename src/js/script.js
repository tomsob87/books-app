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
  const bookImage = bookList.querySelectorAll(select.bookList.bookImage);
  // console.log(bookImage)

  function initActions (){
    for (let i=0; i < bookImage.length; i++) {
      // console.log(bookImage[i]);

      const clickedBook = bookImage[i];

      clickedBook.addEventListener('dblclick', function(event){
        event.preventDefault();
        clickedBook.classList.toggle(classNames.bookList.favoriteBook);
        const bookId = clickedBook.getAttribute('data-id');
        // console.log(bookId);
        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
        } else {
          const indexOfElementToDelete = favoriteBooks.indexOf(bookId);
          // console.log(indexOfElementToDelete);
          favoriteBooks.splice(indexOfElementToDelete, 1);
        }
        
        console.log(favoriteBooks);
      });

    }
    
  }
  
  initActions();
}