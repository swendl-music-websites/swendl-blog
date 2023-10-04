import requests

API_KEY = 'AIzaSyDu7RVCXixLsyKkhPUzUfhINiSBlz91hps'  # Replace with your API key
VIDEO_ID = '-gztZDLzsyY'
COMMENT_URL = f"https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId={VIDEO_ID}&key={API_KEY}"

response = requests.get(COMMENT_URL)
data = response.json()

for item in data['items']:
    comment = item['snippet']['topLevelComment']['snippet']
    author_name = comment['authorDisplayName']
    author_image = comment['authorProfileImageUrl'].replace("s48-c-k-c0x00ffffff-no-rj", "s176-c-k-c0x00ffffff-no-rj")
    comment_text = comment['textDisplay']
    publication_date = comment['publishedAt'].split("T")[0]

    # Format using your template
    formatted_comment = f"""
    <div class="comment">
        <div class="avatar">
            <img src="{author_image}" alt="{author_name}" class="img-cover">
        </div>
        <div class="content" data-date="{publication_date}">
            <h2 class="name">{author_name}</h2>
            <h3 class="publication-date"></h3>
            <p>{comment_text}</p>
            <a href="#leave-comment-section" class="reply animated" data-value='reply'>reply</a>
        </div>
        <div class="clearfix"></div>
    </div> <!-- /.comment -->
    """
    print(formatted_comment)
