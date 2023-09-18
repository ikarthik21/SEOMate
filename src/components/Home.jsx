import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';


export const validateAndTrimURL = (url) => {
    const isValid = validator.isURL(url);
    if (!isValid) {
        alert("Invalid URL");
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url; // Add "http://" by default
        }
        const parts = new URL(url);
        let domain = parts.hostname.replace(/^www\./, '');
        
        return domain;
    }
};

const Home = () => {

    const [url, setUrl] = useState("");
    const navigator = useNavigate();

    const checkURL = (url) => {
        const res = validateAndTrimURL(url);
        if (res) {
            navigator(`/${res}`)
        }
    }

    return (

        <main className="flex flex-col items-center justify-between p-24 homebg">
            <div className="flex flex-col items-center h-36" >
                <h1 className=" mt-5 font-extrabold leading-[1.15] text-4xl text-center md:text-5xl ">Welcome to SEOMATE</h1>

                <div className='h-screen flex items-center justify-center'>
                    <div className='m-12 flex items-center flex-wrap justify-center'>
                        <input type="text" placeholder="Enter the URL" className="text-black   outline-none  py-2  px-4 rounded w-72 md:w-96  border-slate-700" onChange={(e) => {
                            setUrl(e.target.value);
                        }} value={url} />
                        <button onClick={() => checkURL(url)} className='m-8 md:m-2 rounded py-2 px-4 bg-green-500'> Check </button>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Home;
