/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../../Loader/Loader";
import Navbar from "../../Header/Navbar/Navbar";

function About() {
  const [loading, setLoading] = useState(true);
  const paragraphRef1 = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Show loader for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const headerText = "فروشگاه دید آرا";
  const paragraphText = `فروشگاه دید آرا با بیش از یک دهه تجربه و تخصص در ساخت
  و تعمیر عینک، به عنوان یکی از مراکز معتبر و پیشرو در
  ارائه خدمات عینک ‌سازی شناخته می ‌شود. فعالیت ما از
  سال 86 به صورت تخصصی آغاز شد و در این مدت، با ارائه
  بهترین خدمات در درمانگاه ولی‌الله تهران، طرفه تهران،
  شهدای آل محمد تهران و درمانگاه پارسیان شهر جدید
  هشتگرد، توانسته‌ ایم رضایت مشتریان خود را جلب کنیم. ما
  به عنوان وارد کننده مستقیم، مجموعه ‌ای از کالاهای با
  کیفیت و برندهای روز دنیا را ارائه می ‌دهیم و همواره
  تلاش می‌ کنیم تا محصولات خود را با قیمت رقابتی به دست
  مشتریان برسانیم.
  در فروشگاه دید آرا، تمام محصولات با تضمین کیفیت تولید
  عرضه می ‌شوند و ما با افتخار ضمانت تراش عدسی و ساخت
  عینک را به همراه تعمیر رایگان عینک به مشتریان خود
  ارائه می‌ دهیم. در کنار کیفیت، راحتی مشتریان نیز برای
  ما اولویت دارد. از این رو، خدماتی نظیر ارسال رایگان ،
  گارانتی و امکان انتخاب مدل فریم در محل را فراهم کرده
  ‌ایم تا تجربه خریدی بی‌ نقص و لذت ‌بخش را برای شما رقم
  بزنیم. دید آرا، همراه شما در مسیر داشتن دیدی روشن ‌تر
  و زیباتر.`;

  useEffect(() => {
    let i = 0;
    let j = 0;
    let isMounted = true;

    const typeEffectHeader = () => {
      if (j < headerText.length && headerRef.current && isMounted) {
        headerRef.current.textContent += headerText[j];
        j++;
        setTimeout(typeEffectHeader, 100); // Adjust typing speed as needed
      } else {
        // Start typing paragraph after header is done
        typeEffectParagraph();
      }
    };

    const typeEffectParagraph = () => {
      if (i < paragraphText.length && paragraphRef1.current && isMounted) {
        paragraphRef1.current.textContent += paragraphText[i];
        i++;
        setTimeout(typeEffectParagraph, 4); // Adjust typing speed as needed
      }
    };

    typeEffectHeader();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
  }, [loading]); // Run this effect when loading is false

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Optional: Add exit animation
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <div className="pt-32">
              <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Content */}
                    <div className="w-full md:w-7/10 p-8 text-gray-800">
                      <h1
                        ref={headerRef}
                        id="header-x"
                        className="text-3xl font-bold mb-6 text-right text-amber-700"
                      ></h1>
                      <div className="space-y-4 text-right" dir="rtl">
                        <p
                          className="text-gray-500"
                          ref={paragraphRef1}
                          id="paragraph-1"
                        ></p>
                      </div>
                    </div>
                    <div className="w-full md:w-3/10 p-4 flex items-center justify-center">
                      <div className="relative w-full h-64 md:h-full">
                        <img
                          src="https://didaraoptic.com/static/media/aboutImage.55d05eb7.webp"
                          alt="About Us"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default About;
