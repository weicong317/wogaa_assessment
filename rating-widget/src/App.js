import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import ShortAnswer from './ShortAnswer';
import LinearScale from './LinearScale';
import Email from './Email';
import SmileSVG from './SmileSVG';
import './App.css';

const apiDomain = 'http://localhost:3000';
const questionRoute = 'questions';
const ratingRoute = 'rating';
const responseRoute = 'response';

const App = () => {
	const [ratingStep, setRatingStep] = useState(0);
	const [currentRateId, setCurrentRateId] = useState(-1);
	const [questions, setQuestions] = useState([]);
	const [formData, updateFormData] = useState({});

	const submitRating = async rate => {
		const apiReturn = await axios.post(`${apiDomain}/${ratingRoute}`, {
			rate,
		});
		if (apiReturn.status === 201) {
			setCurrentRateId(apiReturn.data.data.newID);
			showFirstThankYou(!!apiReturn.data.data.newID);
		} else {
			showFirstThankYou(false);
		}
	};

	const showFirstThankYou = isShowing => {
		setRatingStep(2);
		setTimeout(async () => {
			if (isShowing) {
				const apiReturn = await axios.get(`${apiDomain}/${questionRoute}`);
				if (apiReturn.data.data.length) {
					setQuestions(apiReturn.data.data);
					const tempFormData = { ...formData };
					apiReturn.data.data.forEach(q => {
						if (q.Type === 'linear') {
							tempFormData[q.Id] = q.Min || 0;
						}
					});
					updateFormData(tempFormData);
					setRatingStep(3);
				} else {
					setCurrentRateId(-1);
					setRatingStep(0);
				}
			} else {
				setCurrentRateId(-1);
				setRatingStep(0);
			}
		}, 2000);
	};

	const handleChange = e => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const onSubmit = async e => {
		e.preventDefault();
		const apiReturn = await axios.post(`${apiDomain}/${responseRoute}`, {
			rateId: currentRateId,
			survey: Object.entries(formData),
		});
		if (apiReturn.status === 201) {
			setCurrentRateId(-1);
		}
		updateFormData({});
		setRatingStep(4);
		setTimeout(() => {
			setRatingStep(0);
		}, 2000);
	};

	return (
		<div className="fixed bottom-8 left-8">
			<div className={clsx('step-0-container', 'absolute', 'bottom-0', ratingStep === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
				<SmileSVG cn="bg-yellow-300 border-4 border-black rounded-full w-12 h-12 custom-transition" />
				<div className="text-white py-2 px-12 cursor-pointer border-4 border-black rounded-full bg-black opacity-0 pointer-events-none absolute bottom-0 whitespace-nowrap custom-transition" onClick={() => setRatingStep(1)}>
                    Help us improve
				</div>
			</div>
			<div className={clsx('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-xl', ratingStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
				<div className="flex justify-end font-medium">
					<span className="cursor-pointer" onClick={() => setRatingStep(0)}>
                        X
					</span>
				</div>
				<div className="my-4 mx-8 custom-animation-fadeIn">
					<div className="font-bold text-center">Rate your experience</div>
					<ul className="list-none overflow-hidden mx-4 mt-4 mb-2">
						{[...Array(7).keys()].slice(1).map(number => (
							<li key={number} className="float-left list-li py-4 px-6 border-black cursor-pointer hover:bg-gray-300" onClick={() => submitRating(number)}>
								{number}
							</li>
						))}
					</ul>
					<div className="flex justify-between text-sm">
						<span>NOT SATISFIED</span>
						<span>VERY SATISFIED</span>
					</div>
				</div>
			</div>
			<div className={clsx('bg-gray-100', 'py-12', 'px-12', 'rounded-lg', 'shadow-xl', 'absolute', 'bottom-0', ratingStep === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
				<SmileSVG cn="bg-yellow-300 border-4 border-black rounded-full w-12 h-12 inline-block" />
				<span className="ml-4 font-bold">Thank you, tell us more!</span>
			</div>
			<div className={clsx('step-3-container', 'bg-gray-100', 'rounded-lg', 'shadow-xl', 'absolute', 'bottom-0', 'max-h-screen', 'overflow-y-scroll', ratingStep === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
				<div className="bg-black text-white p-6 pb-4 rounded-t-lg text-center">
					<span className="cursor-pointer absolute top-1 right-4" onClick={() => setRatingStep(0)}>
                        x
					</span>
                    Tell us more
				</div>
				<div className="p-4 font-bold">
					<form onSubmit={onSubmit}>
						{questions.map(question => {
							switch (question.Type) {
							case 'linear': {
								return <LinearScale key={question.Id} label={question.Question} qId={question.Id} min={question.Min} max={question.Max} step={question.Step} onChange={handleChange} />;
							}
							case 'short':
								return <ShortAnswer key={question.Id} label={question.Question} qId={question.Id} placeholder={question.PlaceHolder} onChange={handleChange} />;
							case 'email':
								return <Email key={question.Id} label={question.Question} qId={question.Id} placeholder={question.PlaceHolder} onChange={handleChange} />;
							default:
								return null;
							}
						})}
						<div className="flex justify-end">
							<button type="submit" className="py-2 px-4 bg-black text-white rounded-lg uppercase text-sm">
                                submit
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className={clsx('bg-gray-100', 'py-12', 'px-12', 'rounded-lg', 'shadow-xl', 'absolute', 'bottom-0', 'text-center', 'font-bold', ratingStep === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
				<p>Thank you!</p>
				<p>Your feedback is valuable to us.</p>
			</div>
		</div>
	);
};

export default App;
