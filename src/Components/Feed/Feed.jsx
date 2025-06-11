import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Feed.css'
import {API_KEY, valueConverter} from '../../data.js'
import moment from 'moment';

const Feed = ({category}) => 
{
    const [data,setData] = useState([]);

    const fetchData = async ()=>
    {
        // const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

        // await fetch(videoList_url).then(Response => Response.json()).then(data => setData(data.items));

        try 
        {
            const response = await fetch(videoList_url);
            const result = await response.json();
            setData(result.items);
        } 
        catch (error) 
        {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    },[category]);


  return (
    <>
        <div className="feed">

        {/* You're not returning anything inside the map() function. In JavaScript, if you use curly braces {} in an arrow function, you must explicitly use return. Without return, nothing is rendered */}

            {data.map((item)=>(
                <Link to={`Videos/${item.snippet.categoryId}/${item.id}`} className="card" key={item.id}>
                    <img src={item.snippet.thumbnails.medium.url} alt=""  />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
                </Link>
            ))}

        </div>
    </>
  )
}

export default Feed









// import thumbnail1 from '../../assets/thumbnail1.png';
// import thumbnail2 from '../../assets/thumbnail2.png';
// import thumbnail3 from '../../assets/thumbnail3.png';
// import thumbnail4 from '../../assets/thumbnail4.png';
// import thumbnail5 from '../../assets/thumbnail5.png';
// import thumbnail6 from '../../assets/thumbnail6.png';
// import thumbnail7 from '../../assets/thumbnail7.png';
// import thumbnail8 from '../../assets/thumbnail8.png';


// <div className="card">
//     <img src={thumbnail2}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>
// <div className="card">
//     <img src={thumbnail3}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>       
// <div className="card">
//     <img src={thumbnail4}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>   
// <div className="card">
//     <img src={thumbnail5}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>     
// <div className="card">
//     <img src={thumbnail6}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>   
// <div className="card">
//     <img src={thumbnail7}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>
// <div className="card">
//     <img src={thumbnail8}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>     
// <div className="card">
//     <img src={thumbnail8}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>
// <div className="card">
//     <img src={thumbnail1}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>
// <div className="card">
//     <img src={thumbnail2}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>
// <div className="card">
//     <img src={thumbnail3}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>       
// <div className="card">
//     <img src={thumbnail4}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>   
// <div className="card">
//     <img src={thumbnail5}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>     
// <div className="card">
//     <img src={thumbnail6}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>   
// <div className="card">
//     <img src={thumbnail7}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>
// <div className="card">
//     <img src={thumbnail8}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>     
// <div className="card">
//     <img src={thumbnail8}  />
//     <h2>Best Channel to learn coding that help you to be a web developer</h2>
//     <h3>Great Stack</h3>
//     <p>15k views &bull: 2 days ago</p>
// </div>