const SetUrl = () => {
    //returns the correct url whether in dev or prod
    var url;
    if(process.env.NODE_ENV === 'development') {
        url = process.env.BASE_URL_DEV;
    } else {
        url = process.env.BASE_URL_PROD;
    }
    return url;
}

export default SetUrl;