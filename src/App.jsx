import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [specialCharactersAllowed, setSpecialCharactersAllowed] =
    useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);
  //useREf hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    setIsPasswordCopied(false);
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbersAllowed) str += "1234567890";
    if (specialCharactersAllowed) str += " !@#$%^&*()_-+{}[]?";

    for (let i = 1; i < passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [passwordLength, numbersAllowed, specialCharactersAllowed, setPassword]);

  const copyToClipBoard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsPasswordCopied(true);
  };

  useEffect(() => {
    passwordGenerator();
  }, [
    passwordLength,
    numbersAllowed,
    specialCharactersAllowed,
    passwordGenerator,
  ]);

  return (
    <div className="bg-black w-full h-screen p-6">
      <div className="bg-gray-800  rounded-xl max-w-2xl text-center mx-auto text-white p-4 ">
        <h1 className="text-center text-3xl mb-4">Password Generator</h1>

        <div className="flex">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            ref={passwordRef}
            className="outline-none bg-black w-full px-2 py-4 text-xl  rounded-l-xl"
          />
          <button
            onClick={copyToClipBoard}
            className="bg-white text-black rounded-r-xl px-2 font-medium hover:bg-gray-700 hover:text-white after:bg-red-300"
          >
            {isPasswordCopied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center gap-2 ">
            <input
              type="range"
              value={passwordLength}
              min={8}
              max={69}
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
            />
            <label className="w-20">Length : {passwordLength}</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={numbersAllowed}
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={specialCharactersAllowed}
              onChange={() => {
                setSpecialCharactersAllowed((prev) => !prev);
              }}
            />
            <label>Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
