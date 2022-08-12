import { Link } from "react-router-dom";

function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-104px)]">
            <div className="card">
                <h1 className="sm:text-3xl text-2xl font-semibold text-center mb-12">Sign Up</h1>
                <form className="sm:text-lg text-base">
                    <div className="flex flex-col mb-4">
                        <label>Username</label>
                        <input type="text" required className="form-input" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label>Email</label>
                        <input type="email" required className="form-input" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label>Password</label>
                        <input type="password" required className="form-input" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label>Confirm Password</label>
                        <input type="password" required className="form-input" />
                    </div>
                    <p className="text-sm opacity-50">Sudah punya akun? <Link to='/signin' className="hover:underline text-sm">Sign in</Link></p>
                    <div className="w-full flex justify-center mt-12">
                        <button type="submit" className="btn-primary sm:text-lg text-base w-full">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUpPage;