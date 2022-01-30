import React from "react";

export default function index(props) {
  return (
    <>
      <label className="block capitalize text-lg tracking-wide text-white  mb-2">
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        className="appearance-none block w-full  text-gray-700 rounded-3xl border-2 border-grey-400 py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
        name={props.name}
        required
        disabled={props.disabled}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </>
  );
}
