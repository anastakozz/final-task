import VkIcon from '@icons/vkIcon';
import VkIconDark from '@icons/vkIconDark';
import InstagramIcon from '@icons/instagramIcon';
import InstagramIconDark from '@icons/instagramIconDark';
import FacebookIcon from '@icons/facebookIcon';
import FacebookIconDark from '@icons/facebookIconDark';

function SocialMediaLinks() {
  return (
    <div className='flex items-center mb-4'>
      <a rel='noreferrer' target='_blank' className='mr-sm' href='https://vk.com/soap_naturee'>
        <VkIcon />
        <VkIconDark />
      </a>
      <a rel='noreferrer' target='_blank' className='mr-sm' href='https://instagram.com/soap_naturee'>
        <InstagramIcon />
        <InstagramIconDark />
      </a>
      <a className='' href='#'>
        <FacebookIcon />
        <FacebookIconDark />
      </a>
    </div>
  );
}

export default SocialMediaLinks;
