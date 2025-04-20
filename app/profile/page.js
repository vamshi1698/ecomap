export default function userPage(){
    return(
        <div>
            Page is under construction
        </div>
    )
}

export async function generateMetadata({params}) {
    return{
        title:"Profile page",
        description: "This is a profile page"
    }
}