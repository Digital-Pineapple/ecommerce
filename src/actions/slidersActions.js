import client from '../config/axiosConfig';
import { types } from '../types';

export const startLoadDataSliders = () =>{
    return async (dispatch)=>{
       try {
           let url = 'administrable/slider';
           const res = await client.get(url);
           dispatch(loadDataSliders(res.data.sliders))
       } catch (error) {
           console.log(error);
       }
    }
}

export const loadDataSliders = (sliders) =>({
     type:types.loadSlidersData,
     payload:sliders
})