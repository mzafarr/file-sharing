import Image from "next/image";
import TopHeader from "./components/TopHeader";

export default function Home() {
  return (
    <>
      <TopHeader />
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              <strong className="font-extrabold text-violet-700 sm:block mb-2">
                CloudFlow
              </strong>
              Seamlessly{" "}
              <strong className="font-extrabold text-violet-700">Share</strong>
              <div className="mt-2"> Your Files</div>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Effortless File Sharing, Send elegant emails. Experience intuitive
              design—share securely, anytime, anywhere. Elevate your sharing
              with CloudFlow today.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-violet-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-violet-700 focus:outline-none focus:ring active:bg-violet-500 sm:w-auto"
                href="/get-started"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-violet-600 shadow hover:text-violet-700 focus:outline-none focus:ring active:text-violet-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
