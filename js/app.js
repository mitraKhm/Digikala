(function () {
 
    var productRoot = document.querySelector('.productRoot')
    var currentPageNumber = 1;

    var availableFilters = {
        mostViewed: app.repository.getMostViwedProductByPage,
        mostsold: app.repository.getMostSoldProductByPage,
        mostFavorite: app.repository.getMostFavoriteProductByPage,
        mostExpensive: app.repository.getMostExpensiveProductByPage
    };
    var currentActiveFilter = 'mostViewed';

    fetch('https://5f8dfe3e4c15c40016a1e4f7.mockapi.io/shop/products')
        .then(response => response.json())
        .then(response => {
            app.products = response;
            document.getElementById("totalsItems")
                .innerText = app.view.toFarsiNumber(app.products.length) + ' کالا'

        
               app.repository.getMostViwedProductByPage(currentPageNumber).forEach((element) => {
                productRoot.appendChild(app.view.renderProduct(
                    element.title,
                    element.img,
                    element.rankAverage,
                    element.rankCount,
                    element.price,
                    ));

            });
           
            app.view.renderpagination(app.products.length, 36, currentPageNumber);
            app.view.renderFilters(currentActiveFilter);
        });
    document
        .querySelector('.filterUl')
        .addEventListener('click', function (event) {

            if (event.target.tagName.toLowerCase() === 'a') {

                var node = event.target.parentElement;
                currentActiveFilter = node.dataset.filter;
                currentPageNumber = 1;
                app.view.renderFilters(currentActiveFilter);
                app.view.renderpagination(app.products.length, 36, currentPageNumber);

                productRoot.innerHTML = "";
                var filterFunction = availableFilters[currentActiveFilter];
                filterFunction(currentPageNumber).forEach((element) => {
                    productRoot.appendChild(app.view.renderProduct(
                        element.title,
                        element.img,
                        element.rankAverage,
                        element.rankCount,
                        element.price,
                        ));
                });
            };
        });


    document
        .querySelector('.pageination')
        .addEventListener('click', function (event) {

            event.preventDefault();

            if (event.target.tagName.toLowerCase() === 'a') {

                currentPageNumber = +event.target.dataset.page;
                productRoot.innerHTML = '';

                var filterFunction = availableFilters[currentActiveFilter];
                filterFunction(currentPageNumber).forEach((element) => {
                    productRoot.appendChild(app.view.renderProduct(
                        element.title,
                        element.img,
                        element.rankAverage,
                        element.rankCount,
                        element.price,
                        ));
                });
                app.view.renderpagination(app.products.length, 36, currentPageNumber);
                app.view.renderFilters(currentActiveFilter);

            }
        });
    let c = 2 //open and close menu
    document.querySelector('.listBar').addEventListener('click', () => {
        if (c % 2 == 0) {
            document.querySelector('.menubox').style.display = 'block'
            c++
        } else {
            document.querySelector('.menubox').style.display = 'none'
            c++
        }


    })



})();