// import video1 from '../../assets/video.mp4';
// import jack from '../../assets/jack.png';
// import user_profile from '../../assets/user_profile.jpg';
import React, { useEffect } from 'react'
import  './PlayVideo.css'
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, valueConverter } from '../../data';
import { useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';


const PlayVideo = () => 
{
    const {videoId} = useParams();

    const [apiData,setApiData] = useState(null);
    const [channelData,setChannelData] = useState(null);
    const [commentData,setCommentData] = useState([]);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

        try 
        {
            const response = await fetch(videoDetails_url);
            const result = await response.json();
            setApiData(result.items[0]);
        } 
        catch (error) 
        {
            console.error("Error fetching apidata:", error);
        }
    }
    const fetchChannelData = async () => {
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        try 
        {
            const response = await fetch(channelData_url);
            const result = await response.json();
            setChannelData(result.items[0]);
        } 
        catch (error) 
        {
            console.error("Error fetching channel data:", error);
        }
    }
    const fetchCommentData = async () => {

        const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`

        try 
        {
            const response = await fetch(commentData_url);
            const result = await response.json();
            setCommentData(result.items);
            console.log(commentData);
        } 
        catch (error)  
        {
            console.error("Error fetching comment data:", error);
        }
    }

    useEffect(()=>{
        fetchVideoData();
    },[videoId]);
    useEffect(()=>{
        fetchChannelData();
        fetchCommentData();
    },[apiData]);


    return (
        <div className='play-video '>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`} style={{ border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

            <h3>{apiData ? apiData.snippet.title:"Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? valueConverter(apiData.statistics.viewCount):"16K" } Views &bull;  {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "No time ago"}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? valueConverter(apiData.statistics.likeCount):'155'}</span>
                    <span><img src={dislike} alt="" />3</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? valueConverter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0,500) : "Description Here"}</p>                <hr />
                <h4>{apiData ? valueConverter(apiData.statistics.commentCount) : 102} Comments</h4>
                {
                    commentData.map((item,index)=>{
                        return (
                            <div className="comment" key={index}>
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                <div>
                                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                    <div className="comment-action">
                                        <img src={like} alt="" />
                                        <span>{commentData ? valueConverter(item.snippet.topLevelComment.snippet.likeCount) : 102}</span>
                                        <img src={dislike} alt="" />
                                        <span>2</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PlayVideo