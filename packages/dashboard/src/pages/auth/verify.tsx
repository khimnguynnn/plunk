import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const userEmail = router.query.email || localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail as string);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto max-w-xl text-center text-neutral-800">
        <p className="my-6 text-6xl">
          <svg
            className="animate-pu mx-auto h-16 w-16 rounded-full bg-blue-100 p-3 text-blue-900"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="3" width="14" height="18" rx="3"></rect>
            <circle cx="12" cy="13" r="2"></circle>
            <path d="M10 6h4"></path>
            <path d="M9 18h6"></path>
          </svg>
        </p>
        <h1 className="text-2xl font-bold">Please verify your email</h1>
        <p className="my-6 text-neutral-600">
          We have sent an email to{' '}
          <span className="font-bold">{email || 'your email address'}</span> with a verification link. Please click on the link to verify your email address.
        </p>
      </div>
      <a
        className="flex items-center justify-center text-sm font-medium text-neutral-600 underline transition ease-in-out hover:text-neutral-800"
        href="/auth/logout"
      >
        <svg
          className="mr-1 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.25 6.75L4.75 12L10.25 17.25"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19.25 12H5"
          ></path>
        </svg>
        Log out instead
      </a>
    </div>
  );
};

export default VerifyPage;
