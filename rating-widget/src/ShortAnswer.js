import React from 'react';
import PropTypes from 'prop-types';

const ShortAnswer = ({ label, qId, placeholder, onChange }) => {
	return (
		<>
			<label>{label}</label>
			<textarea name={qId} rows="4" className="block w-full mt-1 mb-4 p-2 text-sm shadow" maxLength="255" placeholder={placeholder ? `${placeholder} (optional)` : '(optional)'} onChange={onChange} />
		</>
	);
};

ShortAnswer.defaultProps = {
	placeholder: '',
};

ShortAnswer.propTypes = {
	label: PropTypes.string.isRequired,
	qId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default ShortAnswer;
