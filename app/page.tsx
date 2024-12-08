import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Welcome to Our E-Commerce Platform
        </h1>
        <p className="text-lg text-center sm:text-left max-w-lg">
          Discover an amazing collection of products at unbeatable prices!
          Whether you're shopping for electronics, fashion, or home goods, we
          have something for everyone. Explore our curated categories and enjoy
          a seamless shopping experience.
        </p>
        <Link href="/products">
          <p className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Browse Products
          </p>
        </Link>
      </main>
    </div>
  );
}
