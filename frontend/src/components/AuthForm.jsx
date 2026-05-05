function AuthForm({ title, buttonText, extraText, extraLink, children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
  
          <form className="space-y-5">
            {children}
  
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full font-bold hover:scale-105 transition"
            >
              {buttonText}
            </button>
          </form>
  
          <p className="text-center mt-6 text-gray-300">
            {extraText}{" "}
            <a href={extraLink} className="text-yellow-400 hover:underline">
              Click Here
            </a>
          </p>
        </div>
      </div>
    );
  }
  
  export default AuthForm;