// import { useState } from 'react'


function App () {
    return (
        <main>
            <section className="w-1/3 bg-[#ecf0f1] m-10 my-10 p-5 rounded-md">
                <div className="text-2xl font-semibold">Login</div>
                <div className="py-5">
                    <div className="py-5">
                        <div className="font-semibold">Email</div>
                        <div className="">
                            <input className="w-full mt-2 p-3 rounded" type="email" />
                        </div>
                    </div>
                    <div className="">
                        <div className="font-semibold">Password</div>
                        <div className="">
                            <input className="w-full mt-2 p-3 rounded" type="password" />
                        </div>
                    </div>
                </div>
                <div className="py-2">
                    <button className="bg-[#67f2d1] p-5 w-40 text-lg font-semibold rounded tracking-wide relative active:top-1">Login</button>
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