{
    
    'use strict';
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optTagsSelector = '.post-tags .list',
        optAuthorSelector = '.post-author',
        optTagListSelector = '.tags.list',
        optCloudClassCount = '3',
        optCloudClassPrefix = 'tag-size-';

    function titleEventListener() {
         const links = document.querySelectorAll('.titles a');
    
        for(let link of links) {
    
            link.addEventListener('click', titleClickHandler);
                
        }  
    }
    
    const generateTitleList = function(customSelector='') {
        
        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* [Done] for each article */

        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        const parentContainer = document.querySelector('.list.titles');

        for(let article of articles) {
        
            /* [DONE] get the article id */

            const articleId = '#' + article.getAttribute('id');

            /* [DONE] find the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /*  [DONE] create HTML of the link */

            //const createdLink = `<li><a href="${articleId}"><span>${articleTitle}</span></a></li>`;

            const linkHTMLData = {id: articleId, title: articleTitle};
            const linkHTML = templates.articleLink(linkHTMLData);

            parentContainer.insertAdjacentHTML('beforeend', linkHTML);

            /* [DONE] insert link into titleList */

            //titleList.innerHTML += createdLink;
        }

        parentContainer.querySelector('a').classList.toggle('active');

        titleEventListener();
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
        
        const tagCloudLinks = document.querySelectorAll('.tags a');

        for(let tagCloudLink of tagCloudLinks) {

            tagCloudLink.addEventListener('click', tagClickHandler);

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

        const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
      
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

        const authorListLinks = document.querySelectorAll('.authors a') 

        for(let authorListLink of authorListLinks) {

            authorListLink.addEventListener('click', authorClickHandler);

        }

    }

    function calculateTagsParams(tags) {
        let params = {
            min: 999999,
            max: 0
        };
        for(let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }

        return params;
    }

    function calculateTagClass(count, params) {
        
        let tagClass = optCloudClassPrefix;

        let classCount = Math.floor((count - params.min)/(params.max - params.min) * (optCloudClassCount - 1) + 1);

        tagClass += classCount;
        
        return tagClass
    }

    function generateTagsList() {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = {};
      
        /* find all articles */
        
        const articles = document.querySelectorAll(optArticleSelector);

        const tagsWrapper = document.querySelector(optTagListSelector);

        /* START LOOP: for every article: */

        for(let article of articles) {

            /* get tags from data-tags attribute */
        
            /* split tags into array */
        
            const tagsArray = article.getAttribute('data-tags').split(' ');

            /* START LOOP: for each tag */
            
            for(let tag of tagsArray){
        
                const tagLink = tag;
        
                /* [NEW] check if this link is NOT already in allTags */
                
                if(!allTags[tagLink]){

                    /* [NEW] add generated code to allTags array */
                    allTags[tagLink] = 1;

                } else {

                    allTags[tagLink]++;
                }
        
                /* END LOOP: for each tag */
            }
            
            /* END LOOP: for every article: */
        }
        /* [NEW] create variable for all links HTML code */

        const tagsParams = calculateTagsParams(allTags);

        let allTagsHTML = '';

        /* [NEW] START LOOP: for each tag in allTags: */
        for(let tagLink in allTags){
            /* [NEW] generate code of a link and add it to allTagsHTML */
            const tagClass = calculateTagClass(allTags[tagLink], tagsParams);
        
            allTagsHTML += `<li class="${tagClass}"><a href="#tag-${tagLink}">${tagLink} <span>(${allTags[tagLink]})</span><a></li>`;
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        tagsWrapper.innerHTML = allTagsHTML;
    
    }
    
    function generateAuthorsList() {
        
        const allAuthors = [];
        
        const articles = document.querySelectorAll(optArticleSelector);
        const authorsWrapper = document.querySelector('.authors');

        for(let article of articles) {
            const author = article.getAttribute('data-author');
            if(allAuthors.indexOf(author) == -1){
                allAuthors.push(author);
            }
        }

        for(let author of allAuthors){
            authorsWrapper.innerHTML += `<li><a href="#author-${author}"><span class="author-name">${author}</span></a></li>`;
        }
    }

    generateTitleList();
    
    generateTags();

    generateAuthor();

    generateTagsList();

    generateAuthorsList();

    addClickListenersToTags();
    
    authorEventListener();

}