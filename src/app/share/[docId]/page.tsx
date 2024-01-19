"use client";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../utils/firebase";
import { Copy } from "lucide-react";
import { SideMenu } from "@/app/components/SideMenu";
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const calculateSize = (dimensions: any) => {
  const maxWidth = 500; // Set your maximum width
  const minWidth = 100; // Set your minimum width

  const aspectRatio = dimensions.width / dimensions.height;

  let width = Math.min(Math.max(minWidth, dimensions.width), maxWidth);
  let height = width / aspectRatio;

  // Set your maximum height if needed
  const maxHeight = 500;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return { width, height };
};

function Share({ params }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileInfo, setFileInfo] = useState({} as any);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const db = getFirestore(app);
  const router = useRouter();
  useEffect(() => {
    console.log(params);
    params?.docId && getFileInfo(params.docId);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = fileInfo.url;

    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
    const { width, height } = calculateSize(dimensions);
    setDimensions({ width, height });
  }, []);

  const getFileInfo = async (docId: string) => {
    const docRef = doc(db, "files", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFileInfo({
        url: docSnap.data().url,
        shortUrl: docSnap.data().shortUrl, // localhost:3000/sharedfile/3128937192
        fullName: docSnap.data().username || "temp",
        email: docSnap.data().userEmail || "temp@",
        name: docSnap.data().name,
        size: docSnap.data().size,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const onPasswordSave = async () => {
    try {
      const docRef = doc(db, "files", params.docId);
      await updateDoc(docRef, {
        password,
      });
      // toast.success('Password Changed.');
      toast("Password Changed.", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
      });
    } catch (error) {
      toast("Password did not change.", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
  };

  const sendEmail = async () => {
    try {
      const res = await axios.post("/api/send", {
        fileInfo: fileInfo,
      });
      toast("Email sent successfully.", {
        duration: 4000,
        position: "top-right",
        icon: "✅",
      });
      router.push("/files");
    } catch (error) {
      console.error("Error sending email:", error);
      toast("Email was not sent.", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
  };
  // toast('Password Changed', {
  //   duration: 4000,
  //   position: 'top-center',

  //   // Styling
  //   style: {},
  //   className: '',

  //   // Custom Icon
  //   icon: '✅',

  //   // Change colors of success/error/loading icon
  //   // iconTheme: {
  //   //   primary: '#000',
  //   //   secondary: '#fff',
  //   // },

  //   // // Aria
  //   // ariaProps: {
  //   //   role: 'status',
  //   //   'aria-live': 'polite',
  //   // },
  // });
  return (
    <div className="flex">
      <SideMenu />
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl my-4 mb-8">
          Share this link with your friends
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 h-[80vh]">
          <div
            className={`rounded-md ${
              isPasswordEnabled
                ? "w-[350px] h-[350px] "
                : "w-[300px] h-[300px] "
            } border flex items-center mx-auto justify-center`}
          >
            <img
              src={fileInfo.url}
              width={dimensions.width}
              height={dimensions.height}
              className="flex-shrink-0 "
            />
          </div>
          <div className="m-0 w-[300px] h-[300px] flex-col flex justify-center items-center">
            <p className="text-left w-full text-sm mb-2">Short URL:</p>
            <div className="text-slate-700 border rounded-lg p-1.5 flex items-center justify-between shadow w-full max-w-[370px] max-h-[50px]">
              <p className="ml-2 max-w-[248px] z-100 overflow-hidden">
                {fileInfo.shortUrl}
              </p>
              <button
                onClick={() => navigator.clipboard.writeText(fileInfo.shortUrl)}
              >
                <Copy className="hover:text-violet-600 my-1" />
              </button>
            </div>
            <div className="flex w-full items-center my-4">
              <input
                id="enablePassword"
                type="checkbox"
                checked={isPasswordEnabled}
                onChange={() => setIsPasswordEnabled(!isPasswordEnabled)}
                className="w-4 h-4 bg-violet-600 outline-none rounded "
              />
              <label
                htmlFor="enablePassword "
                className="w-full text-left ms-2 text-sm font-medium "
              >
                Enable Password?
              </label>
            </div>
            {isPasswordEnabled && (
              <div className="w-full flex gap-1">
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 rounded-md border w-full  focus:outline-none shadow sm:text-sm"
                />
                <button
                  className="rounded px-3 py-2 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 bg-indigo-600 "
                  onClick={onPasswordSave}
                >
                  Save
                </button>
              </div>
            )}
            <div
              className={`flex flex-col gap-2 ${
                isPasswordEnabled ? "mt-4 " : "mt-2 "
              } w-full p-5 border rounded-md`}
            >
              <h2>Send file to email</h2>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="p-2 my-2 rounded-md border w-full  focus:outline-none shadow sm:text-sm"
              />
              <button
                onClick={sendEmail}
                className={`${
                  email == ""
                    ? "bg-gray-300 "
                    : "active:bg-indigo-500 bg-indigo-600 "
                } w-full text-center rounded px-3 py-2 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring `}
                disabled={email == ""}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
