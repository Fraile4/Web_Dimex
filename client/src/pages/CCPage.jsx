import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function CCPage() {

  const { handleSubmit, formState: { errors }, } = useForm()
  const { user, logout, isAuthenticated, isAdmin, PaP, CC, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    logout(data)
    navigate('/login')
  });

  return (
    <div className="flex h-[calc(100vh - 100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1>Hi! {user.username}</h1>
        <h1>CC Page</h1>
    
        <form onSubmit={onSubmit}>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2">Logout</button>
        </form>
      </div>
    </div>
  )
}

export default CCPage