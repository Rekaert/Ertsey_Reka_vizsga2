function done(data) {

    function done(data) {
        let movies = JSON.parse(data.responseText).movies; //visszakapjuk magát a tömböt a teljes objektumból, amit objektummá alakítunk a JSON.parse metódussal

        sortByTitle(movies);
        showMoviesDatas(movies);
        searchDatas(movies[i].title, movies[i].directors, movies[i].cast[i]);

        //console.log(movies);
    }


    function xhr(method, url, done) {

        let xmlHTTP = new XMLHttpRequest();
        //eseményfigyelő létrehozása, ha megváltozik a request állapota, akkor fusson le a függvény
        xmlHTTP.onreadystatechange = function () {
            if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
                done(xmlHTTP)

            }
        }
        xmlHTTP.open(method, url);
        xmlHTTP.send();
    }

    xhr('GET', '/json/movies.json', done);

    function sortByTitle(data) {
        data.sort(function (a, b) {
            if (a.title > b.title) {
                return -1;
            }
            if (a.title < b.title) {
                return 1;
            }
            return 0;
        });
        return data;

    }

    function convertCategories(data) {

        let categoryItem = data[i].categories[i];
        for (let i = 0; i < categoryItem.length; i++) {

            // categoryItem.toLoweCase.categoryItem[0].toUpperCase;

            let newCategoryItem = categoryItem.toLowerCase() //drama
                .slice(0); //d, rama

            categoryItem = newCategoryItem[0].toUpperCase().join(newCategoryItem[1]);
        }

    }

    function replaceCharacter(str) {


        let characters = {
            á: 'a',
            é: 'e',
            í: 'i',
            ó: 'o',
            ö: 'o',
            ő: 'o',
            ü: 'u',
            ű: 'u'
        };



        let titleName = str.toLowerCase()
            .replace(/[áéíóöőúüű]/g, c => characters[c])
            .replace(/[^a-zA-Z0-9 -]/g, '')
            .replace(/[ -]+/g, '-');

        return str;

    }

    function showMoviesDatas(data) {



        for (var i = 0; i < data.length; i++) {

            let movies =
                `<div class="movie-cover">
                        <img id="cover" src="/img/covers/${characterReplace(movie[i].title)}.jpg" alt="${movie[i].title}">
                    </div>
                    <div class="movie-info">
                    <div class="title">Cím: ${movies[i].title}</div>
                    <div class="timeInMinutes">Hossz: formatLengthOfMovies(${movies[i].timeInMinutes}) perc</div>
                    <div class="premierYear">Premier: ${movies[i].premierYear}</div>
                    <div class="categories">Kategória: ${movies[i].categories.toLoweCase}</div>
                    <div class="directors">Rendező: ${movies[i].directors}</div>
                    <div class="cast">Szereplők: ${movies[i].cast[0]}</div>
                    </div>
                    <div class="movie-cast">
                    <img id="actor" src="/img/actors/${replaceCharacter(actors[i].name)}.jpg" alt="${actors[i].name}">
                    <div class="actor-name">${movies[i].cast[0]} (${movies[i].cast[1]})
                    </div>
                    <div class="birth-info">${movies[i].cast[4]}, ${movies[i].cast[2]} ${movies[i].cast[3]}</div>
                    </div>`



            document.getElementByClassName('movies')[0].innerHTML += movies;

            return movies;
        }


        function searchDatas(title, director, actor) {

            let datas = [];
            let searchInput = document.querySelector('[name=search]');

            for (var i = 0; i < data.length; i++) {
                if (data[i].title === searchInput.value ||
                    data[i].director === searchInput.value ||
                    data[i].cast[i].name === searchInput.value) {
                    datas.push(data[i]);
                }

            }
            return datas;

        }

        function formatLengthOfMovies(time) {
            return parseFloat(time).toFixed(2);
        }

        function avgLengthOfMovies(data) {

            let avg = 0;
            for (let i = 0; i < data.length; i++) {
                avg += data[i].timeInMinutes / data.length;


            }
            return parseFloat(avg).toFixed(2);

        }


        function filterActors(data, actor) {
            let actors = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].cast[0]) {
                    actors.push(data[i].cast[0]);
                }
            }
            return actors;
        }


        function filterCategories(data, category) {
            let categories = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].categories[i]) {
                    actors.push(data[i].categories[i]);
                }
            }
            return categories;
        }