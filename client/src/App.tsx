import { useCallback, useState } from "react"
import axios from "axios";


function App () {
    const [email, setEmail] = useState<string>('test@test.com')
    const [password, setPassword] = useState<string>('password')

    const [accessDetails, setAccessDetails] = useState<{accessToken:string, refreshToken:string}>();
    const [loginData, setLoginData] = useState();
    const [sessionData, setSessionData] = useState();
    const [logoutData, setLogoutData] = useState();

    const login = useCallback(() => {
        axios.post(`http://localhost:4000/api/session`, { email, password })
        .then((res) => {
            if (res.data.msg == 'okay' && res.data.accessToken) {
                setAccessDetails(res.data)
            }

            setLoginData(res.data.msg)
        })
        .catch((error) => setLoginData(error.message));
    }, [email, password])


    async function getSessionData() {
        axios
            .get(`http://localhost:4000/api/session`, {params: accessDetails})
            .then((res) => setSessionData(res.data))
            .catch((error) => setSessionData(error.message));
    }

    async function logout() {
        axios
          .delete(`http://localhost:4000/api/session`, {params: accessDetails})
          .then((res) => {
            setAccessDetails({accessToken:'', refreshToken:''})
            setLogoutData(res.data)
          })
          .catch((error) => setLogoutData(error.message));
    }

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
                <div className="py-5 pb-3 text-md tracking-wide">
                    {JSON.stringify(loginData, null, 4)}
                </div>
            </section>

            <section className="w-1/3 bg-[#ecf0f1] m-10 my-10 p-5 rounded-md">
                <div className="text-2xl font-semibold">Session</div>
                <div className="py-2">
                    <button
                        className="bg-[#67f2d1] mt-7 p-5 w-56 text-lg font-semibold rounded tracking-wide relative active:top-1"
                        onClick={() => { getSessionData(); }}
                    >
                        Get session data
                    </button>
                </div>
                <div className="py-5 pb-3 text-md tracking-wide">{JSON.stringify(sessionData, null, 4)}</div>
            </section>

            <section className="w-1/3 bg-[#ecf0f1] m-10 my-10 p-5 rounded-md">
                <div className="text-2xl font-semibold">Logout</div>
                <div className="py-2">
                    <button
                        className="bg-[#67f2d1] mt-7 p-5 w-40 text-lg font-semibold rounded tracking-wide relative active:top-1"
                        onClick={() => { logout() }}
                    >
                        Logout
                    </button>
                </div>
                <div className="py-5 pb-3 text-md tracking-wide">
                    {JSON.stringify(logoutData, null, 4)}
                </div>
            </section>

        </main>
    )
}

export default App