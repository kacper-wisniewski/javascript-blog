{
    'use strict';

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optTagsSelector = '.post-tags .list',
        optAuthorSelector = '.post-author';

    const generateTitleList = function(customSelector='') {
        
        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* [Done] for each article */

        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        for(let article of articles) {
        
            /* [DONE] get the article id */

            const articleId = '#' + article.getAttribute('id');

            /* [DONE] find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /*  [DONE] create HTML of the link */

            const createdLink = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;
            
            /* [DONE] insert link into titleList */

            titleList.innerHTML += createdLink;
        }

    };

    const titleClickHandler = function(event) {
        event.preventDefault();

        const clickedElement = this;
        
        /* [DONE] remove class 'active' from all article links  */

        const linksActive = document.querySelectorAll('.titles a.active');

        for(let linkActive of linksActive) {
            linkActive.classList.remove('active');
        }
      
        /* [DONE] add class 'active' to the clicked link */
      
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */

        const articlesActive = document.querySelectorAll('.post.active');
        for(let articleActive of articlesActive) {

            articleActive.classList.remove('active');

        }
      
        /* [DONE] get 'href' attribute from the clicked link */
        
        const articleSelector = this.getAttribute('href');
      
        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const articleTarget = document.querySelector(articleSelector);
      
        /* [DONE] add class 'active' to the correct article */

        articleTarget.classList.add('active');
    };

    function titleEventListener() {
        const links = document.querySelectorAll('.titles a');

        for(let link of links) {

            link.addEventListener('click', titleClickHandler);
            
        }  
    }

    function generateTags() {
        /* [DONE] find all articles */
        
        const articles = document.querySelectorAll(optArticleSelector);

        /* [DONE] START LOOP: for every article: */

        for(let article of articles) {
        
            /* [DONE] find tags wrapper */
            
            const tagsWrapper = article.querySelector(optTagsSelector);
        
            /* [DONE] get tags from data-tags attribute & split tags into array*/
            
            const tagsArray = article.getAttribute('data-tags').split(' ');

            /* [DONE] START LOOP: for each tag */
            
            for(let tag of tagsArray) {

                /* [DONE] generate HTML of the link */
        
                const tagLink = `<li><a href="#tag-${tag}">${tag}</a></li>`;

                /* [DONE] insert HTML of all the links into the tags wrapper */
        
                tagsWrapper.innerHTML += tagLink;

                /* [DONE] END LOOP: for each tag */
            
            }
      
            /* [DONE] END LOOP: for every article: */

        }
    }

    function generateAuthor() {
        
        /* [DONE] find all articles */

        const articles = document.querySelectorAll(optArticleSelector);

        /* [DONE] for each article */

        for(let article of articles) {

            /* [DONE] find author wrapper */

            const authorWrapper = article.querySelector(optAuthorSelector);

            /* [DONE] find author of article */

            const authorData = article.getAttribute('data-author');

            /* [DONE] add author to html */

            authorWrapper.innerHTML = `<a href="#author-${authorData}">by ${authorData}</a>`;
        }
    }
    
    function addClickListenersToTags(){
        /* find all links to tags */
        
        const tagLinks = document.querySelectorAll('.post-tags a');

        /* START LOOP: for each link */
        
        for(let tagLink of tagLinks){
        
            /* add tagClickHandler as event listener for that link */
      
            tagLink.addEventListener('click', tagClickHandler);

            /* END LOOP: for each link */
        }
    }

    function tagClickHandler(event){
        /* prevent default action for this event */
        
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
      
        const href = clickedElement.getAttribute('href');
        
        /* make a new constant "tag" and extract tag from the "href" constant */
      
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */

        const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"');
      
        /* START LOOP: for each active tag link */
        
        for(let tagLinkActive of tagLinksActive){

            /* remove class active */

            tagLinkActive.classList.remove('active');

        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        
        const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

        /* START LOOP: for each found tag link */
        for(let tagLink of tagLinks){
            /* add class active */
            tagLink.classList.add('active');
        /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */

        generateTitleList(`[data-tags~="${tag}"]`);
    }

    function authorClickHandler(event) {

        event.preventDefault();

        const clickedElement = this;

        const href = clickedElement.getAttribute('href');

        const author = href.replace('#author-', '');

        const authorLinksActive = document.querySelectorAll('a.active[href^="#author-"');

        for(let authorLinkActive of authorLinksActive) {

            authorLinkActive.classList.remove('active');

        }

        const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

        for(let authorLink of authorLinks) {

            authorLink.classList.add('active');

        }
        
        generateTitleList(`[data-author="${author}"]`);
        
    }

    function authorEventListener() {

        const authorLinks = document.querySelectorAll('.post-author a');

        for(let authorLink of authorLinks) {

            authorLink.addEventListener('click', authorClickHandler);

        }

    }

    generateTitleList();

    generateTags();

    generateAuthor();
    
    titleEventListener();

    addClickListenersToTags();
    
    authorEventListener();

}