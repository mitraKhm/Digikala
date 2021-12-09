(function () {
    window.app = window.app || {}
    window.app.view = {
        renderProduct: renderProduct,
        
        renderpagination: renderpagination,
        toFarsiNumber: toFarsiNumber,
        renderFilters: renderFilters
    }
    //chench nunber to persian number
    function toFarsiNumber(n) {
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

        return n
            .toString()
            .replace(/\d/g, x => farsiDigits[x]);
    }
    //creat html elements 
    function creatElement(tagName, obj, content) {
        let el = document.createElement(tagName);
        for (let m in obj) {
            el.setAttribute(m, obj[m]);
        };
        if (typeof content !== "undefined") {
            if (content instanceof HTMLElement) {
                el.appendChild(content);
            } else {
                el.innerText = content;
            }
        }
        return el;
    };
    //creat products
    function renderProduct(productTitle, imgSrc, rankAvrege, rankCount, price) {
        let section = creatElement('section', {
            class: 'product'
        });
        let img = creatElement('img', {
            class: 'cover',
            src: imgSrc
        });
        let title = creatElement('h3', {
            class: 'title'
        }, productTitle);
        let rank = creatElement('h5', {
            class: 'rate'
        });
        let starIcon = creatElement('i', {
            class: 'icofont-star'
        });
        let productPrice = creatElement('h4', {
            class: 'pric'
        }, `${toFarsiNumber(price)}تومان`);
        section.appendChild(img);
        section.appendChild(title);
        section.appendChild(rank);
        rank.appendChild(starIcon);
        rank.innerHTML += `${toFarsiNumber(rankAvrege)} (${toFarsiNumber(rankCount)})`;
        section.appendChild(productPrice);

        return section
    }
    //Render filters
    function renderFilters(activeTab) {
        var filters = {
            mostViewed: 'پربازدید ترین',
            mostsold: 'پر فروش ترین ها',
            mostFavorite: 'محبوب ترین ها',
            mostExpensive: 'گران ترین ها',
        };
       var filterUl = document.querySelector('.filterUl');
        filterUl.innerHTML = ''; 
        for (const key in filters) {
          filterUl.appendChild(
            creatElement('li',{
                  class : activeTab === key ? 'active' : '',
                  "data-filter" : key,
              },creatElement('a',{href :'#'}, filters[key]))
           )
        }
    }

    //render page number
    function renderpagination(totalItems, itemPerPage, activePage) {
        let pages = Math.ceil(totalItems / itemPerPage);
        let pageNode = document.querySelector('.pageination');
        pageNode.innerHTML = '';

        for (let i = 0; i < pages; i++) {
            if (i + 1 === activePage) {
                pageNode.appendChild(
                    creatElement('li', {
                            class: 'active',

                        },
                        creatElement('a', {
                            href: '#',
                            'data-page': i + 1
                        }, toFarsiNumber(i+1))), )

            } else {
                pageNode.appendChild(
                    creatElement('li', {},
                        creatElement('a', {
                            href: '#',
                            'data-page': i + 1
                        }, toFarsiNumber(i + 1))));

            }
        }
        // return pages
    }



})();