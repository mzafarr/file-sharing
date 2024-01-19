import ErrorMessage from "./ErrorMessage";

const UploadForm = ({ file, setFile, isFileLarge, setIsFileLarge }: any) => {
  const onFileSelect = (e: any) => {
    setFile(e?.target?.files?.[0]);
    if (e.target.files[0].size > 2000000) {
      setIsFileLarge(true);
    } else {
      setIsFileLarge(false);
    }
  };

  return (
    <div className="">
      {isFileLarge && <ErrorMessage message="File size is too large" />}
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-[500px] h-64 border-2 border-violet-200 bg-violet-50 hover:bg-gray-100 bg-opacity-50 border-dashed rounded-lg cursor-pointer "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
          <svg
            className="w-14 h-14 mb-2 text-violet-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-lg text-gray-700">
            <span className="font-semibold text-violet-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-700">
            All file types are supported. Max file size is 2MB.
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => onFileSelect(e)}
        />
      </label>
    </div>
  );
};

export default UploadForm;
