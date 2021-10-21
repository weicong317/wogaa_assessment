import React from 'react';
import PropTypes from 'prop-types';

const LinearScale = ({ label, qId, min, max, step, onChange }) => {
	return (
		<>
			<label>{label}</label>
			<div className="mt-1 mb-4 flex items-center justify-between">
				<span>{min || 0}</span>
				<input type="range" name={qId} min={min || 0} max={max || 100} step={step || 1} defaultValue={min || 0} className="inline-block w-5/6" onChange={onChange} />
				<span>{max || 100}</span>
			</div>
		</>
	);
};

LinearScale.propTypes = {
	label: PropTypes.string.isRequired,
	qId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
};

export default LinearScale;
