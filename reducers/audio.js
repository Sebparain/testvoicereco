export default function(library=[], action){
    if (action.type === "addLibrary"){
        let newLibrary = [...library]
        newLibrary.push(action.music)
        return newLibrary
    } else {
        return library
    }
}