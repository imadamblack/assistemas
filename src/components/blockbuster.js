import Image from 'next/image';

export default function Blockbuster({overhead, title, image}) {
  return (
    <section className="relative flex flex-col w-screen md:mb-0 mx-auto relative py-[8rem]">
      <div className="absolute inset-0 bg-black opacity-30 z-10"/>

      <Image src={image} layout="fill" className="object-cover"/>

      <div className="container mx-auto z-10 md:px-20">
        <div className="flex flex-col items-center">
          <div className="w-full md:w-1/2 p-8 md:p-14">
            <p className="mx-auto overhead">{overhead}</p>
            <h2
              dangerouslySetInnerHTML={{__html: title}}
              className="ft-8 text-center my-auto text-white font-[600] [text-shadow:_2px_2px_4px_rgb(10_70_50_/_80%)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}