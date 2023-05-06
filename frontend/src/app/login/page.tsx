// import Image from 'next/image'
import Hero from '@/components/Hero'
import Container from '@/components/ui/Container'
import Copy from '@/components/ui/Copy'
import ProductListTrending from '@/components/ProductListTrending'

export default function Login() {
  return (
    <main className='relative h-full'>
      <Copy />
      <Container>
        <div className='flex flex-col justify-center w-full pt-6 pb-10'>
          <h1 className="text-3xl font-semibold text-center mb-10 uppercase">
            Ingresar
          </h1>

          <form className="w-full md:w-1/3 mx-auto space-y-6">
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
              </div>
              <div className="flex justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                      </div>
                      <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
              </div>
          </form>
        </div>
      </Container>
    </main>
  )
}
