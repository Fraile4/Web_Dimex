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
    <div>
      <h1>Hi! </h1>
  
      <form onSubmit={onSubmit}>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2">Logout</button>
      </form>

    </div>
  )
}

export default CCPage