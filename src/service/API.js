import axios from "axios";


export async function postDataForSEO(url) {
 
    url = url.toString();

    const post_array = [
        {
            "target": url,
            "max_crawl_pages": 1,
            "load_resources": true,
            "enable_javascript": true,
            "custom_js": "meta = {}; meta.url = document.URL; meta;",
            "tag": "karthik",
            "pingback_url": process.env.REACT_APP_BACKEND_URL + "/pingscript?id=$id"
        }
    ];

    try {

        const response = await axios({
            method: 'post',
            url: 'https://api.dataforseo.com/v3/on_page/task_post',
            auth: {
                username: process.env.REACT_APP_SEO_API_ID,
                password: process.env.REACT_APP_SEO_API_KEY
            },
            data: post_array,
            headers: {
                'content-type': 'application/json'
            }
        });

        const result = response.data.tasks;

        return result;

    } catch (error) {
        console.log(error);
    }
}


export async function fetchDetails(taskId) {
    try {
        const post_array = [
            {
                id: taskId,
                order_by: ["meta.content.plain_text_word_count,desc"],
                limit: 10
            }
        ];

        const response = await axios.post(
            "https://api.dataforseo.com/v3/on_page/pages",
            post_array,
            {
                auth: {
                    username: process.env.REACT_APP_SEO_API_ID,
                    password: process.env.REACT_APP_SEO_API_KEY
                },
                headers: {
                    "content-type": "application/json"
                }
            }
        );

        const result = response.data.tasks;

        return result;
    } catch (error) {
        console.error(error);
    }
}
