"use client";
import Logo from "@/app/utils/logo";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../utils/firebase";
import Image from "next/image";
import downloadLogo from "../../../../public/download-folder.gif";
import toast from "react-hot-toast";

function SharedFile({ params }: any) {
  const [fileInfo, setFileInfo] = useState({} as any);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    console.log(params);
    params?.docId && getFileInfo(params.docId);
  }, []);

  const getFileInfo = async (docId: string) => {
    const docRef = doc(db, "files", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFileInfo({
        url: docSnap.data().url,
        shortUrl: docSnap.data().shortUrl,
        fullName: docSnap.data().username || "temp",
        email: docSnap.data().userEmail || "temp@",
        name: docSnap.data().name,
        size: docSnap.data().size,
        password: docSnap.data().password,
      });
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setLoading(false);
      toast("❌ File not found.");
    }
  };
  const onDownload = () => {
    window.open(fileInfo.url, '_blank');
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-100 bg-opacity-50">
      {loading ? ( // Display loader while loading is true
        <div className="loader border-t-8 border-violet-600 border-solid rounded-full animate-spin h-20 w-20"></div>
      ) : (
        <div className="flex flex-col items-center border rounded-md bg-white min-h-[400px] p-8 py-2 text-2xl">
          <span className="mt-8 mb-4 flex justify-center items-center gap-2 place-content-center text-2xl sm:text-[36px] font-bold text-violet-600">
            <Logo />
            CF.
          </span>
          <h1 className="py-4 text-violet-600 font-semibold">
            {fileInfo.fullName}{" "}
            <span className="font-medium text-black">
              Shared this file with you
            </span>
          </h1>
          <Image
            alt="download logo"
            src={downloadLogo}
            width={100}
            height={100}
          />
          <div className="flex flex-col items-start text-lg">
            <div>
              <span className="font-medium text-violet-600">File Name:</span>{" "}
              {fileInfo?.name?.slice(0, 10)}...
            </div>
            <div>
              <span className="font-medium text-violet-600">File Size:</span>{" "}
              {(fileInfo?.size / 1024 / 1024).toFixed(2)} MB
            </div>
          </div>
          {fileInfo.password != "" && (
            <div className="w-full flex gap-1">
              <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="my-4 p-2 rounded-lg border w-full  focus:outline-none shadow sm:text-sm"
              />
            </div>
          )}
          <button
            className={`  ${
              fileInfo.password !== "" &&
              password.toString() !== fileInfo.password
                ? "bg-gray-300 cursor-default"
                : " active:bg-indigo-500 bg-indigo-600 hover:shadow-xl "
            } rounded-full w-full my-3 mb-8 px-3 py-2 text-sm font-medium text-white transition focus:outline-none focus:ring `}
              onClick={onDownload}
            disabled={
              fileInfo.password !== "" &&
              password.toString() !== fileInfo.password
            }
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
export default SharedFile;
