import React from 'react';

const FormField = ({ 
	label, 
	name, 
	type = "text", 
	value, 
	onChange, 
	required = false, 
	placeholder, 
	rows,
	min,
	step 
}) => {
	const baseClassName = "w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent";

	return (
		<div>
			<label className="block text-sm font-medium text-gray-300 mb-2">
				{label}
			</label>
			{type === "textarea" ? (
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					rows={rows}
					className={`${baseClassName} resize-none`}
					placeholder={placeholder}
				/>
			) : (
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					required={required}
					min={min}
					step={step}
					className={baseClassName}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
};

export default FormField;