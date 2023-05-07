"use client"

import Container from '@/components/ui/Container';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import { toast } from "sonner";

const inter = Inter({ subsets: ['latin'] })

const URL_BACKEND = process.env.NEXT_PUBLIC_APP_URL_BACKEND

interface State {
  name: string
  firstname: string
  lastname: string
  email: string
  password: string
  domain: string
}

const createStore = async (data: State) => {
    const url = `${URL_BACKEND}/api/v1/central/auth/register`

    const body = JSON.stringify({
      ...data,
      domain: crypto.randomUUID().slice(0, 9)
    })

    console.log(body)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (!res.ok) {
      toast.success(`Problema al crear la tienda. Vuelva a intentarlo.`);
      throw new Error('Failed to create data')
    }

    return res.json()
}

export default  function Store() {
  // const products = await fetchProducts()
  const [form, setForm] = useState({
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    domain: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }
  
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    
    const res = await createStore(form)

    toast.success(res);
    
    setLoading(true)
  }

  return (
    <Container>
        <div className='flex flex-col justify-center w-full pt-6 pb-10'>
          <h1 className="text-3xl font-semibold text-center mb-10 uppercase">
            Crea tu empres aquí
          </h1>

          <form className="w-full md:w-1/3 mx-auto space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nombre de tu tienda. Ex. Amazon" required onChange={handleChange} disabled={loading} />
              </div>
              <div>
                  <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input type="text" name="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ex. Magddalena" required onChange={handleChange} disabled={loading} />
              </div>
              <div>
                  <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                  <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ex. González" required onChange={handleChange} disabled={loading} />
              </div>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Email Ex. micorreo@gmail.com" required onChange={handleChange} disabled={loading} />
              </div>

              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={handleChange} disabled={loading} />
              </div>
              
              <button type="submit" className="w-full text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>Regitrar mi empresa</button>
              
          </form>
        </div>
      </Container>
  )
}
