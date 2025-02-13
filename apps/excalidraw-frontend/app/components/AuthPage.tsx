"use client"


interface Auth{
    isSignin:boolean
}

export default function AuthPage({isSignin}:Auth){
    return <div className="min-h-screen min-w-screen flex justify-center items-center">
        <div >
                This is the signup page
        </div>
    </div>

}