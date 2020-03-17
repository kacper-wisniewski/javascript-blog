{
    'use strict';
    
    const titleClickHandler = function(event){
        event.preventDefault();

        const clickedElement = this;
        
        /* [DONE] remove class 'active' from all article links  */

        const linksActive = document.querySelectorAll('.titles a.active');

        for(let linkActive of linksActive){
            linkActive.classList.remove('active');
        }
      
        /* [DONE] add class 'active' to the clicked link */
      
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */

        const articlesActive = document.querySelectorAll('.post.active');
        for(let articleActive of articlesActive){
            articleActive.classList.remove('active');
        }
      
        /* [DONE] get 'href' attribute from the clicked link */
        
        const articleSelector = this.getAttribute('href');
      
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const articleTarget = document.querySelector(articleSelector);
      
        /* [DONE] add class 'active' to the correct article */

        articleTarget.classList.add('active');
    }

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}