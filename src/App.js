import React, { memo, useState, useEffect, useRef } from 'react';
import './App.css';

import DxfParser from 'dxf-parser';
import { FontLoader } from 'three';
import { Viewer } from 'three-dxf';

import test_file from './ressources/ES_DOE_SYNO_SRO_MER_018.dxf';
import font_hel from './fonts/helvetiker_regular.typeface.json';

// Don't forget to import the cdn directly in index.html
const XXX = memo(function Cad() {
	const dxfMain = useRef(null);
	const [ viewer, setViewer ] = useState(null);

	useEffect(() => {
		let rawFile = new XMLHttpRequest();
		rawFile.open('GET', test_file, true);
		rawFile.onreadystatechange = function() {
			if (rawFile.readyState === 4) {

				let parser = new DxfParser();
				let dxf = parser.parseSync(rawFile.responseText);
				let loader = new FontLoader();
				let font = loader.parse(font_hel);

				setViewer(new Viewer(dxf, dxfMain.current, 1000, 1000, font));
			}
		};
		rawFile.send();
	}, []);

	return (
		<React.Fragment>
			<div ref={dxfMain} />
			{viewer === null ? (
				'Loading'
			) : (
				(() => {
					dxfMain.current.appendChild(viewer.renderer.domElement);
					viewer.render();
					return null;
				})()
			)}
		</React.Fragment>
	);
});

function App() {
	return (
		<div className='App'>
			<XXX />
		</div>
	);
}

export default App;
