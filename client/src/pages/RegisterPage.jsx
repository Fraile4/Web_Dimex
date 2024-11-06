import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { signup, isAuthenticated, isAdmin, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAdmin) return;
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 text-white p-2 my-2 rounded-md" key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input
                    type="text" name="username" placeholder="Username" {...register("username", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {
                    errors.username && (
                        <p className='text-red-500'>Username is required</p>
                    )
                }

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

                <select name="puesto" {...register("puesto")}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                    <option value="PaP">Puerta a Puerta</option>
                    <option value="CC">Call Center</option>
                    <option value="AE">Agencia Externa</option>
                </select>

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage