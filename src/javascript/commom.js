// const host = 'http://www.zcheng2115.com/beijing/static/img';
const host = 'http://www.zcheng2115.com/static/img';

export default{
    methods: {
        common_getCookie(cookieName) {
            let strCookie = document.cookie;
            let arrCookie = strCookie.split("; ");
            for (let i = 0; i < arrCookie.length; i++) {
              let arr = arrCookie[i].split("=");
              if (cookieName == arr[0]) {
                return arr[1];
              }
            }
            return "";
        //    return "o9b1k0TcAPec3IR8rzV2zGo3Vh8w"; 
        },
        commom_getImg(url) {
            let img = new Image();

            let result = host + url;
            img.src = result;
            let callb = () => {
                $('.show-img>img').attr('src', result);
            };
            if(img.complete){
                callb();
                return;
            }
            img.onload = () => callb();
        }
    }
}