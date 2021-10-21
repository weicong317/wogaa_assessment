import React from 'react';
import PropTypes from 'prop-types';

const Email = ({ label, qId, placeholder, onChange }) => {
	return (
		<>
			<label>{label}</label>
			<input type="email" name={qId} className="block w-full mt-1 mb-4 p-2 text-sm shadow" placeholder={placeholder ? `${placeholder} (optional)` : '(optional)'} onChange={onChange} />
		</>
	);
};

Email.defaultProps = {
	placeholder: '',
};

Email.propTypes = {
	label: PropTypes.string.isRequired,
	qId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default Email;
