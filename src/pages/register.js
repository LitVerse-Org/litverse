import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function RegisterPage({ providers }) {
    const { data, status } = useSession();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validLength, setValidLength] = useState(false);
    const [hasUpper, setHasUpper] = useState(false);
    const [hasLower, setHasLower] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecial, setHasSpecial] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [serverError, setServerError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false); // State for the error popup
    const [errorMessage, setErrorMessage] = useState(''); // State for the error message
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        const randomImageNumber = Math.floor(Math.random() * 8) + 1;
        const randomImageSrc = `/Bwdoodle${randomImageNumber}.png`;
        setImageSrc(randomImageSrc);
    }, []);
    const handleChange = (e) => {
        const val = e.target.value;
        setPassword(val);

        setValidLength(val.length >= 8);
        setHasUpper(/[A-Z]/.test(val));
        setHasLower(/[a-z]/.test(val));
        setHasNumber(/[0-9]/.test(val));
        setHasSpecial(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(val));

        setShowPasswordRules(true);
    };

    const handlePhoneNumberChange = (e) => {
        const val = e.target.value;
        setPhoneNumber(val);

        if (!/^\d{0,10}$/.test(val)) {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }

        try {
            const res = await fetch('/api/userOperations/registrationHandler', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
            });

            const data = await res.json();

            if (res.status === 200 && data.success) {
                const signInSuccess = await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                });

                if (signInSuccess && signInSuccess.error) {
                    setServerError(signInSuccess.error);
                } else {
                    router.push('/home');
                }
            } else {
                setServerError(data.error);
            }
        } catch (error) {
            setServerError(error.message);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status]);

    return (
        <div className="flex items-center justify-center h-screen lr-stripe-bg">
            <img
                src="/logo_transparent_background.png"
                alt="Logo"
                className="absolute top-12 w-1/3"
                style={{ right: '1rem' }}
            />
            <img
                src={imageSrc}
                alt="Background"
                className="absolute bottom-0 left-0 w-3/4 z-0 transform rotate-45"
                style={{bottom: '-65%', left: '-35%'}}
            />
            <div className="p-8 rounded-xl shadow-md backdrop-blur bg-black w-96" style={{ right: '3rem' }}>
            {/*<div className="p-8 rounded-r-3xl shadow-md bg-black w-96" style={{ right: '3rem' }}>*/}
                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="Email"
                        className="font-roboto-slab font-bold w-full p-3 rounded-lg border border-blue-300 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="Username"
                        className="font-roboto-slab font-bold w-full p-3 rounded-lg border border-blue-300 text-black"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="password"
                        placeholder="Password"
                        className="font-roboto-slab font-bold w-full p-3 rounded-lg border border-blue-300 text-black"
                        value={password}
                        onChange={handleChange}
                        onFocus={() => setShowPasswordRules(true)}
                    />
                    {showPasswordRules && (
                        <div className="font-roboto-slab font-bold mt-2">
                            <div className={validLength ? 'text-green-500' : 'text-orange-700'}>{validLength ? '✔' : '✖'} At least 8 characters</div>
                            <div className={hasUpper ? 'text-green-500' : 'text-orange-800'}>{hasUpper ? '✔' : '✖'} At least one uppercase letter</div>
                            <div className={hasLower ? 'text-green-500' : 'text-orange-800'}>{hasLower ? '✔' : '✖'} At least one lowercase letter</div>
                            <div className={hasNumber ? 'text-green-500' : 'text-orange-800'}>{hasNumber ? '✔' : '✖'} At least one number</div>
                            <div className={hasSpecial ? 'text-green-500' : 'text-orange-800'}>{hasSpecial ? '✔' : '✖'} At least one special character</div>
                        </div>
                    )}
                </div>
                <div className="mb-2">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="font-roboto-slab font-bold w-full p-3 rounded-lg border border-blue-300 text-black"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {passwordMismatch && <div className="text-red-500">Passwords do not match</div>}
                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="(***) ***-****"
                        className={`font-roboto-slab font-bold w-full p-3 rounded-lg border ${phoneError ? 'border-red-500' : 'border-blue-300'} text-black`}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    {phoneError && <div className="text-red-500">Invalid phone number</div>}
                </div>
                <div className="mb-2">
                    <button
                        className="font-roboto-slab font-bold text-white bg-darkGreen p-2 rounded-full text-xl w-full"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                    {serverError && <div className="text-red-500">{serverError}</div>}
                </div>
                <div className="border-b-2 border-gray-300 my-4"></div>
                <div className="mt-2">
                    {Object.values(providers || {}).map((provider) => (
                        provider.id !== 'credentials' && (  // Skip the credentials provider
                            <div key={provider.id} className="mb-3">
                                <button
                                    onClick={async () => {
                                        await signIn(provider.id);
                                    }}
                                    className="font-roboto-slab font-bold bg-white pl-2 pr-4 py-1 text-black text-m rounded-full flex items-center justify-center mx-auto"
                                >
                                    <img
                                        src={
                                            provider.id === "google"
                                                ? "/google.png"
                                                : provider.id === "apple"
                                                    ? "/apple.png"
                                                    : provider.id === "facebook"
                                                        ? "/facebook.png"
                                                        : ""
                                        }
                                        alt=""
                                        className="h-7"
                                    />
                                    Register with {provider.name}
                                </button>
                            </div>
                        )
                    ))}
                </div>
                <div className="border-b-2 border-gray-300 my-2"></div>
                <div className="text-center mt-4">
                    <button className="font-roboto-slab font-bold bg-white text-black p-2 rounded-full rounded text-l w-39" onClick={() => router.push('/login')}>
                        Go to Login
                    </button>
                </div>
            </div>
            {showErrorPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg font-black font-bold">
                        <h2 className="font-bold font-black">Error</h2>
                        <p className="font-bold font-black">{errorMessage}</p>
                        <button onClick={() => setShowErrorPopup(false)} className="bg-blend-color-burn bg-amber-400">Close</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}
