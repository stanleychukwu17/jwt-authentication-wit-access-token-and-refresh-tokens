// import { useState } from 'react'

import { useCallback, useState } from "react"


function App () {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = useCallback(() => {
        // Define the URL of your backend server
        const url = 'http://localhost:4000/api/session';

        // Define the data you want to send in the POST request (e.g., JSON data)
        const postData = {email, password};

        // Create an options object for the fetch request (including method, headers, and body)
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData),
        };

        console.log('sent!')
        // Perform the fetch request
        fetch(url, requestOptions)
            .then((response) => {
                // Check if the response status is OK (status code 200)
                if (response.ok) {
                    return response.json(); // Parse the response body as JSON
                } else {
                    throw new Error('Request failed');
                }
            })
            .then((data) => {
                console.log('Response Data:', data);
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });
    }, [email, password])

    return (
        <main>
            <section className="w-1/3 bg-[#ecf0f1] m-10 my-10 p-5 rounded-md">
                <div className="text-2xl font-semibold">Login</div>
                <div className="py-5">
                    <div className="py-5">
                        <div className="font-semibold">Email</div>
                        <div className="">
                            <input className="w-full mt-2 p-3 rounded" type="email" value={email} onChange={(event) => setEmail(event.target.value) } />
                        </div>
                    </div>
                    <div className="">
                        <div className="font-semibold">Password</div>
                        <div className="">
                            <input className="w-full mt-2 p-3 rounded" type="password" value={password} onChange={(event) => setPassword(event.target.value) } />
                        </div>
                    </div>
                </div>
                <div className="py-2">
                    <button 
                        className="bg-[#67f2d1] p-5 w-40 text-lg font-semibold rounded tracking-wide relative active:top-1"
                        onClick={() => { login() }}
                    >
                        Login
                    </button>
                </div>
                <div className="py-5 pb-3 text-md tracking-wide"></div>
            </section>

            <section className="w-1/3 bg-[#ecf0f1] m-10 my-10 p-5 rounded-md">
                <div className="text-2xl font-semibold">Session</div>
                <div className="py-2">
                    <button className="bg-[#67f2d1] mt-7 p-5 w-56 text-lg font-semibold rounded tracking-wide relative active:top-1">Get session data</button>
                </div>
                <div className="py-5 pb-3 text-md tracking-wide"></div>
            </section>

            <section className="w-1/3 bg-[#ecf0f1] m-10 my-10 p-5 rounded-md">
                <div className="text-2xl font-semibold">Logout</div>
                <div className="py-2">
                    <button className="bg-[#67f2d1] mt-7 p-5 w-40 text-lg font-semibold rounded tracking-wide relative active:top-1">Logout </button>
                </div>
                <div className="py-5 pb-3 text-md tracking-wide"></div>
            </section>

        </main>
    )
}

export default App