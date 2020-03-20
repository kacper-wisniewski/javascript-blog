{
    'use strict';

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optTagsSelector = '.post-tags .list';

    const generateTitleList = function(){
        
        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* [Done] for each article */

        const articles = document.querySelectorAll(optArticleSelector);

        for(let article of articles){
        
            /* [DONE] get the article id */

            const articleId = '#' + article.getAttribute('id');

            /* [DONE] find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /*  [DONE] create HTML of the link */

            const createdLink = '<li><a href="' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            
            /* [DONE] insert link into titleList */

            titleList.innerHTML += createdLink;
        }

    };

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
    };

    function generateTags(){
        /* [DONE] find all articles */
        
        const articles = document.querySelectorAll(optArticleSelector);

        /* [DONE] START LOOP: for every article: */

        for(let article of articles){
        
            /* [DONE] find tags wrapper */
            
            const tagsWrapper = article.querySelector(optTagsSelector);
        
            /* [DONE] get tags from data-tags attribute & split tags into array*/
            
            const tagsArray = article.getAttribute('data-tags').split(' ');

            /* [DONE] START LOOP: for each tag */
            
            for(let tag of tagsArray){

                /* [DONE] generate HTML of the link */
        
                const tagLink = '<li><a href="#">' + tag + '</a></li>';

                /* [DONE] insert HTML of all the links into the tags wrapper */
        
                tagsWrapper.innerHTML += tagLink;

                /* [DONE] END LOOP: for each tag */
            
            }
      
            /* [DONE] END LOOP: for every article: */

        }
    }
    
    function tagClickHandler(event){

        /* prevent default action for this event */
        
        /* make new constant named "clickedElement" and give it the value of "this" */

        /* make a new constant "href" and read the attribute "href" of the clicked element */

        /* make a new constant "tag" and extract tag from the "href" constant */

        /* find all tag links with class active */

        /* START LOOP: for each active tag link */

            /* remove class active */

        /* END LOOP: for each active tag link */

        /* find all tag links with "href" attribute equal to the "href" constant */

        /* START LOOP: for each found tag link */

            /* add class active */

        /* END LOOP: for each found tag link */

        /* execute function "generateTitleLinks" with article selector as argument */
    }

    function addClickListenersToTags(){
        /* find all links to tags */

        /* START LOOP: for each link */

            /* add tagClickHandler as event listener for that link */

        /* END LOOP: for each link */
    }

    addClickListenersToTags();

    generateTags();

    generateTitleList();

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}