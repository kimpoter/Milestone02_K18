import { Link } from "react-router-dom";

function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-104px)]">
            <div className="form-card">
                <h1 className="text-3xl font-semibold text-center mb-12">Sign Up</h1>
                <form>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg">Username</label>
                        <input type="text" required className="form-input" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg">Email</label>
                        <input type="email" required className="form-input" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg">Password</label>
                        <input type="password" required className="form-input" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-lg">Confirm Password</label>
                        <input type="password" required className="form-input" />
                    </div>
                    <p className="text-sm opacity-50">Sudah punya akun? <Link to='/signin' className="hover:underline">Sign in</Link></p>
                    <div className="w-full flex justify-center mt-12">
                        <button type="submit" className="btn-primary text-lg">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUpPage;