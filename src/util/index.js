// eslint-disable-next-line no-unused-vars
export const getFile = ({resource, fileType, payload}) => {
    let prefix = payload.destination.replace('public/assets/', '')
    return `http://learningportalbackend.kwintechnologies.com:3600${prefix}/` + payload.filename 
}