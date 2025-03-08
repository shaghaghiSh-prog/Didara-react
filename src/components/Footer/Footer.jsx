/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChevronDown, MapPin, Phone, PhoneCall, ShieldCheck, Truck, CreditCard } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-100 pt-6 text-[#9c7f25]">
      <div className="container mx-auto px-4">
        <hr className="border-t-[9px] border-[#d1b560] mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">درباره فروشگاه دید آرا</h3>
            <p className="text-sm leading-relaxed">
              فروشگاه دید آرا با بیش از یک دهه تجربه و تخصص در ساخت و تعمیر عینک، به عنوان یکی از مراکز معتبر و پیشرو در ارائه خدمات عینک ‌سازی شناخته می ‌شود. فعالیت ما از سال 86 به صورت تخصصی آغاز شد و در این مدت، با ارائه بهترین خدمات در فروشگاه و بیمارستان و درمانگاه‌های تهران توانسته‌ ایم رضایت مشتریان خود را جلب کنیم.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">لینک های سریع</h3>
            <ul className="space-y-2">
              {['گالری', 'محصولات', 'قوانین و مقررات', 'درباره ما', 'تماس با ما', 'مقالات', 'راهنمای سفارش'].map((item, index) => (
                <li key={index} className="flex items-center text-sm">
                  <ChevronDown className="h-4 w-4 ml-2" />
                  <a href="#" className="hover:text-[#e1c570]">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">محصولات</h3>
            <ul className="space-y-2">
              {['محصولات', 'اکسسوری', 'لنز', 'آفتابی', 'طبی'].map((product, index) => (
                <li key={index} className="flex items-center text-sm text-yellow-600">
                  <ChevronDown className="h-4 w-4 ml-2" />
                  <a href="#" className="hover:text-gray-900">{product}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">اطلاعات تماس</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 mt-1 flex-shrink-0" />
                <span>البرز - شهرجدیدهشتگرد(مهستان) - فاز 1 میدان یادبود-درمانگاه پارسیان طبقه اول</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 ml-2" />
                <a href="tel:09301769569" className="hover:text-[#e1c570]">09301769569</a>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 ml-2" />
                <a href="tel:02644251514" className="hover:text-[#e1c570]">02644251514</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12" />
              <span className="text-sm mt-2">ضمانت اصالت کالا</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12" />
              <span className="text-sm mt-2">تحویل سریع و رایگان</span>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-12 w-12" />
              <span className="text-sm mt-2">پرداخت امن</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
