import React, { FC, useEffect, useState } from 'react';
import ButtonCircle from '@/shared/ButtonCircle';
import rightImg from '@/images/SVG-subcribe2.png';
import Badge from '@/shared/Badge';
import Input from '@/shared/Input';
import Image from 'next/image';
import { NEWSLETTER_MUTATION } from '@/graphql/mutation';
import { useMutation } from '@apollo/react-hooks';
import NewsLetterModal from './NewsLetterModal';

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [subscribeToNewsletter] = useMutation(NEWSLETTER_MUTATION);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessMsg, setIsSuccessMsg] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }
    try {
      setIsLoading(true);
      const result = await subscribeToNewsletter({
        variables: { email },
      });
      setIsSuccess(true);

      const successMessage =
        result.data?.subscribeToNewsletter || 'Subscription successful!';
      setIsSuccessMsg(successMessage);
      setEmail('');

      setIsModalOpen(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
        data-nc-id='SectionSubscribe2'
      >
        <div className='mb-10 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5'>
          <h2 className='text-4xl font-semibold'>Join our newsletter</h2>
          <span className='mt-5 block text-neutral-500 dark:text-neutral-400'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos,
            possimus.
          </span>

          <form className="max-w-sm' onSubmit={handleSubmit} relative mt-10">
            <Input
              required
              aria-required
              placeholder='Enter your email'
              type='email'
              rounded='rounded-full'
              sizeClass='h-12 px-5 py-3'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <ButtonCircle
              type='submit'
              className='absolute right-1.5 top-1/2 -translate-y-1/2 transform'
              size='w-10 h-10'
              isSuccess={isSuccess}
            >
              {isLoading ? (
                <i className='las la-spinner animate-spin text-xl'></i>
              ) : isSuccess ? (
                <i className='las la-check text-xl text-white'></i>
              ) : (
                <i className='las la-arrow-right text-xl'></i>
              )}
            </ButtonCircle>
          </form>
        </div>
        <div className='flex-grow'>
          <Image alt='' src={rightImg} />
        </div>

        {isModalOpen && (
          <NewsLetterModal
            onClose={handleCloseModal}
            message={isSuccess ? isSuccessMsg : errorMessage}
          />
        )}
      </div>
    </>
  );
};

export default SectionSubscribe2;
