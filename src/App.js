import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [value, setValue] = useState(8);
  const [pass, setPass] = useState("");
  const [isNumber, setIsNumber] = useState(false);
  const [isSplChar, setIsSplChar] = useState(false);

  const genPass = useCallback(() => {
    let randomPass = "";
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const num = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:',.<>?";
    let charSet = str;
    if (isNumber) {
      charSet += num;
    }
    if (isSplChar) {
      charSet += specialChars;
    }
    for (let i = 0; i < value; i++) {
      let randomChar = Math.floor(Math.random() * charSet.length);
      randomPass += charSet.charAt(randomChar);
    }
    setPass(randomPass);
  }, [value, isNumber, isSplChar])

  useEffect(() => {
    genPass();
  }, [value, genPass, isNumber, isSplChar])

  const handleValue = (e) => {
    setValue(e.target.value)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(pass);
    toast.success("Copied to Clipboard");
  }
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <ToastContainer />
      <div className="bg-gray-200 rounded-xl p-10 space-y-5">
        <h1 className="text-center text-4xl">Password Generator</h1>
        <div className="p-2 flex-col bg-white shadow-xl rounded-tl-xl rounded-tr-xl">
          <div className="flex">
            <input className="p-2 w-full text-black outline-none" type="text" name="pass" value={pass} readOnly />
            <div className="flex text-3xl space-x-3">
              <i className="fa-regular fa-clipboard hover:text-gray-600 cursor-pointer" onClick={handleCopy} ></i>
              <i className="fa-solid fa-rotate hover:text-gray-600 cursor-pointer" onClick={genPass} ></i>
            </div>
          </div>
          <div className="border-2 border-green-600"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <input className="py-2 px-3 rounded bg-gray-50 w-16" type="number" min={6} value={value} onChange={handleValue} />
          <input className="cursor-pointer accent-red-600" type="range" name="length" min="6" max="20" value={value} onChange={handleValue} />
          <div className="flex flex-col">
            <div className="flex items-center">
              <input className="h-4 w-4 accent-red-600 mx-1" type="checkbox" name="number" id="numCheckbox" checked={isNumber} onChange={() => setIsNumber((prev) => !prev)} />
              <label htmlFor="numCheckbox">Number</label>
            </div>
            <div className="flex items-center">
              <input className="h-4 w-4 accent-red-600 mx-1" type="checkbox" name="char" id="specialCharCheckbox" checked={isSplChar} onChange={() => setIsSplChar((prev) => !prev)} />
              <label htmlFor="specialCharCheckbox">Special Charactes</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
