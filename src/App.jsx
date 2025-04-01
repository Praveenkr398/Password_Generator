import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  let [length, setLength] = useState(10);
  let [upperCaseAllowed, setUpperCaseAllowed] = useState(false);
  let [lowerCaseAllowed, setlLowerCaseAllowed] = useState(false);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [symbolAllowed, setSymbolAllowed] = useState(false);
  let [password, setPassword] = useState("");

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVQXYZ";
    if (lowerCaseAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "!@#$%^&*()-+{}<>?:|][";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [
    length,
    upperCaseAllowed,
    lowerCaseAllowed,
    numberAllowed,
    symbolAllowed,
    password,
  ]);

  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    upperCaseAllowed,
    lowerCaseAllowed,
    numberAllowed,
    symbolAllowed,
    setPassword,
  ]);

  let passwordRef = useRef(null);

  let passwordCopy = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-gray-500  w-full h-screen flex justify-center">
      <form
        action="#"
        className="bg-fuchsia-100 mt-20  w-lg px-5 py-2 rounded-lg h-100 "
      >
        <h1 className="py-3 text-3xl text-blue-600">Password Generator</h1>
        <div className="flex border-2 bg-blue-100 rounded-lg p-1 my-3  justify-between ">
          <input
            type="text"
            placeholder="password"
            id="password"
            readOnly
            value={password}
            ref={passwordRef}
            className=" text-2xl px-5 outline-none overflow-auto hover:overflow-hidden select-none"
          />
          <div
            onClick={passwordCopy}
            className="copyBtn cursor-wait bg-amber-500 text-2xl px-5 py-3 rounded-2xl border-1"
          >
            Copy
          </div>
        </div>
        <div className="flex bg-amber-100 my-5 p-5 justify-between gap-5">
          <input
            type="range"
            name="length"
            min={10}
            max={50}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
              // console.log(e.target.value);
            }}
            className="w-full cursor-pointer"
          />
          <label
            htmlFor="length"
            className="bg-blue-900 text-white rounded-full p-2 text-2xl"
          >
            {length}
          </label>
        </div>

        <div className="flex flex-col justify-evenly select-none ">
          <div className="flex flex-row justify-center gap-10">
            <div className=" bg-indigo-200 mb-2 w-50 justify-center px-3 py-1 rounded-lg">
              <input
                type="checkbox"
                name="upperCase"
                id="upperCase"
                defaultChecked={upperCaseAllowed}
                onChange={() => {
                  setUpperCaseAllowed((prev) => !prev);
                }}
                className="w-5 h-5 rounded-2xl"
              />
              <label
                htmlFor="upperCase"
                className="text-2xl cursor-pointer ml-3"
              >
                UpparCase
              </label>
            </div>
            <div className="bg-indigo-200 mb-2 w-50 justify-center px-3 py-1 rounded-lg">
              <input
                type="checkbox"
                name="checkNumber"
                id="checkNumber"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                className="w-5 h-5 rounded-2xl"
              />
              <label
                htmlFor="checkNumber"
                className="text-2xl cursor-pointer ml-3"
              >
                Number
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-10">
            <div className="bg-indigo-200 mb-2 w-50 justify-center px-3 py-1 rounded-lg">
              <input
                type="checkbox"
                name="lowerCase"
                id="lowerCase"
                className="w-5 h-5 rounded-2xl"
                defaultChecked={lowerCaseAllowed}
                onChange={() => {
                  setlLowerCaseAllowed((prev) => !prev);
                }}
              />
              <label
                htmlFor="lowerCase"
                className="text-2xl cursor-pointer ml-3"
              >
                LowerCase
              </label>
            </div>
            <div className="bg-indigo-200 mb-2 w-50 justify-center px-3 py-1 rounded-lg">
              <input
                type="checkbox"
                name="checkSymbol"
                id="checkSymbol"
                className="w-5 h-5 rounded-2xl"
                defaultChecked={symbolAllowed}
                onChange={() => {
                  setSymbolAllowed((prev) => !prev);
                }}
              />
              <label
                htmlFor="checkSymbol"
                className="text-2xl cursor-pointer ml-3"
              >
                Symbol
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
