// import thumbnail1 from '../../assets/thumbnail1.png'
// import thumbnail2 from '../../assets/thumbnail2.png'
// import thumbnail3 from '../../assets/thumbnail3.png'
// import thumbnail4 from '../../assets/thumbnail4.png'
// import thumbnail5 from '../../assets/thumbnail5.png'
// import thumbnail6 from '../../assets/thumbnail6.png'
// import thumbnail7 from '../../assets/thumbnail7.png'
// import thumbnail8 from '../../assets/thumbnail8.png'
import './Recommended.css'
import React, { useEffect, useState } from 'react'
import { API_KEY, valueConverter } from '../../data'
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) =>
{

    const [apiData,setApiData] = useState([]);

    const fetchVideoData = async () => {
        const recommendedVideos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

        try 
        {
            const response = await fetch(recommendedVideos_url);
            const result = await response.json();
            setApiData(result.items);
        } 
        catch (error) 
        {
            console.error("Error fetching apidata:", error);
        }
    }
    useEffect(()=>{
        fetchVideoData();
    },[])

    return (
        <div className="recommended">
            {
                apiData.map((item,index)=>{
                    return (
                        <Link to={`/Videos/${categoryId}/${item.id}`} className="side-video-list" key={index}>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="vid-info">
                                <h4>{item.snippet.title}</h4>
                                <p>{item.snippet.channelTitle}</p>
                                <p>{valueConverter(item.statistics.viewCount)} Views</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Recommended