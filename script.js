const org_movies=document.getElementById("original__movies")
const trending=document.getElementById("trending")
const top_rated=document.getElementById("top_rated")
const page_number=document.getElementById("pages")
let Page=1;

load_page()




for(let i=1;i<=40;i++){
  let a=document.createElement("a")
  a.href="#"
  a.innerText=i
  if(i==1)
  a.style.color="yellow"
  a.className='page'
  page_number.append(a)
  a.onclick=(e)=>{
    to_defualt()
    a.style.color="yellow"
    Page=e.target.innerText
    load_page()

  }
}

const to_defualt=()=>{
let x=document.getElementsByClassName("page")
for(let i=0;i<x.length;i++)
x[i].style.color="white"

}


function load_page(){
  org_movies.innerHTML=""
  trending.innerHTML=""
  top_rated.innerHTML=""
 
    getOriginals()
    getTrendingNow()
    getTopRated()
    //page_number.innerHTML+=`<a href="#">&laquo;</a>`

    //page_number.innerHTML+=`<a href="#">&raquo;</a>`

  
}


let x=document.getElementsByTagName("a")
console.log(x)


  
   function  fetchMovies(url, dom_element, path_type) {

    fetch(url)
    .then(response=>response.json())
    .then(data=>{ console.log(data)
      showMovies(data,dom_element,path_type) })
  
  }

  showMovies =  (movies, dom_element, path_type) => {


    movies.results.forEach(value=>{
      let img=document.createElement("img")
      img.src=`https://image.tmdb.org/t/p/w500${value[path_type]}`
      img.setAttribute("data-id",value.id)
      dom_element.append(img)
      img.addEventListener('click',e=>{
        handeling(e)
      })
      }
    )
    }
 
 
    
  
  function getOriginals() {
    fetchMovies(`https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213&page=${Page}`,org_movies,"poster_path")
  
  }
  function getTrendingNow() {
    fetchMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045&page=${Page}`,trending,"backdrop_path")

  }
  function getTopRated() {
    fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=${Page}`,top_rated,"backdrop_path")

  }
  

  async function getMovieTrailer(id) {

    
    return await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`)
    .then(response=>{
      if(!response.ok)
      alert('something went wrong')
      else
      return response.json()
    })



  }
  


  const handeling=(e)=>{
    const img_id=e.target.getAttribute('data-id')
    getMovieTrailer(img_id).then(value=>{
      const data=value.results
      const trailer=data.filter(flag=>{
        if(flag.site=='YouTube'&&flag.type == 'Trailer')
        return true
        else
        return false
      })
      if (trailer.length > 0)
      window.open(`https://www.youtube.com/embed/${trailer[0].key}`)
      else
      alert('Trailer Not Found')
    }
  )

  }


 

    

  
  
  
  
  