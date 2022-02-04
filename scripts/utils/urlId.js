const getIdParameter = () => { // renvoie à photographer-page.js
    const searchParams = new URLSearchParams(window.location.search); 
    const photographerUrlId = searchParams.get('id');  
    return photographerUrlId;
};