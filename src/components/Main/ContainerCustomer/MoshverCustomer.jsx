import React from "react";

const ContainerCustomer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center mt-12 m-5 bg-pink-50 w-10/12 rounded-2xl shadow-md mx-auto">
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2 text-[#8a6e1a]">خدمات مشاوره</h2>
        <p className="text-sm text-[#7c6318] mb-4">
          انتخاب عینک مناسب، فراتر از یک خرید ساده است؛ این انتخاب نه تنها باید
          با نیازهای بینایی شما مطابقت داشته باشد، بلکه با سبک زندگی و سلیقه شما
          نیز هماهنگ باشد. در فروشگاه دید آرا، ما با تیمی از مشاوران متخصص و
          مجرب در زمینه عینک‌های طبی و آفتابی آماده‌ایم تا شما را در انتخاب
          بهترین گزینه همراهی کنیم.
        </p>
        <button className="flex items-center px-2 py-2 border border-gray-400 bg-pink-50 text-gray-700 rounded hover:bg-yellow-600  hover:text-white hover:shadow-lg transition duration-300 w-fit">
          <span className="ml-2">تماس با ما</span>
          <div className="navigation-area-button-icon  rotate-180">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Login">
                <g>
                  <path d="M20.944,18.432a2.577,2.577,0,0,1-2.729,2.5c-2.153.012-4.307,0-6.46,0a.5.5,0,0,1,0-1c2.2,0,4.4.032,6.6,0,1.107-.016,1.589-.848,1.589-1.838V5.63a1.545,1.545,0,0,0-.969-1.471,3.027,3.027,0,0,0-1.061-.095H11.755a.5.5,0,0,1,0-1c2.225,0,4.465-.085,6.688,0a2.566,2.566,0,0,1,2.5,2.67Z"></path>
                  <path d="M15.794,12.354a.459.459,0,0,0,.138-.312A.3.3,0,0,0,15.938,12a.29.29,0,0,0-.006-.041.455.455,0,0,0-.138-.313L12.125,7.978a.5.5,0,0,0-.707.707L14.234,11.5H3.492a.5.5,0,0,0,0,1H14.234l-2.816,2.815a.5.5,0,0,0,.707.707Z"></path>
                </g>
              </g>
            </svg>
          </div>
        </button>
       
      </div>

      <div className="w-full md:w-1/3 p-4">
        <img
          src="https://didaraoptic.com/static/media/serviceImage.ea7f456a.webp"
          alt="Service"
          className="w-full h-auto rounded-lg transition duration-300"
        />
      </div>
    </div>
  );
};

export default ContainerCustomer;
