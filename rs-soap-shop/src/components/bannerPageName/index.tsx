import { PageNameProp } from '@interfaces';

function BannerPageName({ children }: PageNameProp): JSX.Element {
  return (
    <div className='h-[316px] bg-[url("assets/bg-title-banner.webp")] bg-no-repeat bg-cover flex flex-col justify-center items-center'>
      <h2 className='px-4 text-h2 text-primaryColor font-bold opacity-75'>{children}</h2>
    </div>
  );
}

export default BannerPageName;
