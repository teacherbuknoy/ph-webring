import urlMetadata from "url-metadata";
import members from './members.json' with { type: 'json' }

async function unfurlMemberData() {
  const webring = await Promise.all(
    members.map(async member => {
      let metadata = {};
      try {
        metadata = await urlMetadata(member.url, { timeout: 3000 });
      } catch (error) {
        console.error(`Failed to fetch metadata for ${member.url}:`, error);
        metadata = {};
      }

      return {
        ...member,
        favicon: metadata?.favicons?.[0] || '',
  return webring
      }
    })
  )

  console.log(webring)
  return webring
}

function getImage(metadata) {
  return metadata?.image?.length > 1
    ? metadata?.image
    : metadata['og:image']?.length > 1
      ? metadata['og:image']
      : metadata['twitter:image']
}

function getDescription(metadata) {
  return metadata?.description?.length > 1
    ? metadata?.description
    : metadata['og:description']?.length > 1
      ? metadata['og:description']
      : metadata['twitter:description']
}

const webring = await unfurlMemberData();

export default webring;