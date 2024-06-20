import { Animation } from "./Animation"
export const Payment = ()=> {
    return <div class="bg-gray-100 flex justify-center items-center h-screen">
      
      <div class="bg-white p-6 w-[600px] shadow-2xl rounded-xl md:mx-auto">
        
        <Animation/>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Successful!</h3>
            <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p>
            <div class="py-10 text-center">
                <a href="#" class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK 
               </a>
               
            </div>
        </div>
    </div>
    
  </div>
}
