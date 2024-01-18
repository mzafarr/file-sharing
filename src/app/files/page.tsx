"use client";
import { SideMenu } from "../components/SideMenu";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import UploadPage from "./components/UploadPage";
import { useEffect, useState } from "react";

function Files() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileLarge, setIsFileLarge] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [file, setFile] = useState(null);
  return (
    <div className="flex lg:gap-x-16">
      <SideMenu />
      <UploadPage
        uploadProgress={uploadProgress}
        setUploadProgress={setUploadProgress}
        isFileLarge={isFileLarge}
        setIsFileLarge={setIsFileLarge}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        downloadURL={downloadURL}
        setDownloadURL={setDownloadURL}
        file={file}
        setFile={setFile}
      />
    </div>
  );
}

export default Files;
