function findMovieInfo(name)
{
    const name_without_spaces = parseSpaces(name)
    console.log(`http://www.omdbapi.com/?apikey=a2c9d949&t=${name_without_spaces}`)
    return fetch(`http://www.omdbapi.com/?apikey=a2c9d949&t=${name_without_spaces}`)
}

window.onload = function(){
    const form = document.getElementById('form_movies');
    form.addEventListener('submit', e1=> {
        e1.preventDefault();
        getMovies();
    });
}





function getMovies()
{
    const movie_name = document.querySelector('#film_name');
    const div_movie = document.querySelector('#movie_from_imdb')
    console.log("AAAAA ");
    console.log(movie_name.value);
    div_movie.innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>'

    findMovieInfo(movie_name.value)
        .then(response => response.json())
        .then(data => {
            if(data.Title)
            {
                console.log(data);
                div_movie.innerHTML = `<div>Title: ${data.Title}<br>Actors: ${data.Actors} </div>`;
            }else
            {
                console.log("deu ruim");
                div_movie.innerHTML = data.Error;
            }
        })
        .catch(err =>{
            div_movie.innerHTML = `Erro: ${err}`;
        })
    console.log("finalizou!")
}


function parseSpaces(name)
{
    return name.replace(/\s/g, '+')
}