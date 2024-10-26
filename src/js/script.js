{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const bookList = document.querySelector(select.containerOf.bookList);

  function render(){
    for (let bookParam of dataSource.books) {
      // console.log(bookParam.name, bookParam);
      const generatedHTML = templates.bookTemplate(bookParam);
      // console.log(generatedHTML);

      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      // console.log(generatedDOM);

      bookList.appendChild(generatedDOM);
    }
  }

  render();


  // Include generated DOM in .books-list using appendChild

}