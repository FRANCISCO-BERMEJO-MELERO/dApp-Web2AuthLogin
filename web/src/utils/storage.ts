export const saveCredential = (key: string, credential: any) => {
    localStorage.setItem(key, JSON.stringify(credential));
};

export const getCredential = (key: string) => {
    const credential = localStorage.getItem(key);
    return credential ? JSON.parse(credential) : null;
};
