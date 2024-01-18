import UploadForm from "../components/UploadForm";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ProgressBar from "../components/ProgressBar";
import { app } from "../../utils/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import toast from "react-hot-toast";
// async function getUser() {
//   const user = await currentUser();
//   return user;
// }
// const user = getUser();
function UploadPage({
  uploadProgress,
  setUploadProgress,
  isFileLarge,
  setIsFileLarge,
  isUploading,
  setIsUploading,
  downloadURL,
  setDownloadURL,
  file,
  setFile,
}: any) {
  const storage = getStorage(app);
  const router = useRouter();
  const onUpload = (file: any) => {
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, "file-upload/" + file.name);
    const uploadFile = uploadBytesResumable(storageRef, file, metadata);

    uploadFile.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setIsUploading(true);
        setUploadProgress(progress);
      },
      (error) => {
        // error message will be displayed in the UI
        setIsUploading(false);
        setFile(null);
        setUploadProgress(0);
        //show error toast
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          setIsUploading(false);
          setFile(null);
          const docId = Date.now().toString();
          const shortUrl =
            process.env.NEXT_PUBLIC_BASE_URL + "/sharedfile/" + docId;
          saveInDB(file, url, {}, shortUrl, docId);
          //how to redirect to download page
          // setDownloadURL(url);
          toast("File uploaded successfully.", {
            duration: 4000,
            position: "top-right",
            icon: "✅",
          });
          router.push(`/share/${docId}`);
        });
      }
    );
  };

  const saveInDB = async (
    file: any,
    fileUrl: string,
    user: any,
    shortUrl: string,
    docId: string
  ) => {
    const db = getFirestore(app);
    const docRef = doc(db, "files", docId);
    const payload = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
      password: "",
      username: user?.fullName || "Muhammad Zafar",
      userEmail:
        user?.primaryEmailAddress?.emailAddress || "mzafar611@gmail.com",
      shortUrl: shortUrl,
    };
    try {
      await setDoc(docRef, payload);
      console.log("Document written with ID: ", docId);
    } catch (error) {
      console.log("Error while setDoc----");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[95%] w-[500px] md:mx-20 ">
      <UploadForm
        file={file}
        setFile={setFile}
        isFileLarge={isFileLarge}
        setIsFileLarge={setIsFileLarge}
      />
      {!isUploading ? (
        <button
          onClick={() => onUpload(file)}
          disabled={!file || isFileLarge || isUploading}
          className={`bg-purple-600 px-6 py-4 text-white font-semibold w-full my-4 disabled:bg-gray-300 rounded-lg`}
        >
          Upload
        </button>
      ) : (
        <ProgressBar progress={uploadProgress} />
      )}
    </div>
  );
}

export default UploadPage;
