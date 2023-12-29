import {useDispatch} from "react-redux";
import { useEffect } from 'react';
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies} from "../utils/moviesSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
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
    getTopRatedMovies()
  },[])
}
export default useTopRatedMovies;
