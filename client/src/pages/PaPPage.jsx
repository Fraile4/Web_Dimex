import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function PaPPage() {

  const { handleSubmit, formState: { errors }, } = useForm()
  const { user, logout, csvData, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    logout(data)
    navigate('/login')
  });

  console.log(csvData)

  return (
    <div className="flex h-[calc(100vh - 100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        
        <h1>Hi! {user.username}</h1>
        <h1>PaP Page</h1>

        <label htmlFor="csvFile" className="block text-sm font-medium text-gray-300">
          Upload CSV File
        </label>

        <div>
            <h2>CSV Data</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {csvData.length > 0 && Object.keys(csvData[0]).map((key) => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {csvData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        <form onSubmit={onSubmit}>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md my-2">Logout</button>
        </form>

      </div>
    </div>
  )
}

export default PaPPage;
/*

import { useEffect, useState } from 'react'
        import axios from 'axios'

        

        

        return (
          
        )

        */