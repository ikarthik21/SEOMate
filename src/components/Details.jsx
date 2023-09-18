import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postDataForSEO, fetchDetails } from '../service/API';
import { io } from "socket.io-client";
import { validateAndTrimURL } from './Home';

import { TiTick } from 'react-icons/ti'

import { ImCross } from 'react-icons/im'


import Loading from './Loading'

const Details = () => {
    const params = useParams();
    const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
    const [id, setId] = useState(null);

    const [data, setData] = useState([]);

    // // post url for Id
    useEffect(() => {
        (async () => {
            const url = validateAndTrimURL(params.url);
            if (url) {
                await postDataForSEO(url);
            }
        }
        )();
    }, [params.url])


    socket.on("id_receive", (id) => {
        setId(id);

    });



    // Fetching the details corresponding to the ID

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const res = await fetchDetails(id);
                    setData(res[0].result[0])
                } catch (error) {
                    console.log(error);
                }
            }
        }
        )();
    }, [id])


    return (


        id && Object.keys(data).length > 0 ?

            <div className="flex flex-col items-center m-5 h-screen  text-xs md:text-base px-32" >

                <div className="m-2 p-2">
                    <h1 className="text-3xl text-center font-medium">Results for <span className="text-red-400"> {params.url}</span> </h1>
                </div>


                <div className="flex items-center justify-center flex-wrap  ">
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.onpage_score}</h1>
                        <p>On page Score</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.total_dom_size}</h1>
                        <p>Total DOM Size</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.server}</h1>
                        <p>Server</p>
                    </div>
                </div>


                <h1 className="text-3xl m-2">On Page Results </h1>

                <div className="flex items-center justify-center flex-wrap  ">

                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.internal_links_count}</h1>
                        <p>Internal Links </p>
                    </div>

                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data.items[0]?.meta?.external_links_count}</h1>
                        <p>External Links </p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.images_count}</h1>
                        <p>Number of Images </p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.images_size}</h1>
                        <p>Images size </p>
                    </div>

                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.scripts_count}</h1>
                        <p>Scripts </p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.scripts_size}</h1>
                        <p>Scripts size </p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.stylesheets_count}</h1>
                        <p>Style Sheets </p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.stylesheets_size}</h1>
                        <p>Style Sheets  size</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.plain_text_size}</h1>
                        <p>Plain Text  size</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{(data?.items[0]?.meta?.content?.plain_text_rate).toFixed(2)}</h1>
                        <p>Plain Text  Rate</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.plain_text_word_count}</h1>
                        <p>Plain Text  Word Count</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.automated_readability_index?.toFixed(2)}</h1>
                        <p>Automated Readablity</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.dale_chall_readability_index?.toFixed(2)}</h1>
                        <p>Dale Chall Readablity</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.flesch_kincaid_readability_index?.toFixed(2)}</h1>
                        <p>Flesch Kincaid Readablity</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.smog_readability_index?.toFixed(2)}</h1>
                        <p>Smog Readablity</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.description_to_content_consistency?.toFixed(2)}</h1>
                        <p>Description to content consistency</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.title_to_content_consistency?.toFixed(2)}</h1>
                        <p>Title to content consistency</p>
                    </div>
                    <div className="box rounded-xl">
                        <h1 className="text-3xl">{data?.items[0]?.meta?.content?.meta_keywords_to_content_consistency?.toFixed(2)}</h1>
                        <p>Meta Keywords to content consistency</p>

                    </div>



                </div>


                <div className="flex items-center justify-center flex-wrap ">

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.duplicate_title ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Duplicate Title</h1>
                            <p>Duplicate title tags are bad for SEO. They confuse search engines and make it harder to rank for specific keywords.</p>
                        </div>

                    </div>



                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.duplicate_content ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Duplicate Content</h1>
                            <p>  Duplicate content is bad for SEO. It confuses search engines and makes it harder to rank for specific keywords.</p>
                        </div>
                    </div>
                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                data?.items[0]?.cache_control?.cachable ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Cache Control</h1>
                            <p> Having a cache control header can improve your page load speed and user experience.</p>
                        </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                data?.items[0]?.checks?.canonical ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Canonical</h1>
                            <p> Having a Canonical tag can improve your page load speed and user experience.</p>           </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                data?.items[0]?.checks?.high_loading_time ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>High Loading Time</h1>
                            <p> Having a high loading time can impact your page load speed and user experience.</p>           </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                data?.items[0]?.checks?.seo_friendly_url ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>SEO FRIENDLY URL</h1>
                            <p> Having a SEO friendly URL can improve your page search speed and user experience.</p>           </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.deprecated_html_tags ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Deprecated HTML Tags</h1>
                            <p> Having Deprecated HTML Tags  can impact your page load speed and user experience.</p>           </div>
                    </div>
                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.duplicate_meta_tags ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Duplicate Meta Tags</h1>
                            <p> Having duplicate meta tags  can impact your page load speed and user experience.</p>           </div>
                    </div>
                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.duplicate_title_tag ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Duplicate Title Tag</h1>
                            <p> Having duplicate title tags  can impact your page load speed and user experience.</p>           </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.no_image_alt ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Image alternates</h1>
                            <p> Having duplicate image alternates  can improve your page load speed and user experience.</p>           </div>
                    </div>
                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.small_page_size ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Small Page Size</h1>
                            <p> Having small page sizes  can impact your page load speed and user experience.</p>           </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                data?.items[0]?.checks?.is_https ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>HTTPS</h1>
                            <p> Having HTTPS can be more secure .</p>           </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.no_favicon ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Favicon</h1>
                            <p> Having favicons  can improve your page load speed and user experience.</p>            </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.is_orphan_page ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Orphan Page</h1>
                            <p> Orphan pages can negatively impact your page load speed and user experience.</p>            </div>
                    </div>

                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.irrelevant_meta_keywords ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Irrelevant Meta Keywords</h1>
                            <p> irrelevant meta keyword can negatively impact your search engine ranking thus user experience.</p>            </div>
                    </div>
                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.checks?.low_readability_rate ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Low Readability Rate</h1>
                            <p> Low readability rate can negatively impact your page load speed and user experience.</p>      </div>
                    </div>
                    <div className="box2 rounded-xl">
                        <div className='mr-2'>
                            {
                                !data?.items[0]?.duplicate_description ? <TiTick size={40} color='#22c55e' /> : <ImCross size={20} color='red' />
                            }
                        </div>
                        <div className='text-justify'>
                            <h1>Duplicate Description</h1>
                            <p> Duplicate meta descriptions are bad for SEO. They confuse search engines and make it harder to rank for specific keywords.</p>
                        </div>
                    </div>



                </div>


                <div className='flex items-center flex-col m-8'>
                    <h1 className="text-3xl m-2">Speed Insights </h1>
                    <div className='flex items-center justify-center flex-wrap'>

                        <div className='box3'>
                            <h1>{data?.items[0]?.page_timing?.time_to_secure_connection}</h1>
                            <p>Time to secure Connection</p>
                        </div>
                        <div className='box3'>
                            <h1>{data?.items[0]?.page_timing?.waiting_time} ms</h1>
                            <p>Waiting Time</p>
                        </div>
                        <div className='box3'>
                            <h1>{data?.items[0]?.page_timing?.download_time} ms</h1>
                            <p>Download Time</p>
                        </div>
                        <div className='box3'>
                            <h1>{data?.items[0]?.page_timing?.time_to_interactive} ms</h1>
                            <p>Time to Interactive</p>
                        </div>
                        <div className='box3'>
                            <h1>{data?.items[0]?.page_timing?.dom_complete} ms</h1>
                            <p>DOM complete</p>
                        </div>
                        <div className='box3'>
                            <h1>{data?.items[0]?.page_timing?.duration_time} ms</h1>
                            <p>Duration Time</p>
                        </div>
                    </div>
                </div>


                <div>
                    <h1 className="text-3xl m-4">Social Media Meta Tags Test</h1>



                    {data?.items[0]?.meta?.social_media_tags ? (
                        Object.keys(data.items[0].meta.social_media_tags).map((key) => (
                            <div key={key} className='flex border border-slate-30 p-4 items-center justify-start m-auto'>
                                <div className='mr-8 flex1'>
                                    <p>{key}</p>
                                </div>
                                <div className='flex justify-start flex2'>
                                    <p>{data.items[0].meta.social_media_tags[key]}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No social media tags available</p>
                    )}

                </div>


            </div>
            :

            <Loading />

    )
}

export default Details