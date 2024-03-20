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
    const [ bodyPart, setBodyPart ] = useState('back');
    const [ number, setNumber ] = useState(6);

    const ref = useRef('');
    console.log('====================================');
    console.log(ref.current.value);
    console.log('====================================');
    let arr = [img1, img2, img3, img4, img5];

    let bodyPartList = ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];



    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=${number}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6f07d071e0mshf0f49e48170dc4ep11be79jsn351838f8c4ec',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };


    // ******************************************************


    const fetchData = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }


    // ******************************************************


    
    useEffect(() => {

        fetchData();

    }, [])

    // console.log(data);


    // ***************************************************

    const getInputText = (e) => {
        
        let searchInput = e.target.value;
        if(searchInput === ''){
            setBodyPart('back');
            setNumber(6);
        }
        else{
            setBodyPart(searchInput);
        }
    }


    // ******************************************************


    const searchBodyPart = () => {

        if(bodyPartList.includes(bodyPart)){
            fetchData();
        }
        else{
            alert('Please enter valid bodypart');
        }
    }


    // ******************************************************


    const searchMore = () => {

        if(ref.current.value === '' || !bodyPartList.includes(bodyPart.toLowerCase())){
            alert('Please enter body part first in the search bar');
        }
        else{
            setNumber(prev => prev + 6);
            fetchData();
        }
    }




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

            <div className='input'>
                <input 
                    placeholder='search exercise' 
                    ref={ref} 
                    type='text'
                    onChange={(e) => getInputText(e)}
                ></input>
                <button onClick={searchBodyPart}>Search</button>
            </div>
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

            <div className='btn'>
                <button onClick={searchMore}>Show More</button>
            </div>
        </div>
    )
}


export default GymApp;