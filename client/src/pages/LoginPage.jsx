import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const { register, handleSubmit, formState: { errors }, } = useForm()
  const { signin, isAuthenticated, isAdmin, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin) {
      navigate('/register')
    } else
    if (isAuthenticated) {
      navigate('/tasks')
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    signin(data)
  });

  return (
    <div className="flex h-[calc(100vh - 100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">

        {loginErrors.map((error, i) => (
          <div className="bg-red-500 text-white p-2 my-2 rounded-md" key={i}>
            {error}
          </div>
        ))
        }

        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email" name="email" placeholder="Email" {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {
            errors.email && (
              <p className='text-red-500'>Email is required</p>
            )
          }

          <input
            type="password" name="password" placeholder="Password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {
            errors.password && (
              <p className='text-red-500'>Password is required</p>
            )
          }

          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2">Register</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage