const wget = require("node-wget");
const axios = require("axios")

async function pegarUrl(link){
    csrfLogin = await axios.get("https://www.instagram.com/accounts/login/")
    csrf1 = csrfLogin.data.split('<script type="text/javascript">window._sharedData = {"config":{"csrf_token":"')[1]
    csrfToken = csrf1.split('"')[0]
    reqLogin = await axios({
        method: "POST",
        url: "https://www.instagram.com/accounts/login/ajax/",
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.5",
            "accept-encoding": "gzip, deflate, br",
            "x-csrftoken": `${csrfToken}`,
            "x-instagram-ajax": "3bcc4d0b0733",
            "x-ig-app-id": "936619743392459",
            "x-asbd-id": "198387",
            "x-ig-www-claim": "", // Your X-IG-WWW-CLAIM
            "content-type": "application/x-www-form-urlencoded",
            "x-requested-with": "XMLHttpRequest",
            "origin": "https://www.instagram.com",
            "dnt": "1",
            "te": "trailers",
        },
        data: "" // Instagram Login Payload With Your Credentials
    });
    mid = reqLogin.headers["set-cookie"][2].split('=')[1]
    mid = mid.split(';')[0]
    ds_user_id = reqLogin.headers["set-cookie"][3].split('=')[1]
    ds_user_id = ds_user_id.split(';')[0]
    sessionid = reqLogin.headers["set-cookie"][4].split('=')[1]
    sessionid = sessionid.split(';')[0]
    ig_did = reqLogin.headers["set-cookie"][5].split('=')[1]
    ig_did = ig_did.split(';')[0]
    getInfosVideo = await axios({
        method: "GET",
        url: link,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate, br',
            'dnt': '1',
            'cookie': `mid=${mid}`,
            'cookie': `ig_did=${ig_did}`,
            'cookie': 'ig_nrcb=1',
            'cookie': 'rur="NAO\05447325306300\0541678070680:01f7acdad658ee044355f48ae22b0d3ee55029fbf3258d4d6f3ad3ce4e624551a3a7451b"',
            'cookie': 'shbid="3179\05447325306300\0541678065459:01f7b2b392b368e28de44146932380ca2d0ecd68a653ad2f7960ae154afdc5e9dac900ae"',
            'cookie': 'shbts="1646529459\05447325306300\0541678065459:01f7dc9cee7cb04345dec1c712694fcf2b5120b9a68aa806c637b132067104a7401c322f"',
            'cookie': `csrftoken=${csrfToken}`,
            'cookie': `ds_user_id=${ds_user_id}`,
            'cookie': `sessionid=${sessionid}`,
            'upgrade-insecure-requests': '1',
            'te': 'trailers',
        },
    });
    conteudoVideo = getInfosVideo.data
    if("shortcode_media" in conteudoVideo){
        linkDownload = conteudoVideo["graphql"]["shortcode_media"]["display_resources"][0]["src"]
    } else {
        linkDownload = conteudoVideo["items"][0]["video_versions"][0]["url"]
    }
    wget({url: linkDownload, dest: 'downloadedVideo.mp4'});
    console.log('Downloaded successfully!')
}
pegarUrl("https://www.instagram.com/p/BQE0_gkltvb/?__a=1")
