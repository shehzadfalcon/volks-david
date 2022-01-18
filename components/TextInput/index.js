import React from 'react'

export default function index() {
    return (
      <input
        id="password"
        type="password"
        className="appearance-none block w-full  text-gray-700 rounded-3xl border-2 border-grey-400 py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
        name="password"
        required
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
    )
}
