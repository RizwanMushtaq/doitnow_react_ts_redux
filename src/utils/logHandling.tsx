export function logWithDebug(message: any){
    if(localStorage.getItem('DoItNow.debug') === 'true') {
        console.log(message)
    } 
}