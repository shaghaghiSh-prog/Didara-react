import React from 'react';
function CustomerCat() {
  return (
    <div className="flex justify-center items-center flex-wrap p-4">
      <div className="flex flex-col items-center">
        <div className="flex justify-between w-full flex-wrap">
          {[
            {
              src: "https://api.didaraoptic.com/attachments/admin/medias/ec22e143ec6a6a9e86a9cd3afc2fd674.webp",
              alt: "طبی",
              link: "/products?product_type=products&sort=new&category=طبی"
            },
            {
              src: "https://api.didaraoptic.com/attachments/admin/sectionImage/browser/8e47fa042a576f5918dee10651daecdd.webp",
              alt: "طبی",
              link: "/products?product_type=products&sort=new&category=طبی"
            },
            {
              src: "https://api.didaraoptic.com/attachments/admin/medias/7adb631837a34e9dc169ad2f1b2274c6.webp",
              alt: "طبی",
              link: "/products?product_type=products&sort=new&category=طبی"
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative m-2 w-[345px] transition-transform duration-300 hover:-translate-y-2 hover:rotate-2"
            >
              <a href={item.link}>
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={item.src}
                  alt={item.alt}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerCat;
