import { Link } from "react-router-dom";

function SignInPage() {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-104px)]">
            <div className="form-card">
                <h1 className="text-3xl font-semibold text-center mb-12">Sign In</h1>
                <form>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg">Email</label>
                        <input type="email" required className="shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg">Password</label>
                        <input type="password" required className="shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[10px] px-4 py-2" />
                    </div>
                    <p className="text-sm opacity-50">Belum punya akun? <Link to='/signup' className="hover:underline">Sign up</Link></p>
                    <div className="w-full flex justify-center mt-12">
                        <button type="submit" className="btn-primary text-lg">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignInPage;