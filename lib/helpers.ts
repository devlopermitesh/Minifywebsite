import {Price} from '../types';

export const getUrl=()=>{
    let url=process.env.NEXT_PUBLIC_SITE_URL?? process.env.NEXT_PUBLIC_VERCEL_URL??'http://localhost:3000/';
    url=url.includes('http')?url:`https://${url}`
    url=url.endsWith('/')?url:`${url}/`
 return url   
}

export const Postdata=async (url:string,data?:{price:Price})=>{
    console.log("POST REQUEST",url,data)
    const res=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    if(!res.ok){
        console.error("POST REQUEST FAILED",res)
        throw new Error("POST REQUEST FAILED")
    }
    return res.json()
}



export const TodateTime=(secs:number)=>{
    let t=new Date('1970-01-01T00:00:00Z')
    t.setSeconds(secs)
    return t
}

