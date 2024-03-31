import React, { useEffect } from 'react';
import scrollToTop from '@utils/scrollToTop';
import BannerPageName from '@components/bannerPageName';
import MarkIcon from '@icons/markIcon';
import classNames from 'classnames';
import { ABOUT_US } from '@constants';
import GitHubIcon from '@icons/gitHubIcon';
import RSSLogoIcon from '@icons/RSSLogoIcon';

export function AboutPage() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div className='bg-secondaryColor dark:bg-grayMColor'>
        <BannerPageName>ABOUT US</BannerPageName>
        <div className={classNames('py-sm px-sm max-w-[1440px] mx-auto', 'lg:px-big')}>
          <div>
            <div
              className={classNames(
                'border-b-2 border-accentColor dark:border-basicColor',
                'p-2 mb-4',
                'flex justify-center md:justify-between items-centers'
              )}
            >
              <h3
                className={classNames(
                  'text-h3 text-accentColor font-bold dark:text-basicColor',
                  'text-center md:text-start'
                )}
              >
                Team Members:
              </h3>
            </div>
            {ABOUT_US.map(person => (
              <div
                key={person.fullName}
                className={classNames(
                  'flex flex-col md:flex-row justify-between items-center',
                  'w-full mb-4 p-4',
                  'border-2 border-dotted border-accentColor dark:border-basicColor',
                  'rounded-normal relative'
                )}
              >
                <div className={classNames('flex flex-col justify-center items-center', 'w-full md:w-[20%] mr-6')}>
                  <div
                    className={classNames(
                      'flex justify-center items-center',
                      'w-[150px] h-[150px] overflow-hidden',
                      'rounded-full border-4 border-accentColor dark:border-basicColor'
                    )}
                  >
                    <img src={person.img} alt='photo' />
                  </div>
                  <h3
                    className={classNames(
                      'text-h3 font-bold text-accentColor dark:text-basicColor',
                      'mb-2 text-center'
                    )}
                  >
                    {person.fullName}
                  </h3>
                  <p className='mb-1 text-grayLColor text-center'>{person.role}</p>
                  <a
                    className='mb-1 text-graySColor hover:text-grayMColor dark:hover:text-grayLColor transition'
                    href={person.github}
                  >
                    <GitHubIcon />
                  </a>
                </div>
                <div className='flex flex-col w-full md:w-[80%]'>
                  <h4
                    className={classNames(
                      'text-h4 font-bold text-accentColor dark:text-basicColor',
                      'mb-2',
                      'text-center md:text-start'
                    )}
                  >
                    About me
                  </h4>
                  <p className='text-justify'>{person.bio}</p>
                  <h4
                    className={classNames(
                      'text-h4 font-bold text-accentColor dark:text-basicColor',
                      'mb-2',
                      'text-center md:text-start'
                    )}
                  >
                    My contributions
                  </h4>
                  <div>
                    {person.contributions.map(el => (
                      <div key={el} className='flex items-center'>
                        <div className='w-[20px] mr-2'>
                          <MarkIcon />
                        </div>
                        <p className='text-justify'>{el}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div
              className={classNames(
                'border-b-2 border-accentColor dark:border-basicColor',
                'p-2 mb-4',
                'flex justify-center md:justify-between items-center '
              )}
            >
              <h3
                className={classNames(
                  'text-h3 text-accentColor dark:text-basicColor font-bold',
                  'text-center md:text-start'
                )}
              >
                Collaboration:
              </h3>
            </div>
            <p className='text-justify mb-4'>
              Our team work is based on the Agile methodology, enforced with a lot of energy and responsible
              collaboration.
            </p>
            <p className='text-justify mb-4'>
              The project was split into sprints, each of which was divided into cyclical stages of planning,
              implementing, testing, and upgrading. Every sprint began with task analysis and role distribution.
            </p>
            <p className='text-justify mb-4'>
              We used the Trello platform to monitor and update task statuses. Additionally, we had online meetings
              three times a week and additional calls based on the team demand. Throughout the project, we stayed in
              touch on Discord.
            </p>
            <p className='text-justify mb-4'>
              Every member of the team took part in bug searching, problem-solving, adding features, and contributed to
              improving code quality. After every sprint, we analyzed the pros and cons of our decisions and set team
              goals for the next sprint. We also tried to minimize repetitive tasks and streamline the debugging process
              with the help of Vercel automatic deployment and code quality instruments like Husky, Eslint, and
              Prettier.
            </p>
            <p className='text-justify'>
              In conclusion, we enjoyed the process and are happy to present the results of this adventurous journey
              into the depths of the frontend world!
            </p>
          </div>
          <div>
            <div
              className={classNames(
                'border-b-2 border-accentColor dark:border-basicColor',
                'p-2 mb-4',
                'flex justify-center md:justify-between items-center '
              )}
            >
              <h3
                className={classNames(
                  'text-h3 text-accentColor dark:text-basicColor font-bold',
                  'text-center md:text-start'
                )}
              >
                Gratitude:
              </h3>
            </div>
            <div className={classNames('flex flex-col md:flex-row justify-center items-center', 'p-4')}>
              <p className='mb-2 md:mr-4'>Thank you for our new usefull skills</p>
              <a className='hover:scale-110 transition' href='https://rs.school/index.html' target='blanc'>
                <RSSLogoIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AboutPage;
