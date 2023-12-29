import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies} from "../utils/moviesSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store)=> store.movies.topRatedMovies);
  const getTopRatedMovies = async () => {
    try{
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      API_OPTIONS
      );
      const json = await data.json();
      // console.log("popular",json);
      dispatch(addTopRatedMovies(json.results))
    }catch(err){
      console.log(err);
    }
    
  }

  useEffect(()=>{
    !topRatedMovies && getTopRatedMovies()
  },[])
}
export default useTopRatedMovies;
