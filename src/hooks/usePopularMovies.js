import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies} from "../utils/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store)=> store.movies.popularMovies)
  const getPopularMovies = async () => {
    try{
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      API_OPTIONS
      );
      const json = await data.json();
      // console.log("popular",json);
      dispatch(addPopularMovies(json.results))
    }catch(err){
      console.log(err);
    }
    
  }

  useEffect(()=>{
    !popularMovies && getPopularMovies()
  },[])
}
export default usePopularMovies;
