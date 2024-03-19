import { useEffect } from 'react';
import './gymapp.css';
import { useState } from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import { useRef } from 'react';

const GymApp = () => {

    const [ data, setData ] = useState();
    const ref = useRef('');
    console.log('====================================');
    console.log(ref.current);
    console.log('====================================');
    let arr = [img1, img2, img3, img4, img5];





    const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6f07d071e0mshf0f49e48170dc4ep11be79jsn351838f8c4ec',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };


    const fetchData = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }


    
    useEffect(() => {

        fetchData();

    }, [])

    console.log(data);



    return (
        <div className='gym'>
            <h1>Gym App</h1>
            <div className='photos'>
                {
                    arr.map((ele) => {
                        return(
                            <div className='photo'>
                            <img src={ele}></img>
                            </div>
                        )
                    })
                }
            </div>
            <input ref={ref} type='text'></input>
            <div className='container'>

                {
                    !data || data.map((item) => {
                        return(
                            <div className='item' key={item.id}>
                                <img src={item.gifUrl}></img>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default GymApp;