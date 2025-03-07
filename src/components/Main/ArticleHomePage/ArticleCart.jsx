import { ArrowLeft } from "lucide-react";

export function ArticleCard({ imageUrl, title, description }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <button className="self-start px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
          مشاهده بیشتر
          <ArrowLeft className="mr-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
