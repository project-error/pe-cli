// Starting CLI Test

import createResource from "../functions/createResource";

test('Choosing JavaScript with no packages', () => {
	expect(createResource('javascript-test', 'JavaScript', []))
	//createResource('javascript-test', 'JavaScript', [])
})