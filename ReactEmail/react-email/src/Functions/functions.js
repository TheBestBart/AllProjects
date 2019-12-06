export const postData = async (url = '', data = {}) =>  {

    const response = await fetch(url, {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrer: 'no-referrer', 
      body: JSON.stringify(data),
    });

    return await response.json();
  }


  export const createObjectToNewAccount = (state) => {
    let { newEmail, newPassword , newPlatform } =  state;

    (newEmail && newPassword && newPlatform) 
        ? {
        newEmail: newEmail,
        newPassword: newPassword,
        newPlatform: newPlatform,
        } : false
    }