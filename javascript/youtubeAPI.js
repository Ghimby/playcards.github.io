let nextPageToken = ""
function getVideos(){
    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how%20to%20play%20war%20card%20game&key=AIzaSyA7eJgrJ4amMH5XnwY13yyfny7328kbdac&pageToken="+nextPageToken)
    .then((result)=>{
        return result.json()
    }).then((data)=>{
        let videos = data.items
        // console.log(data)
        nextPageToken = data.nextPageToken
        let videoContainer = document.querySelector(".youtube-container")
        for(video of videos){
            videoContainer.innerHTML += `
                <p id="video-title">${video.snippet.title}</p>
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}"
            target="_blank"
            ><img class="youtube-thumbnail" src ="${video.snippet.thumbnails.medium.url}">
            <p></p>
            `
        }
    })
}

getVideos()